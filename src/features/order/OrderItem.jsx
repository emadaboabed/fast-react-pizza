import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between gap4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {isLoadingIngredients ? "loading..." : ingredients.join(", ")}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
