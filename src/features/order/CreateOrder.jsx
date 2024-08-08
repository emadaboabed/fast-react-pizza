import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  let {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  let isLoadingAddress = addressStatus === "loading";

  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  let formErrors = useActionData();
  let dispatch = useDispatch();

  const cart = useSelector(getCart);
  let totalCartPrice = useSelector(getTotalCartPrice);
  let priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  let totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="basis-40">First Name</label>
          <input
            className="input"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-200 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-700 bg-red-200 p-2 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] z-10 top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `&{position.latitude},&{position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  let order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  let errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number. we might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  //if everything is okay create new order and then redirect
  let newOrder = await createOrder(order);

  //do not overuse
  store.dispatch(clearCart());

  return redirect(`order/${newOrder.id}`);
}

export default CreateOrder;
