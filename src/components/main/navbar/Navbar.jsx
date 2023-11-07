import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-purple-300">
      <div className="flex-1">
        <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
          Star Bakery
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to={"/createOrder"}
              className="border border-gray-600 bg-purple-400 font-semibold"
            >
              Create Order
            </NavLink>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
