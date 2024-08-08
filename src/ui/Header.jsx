import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="bg-yellow-400 uppercase px-2 py-3 border-b sm:px-6 border-stone-200 flex justify-between  items-center ">
      <Link to={"/"} className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
export default Header;
