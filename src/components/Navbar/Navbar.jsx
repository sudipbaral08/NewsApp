import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../Context/Context";
import FlagIN from "../../assets/india-flag.png";

const Navbar = () => {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  return (
    <nav className="flex justify-between items-center py-8 container border-b-2 border-gray-300 mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <h3 className="text-3xl font-semibold ">
        <NavLink to={"/"} className="flex items-center  ">
          NewsApp
          <img src={FlagIN} className="w-6 h-6" />
        </NavLink>
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          placeholder="Search here..."
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          className=" bg-slate-100 px-4 p-2 rounded-full outline-none lg:w-96  "
        />
      </form>
      <ul className="flex gap-5 text-xl">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "text-gray-700"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/news"}
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "text-gray-700"
            }
          >
            News
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
