import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  let username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center sm:my-16 px-4">
      <h1 className="text-xl text-stone-700 md:text-3xl font-semibold  mb-8">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type={"primary"}>
          Continue Ordering,{username}
        </Button>
      )}
    </div>
  );
}

export default Home;
