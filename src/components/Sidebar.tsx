import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useState } from "react";
import GuestUser from "../assets/img/guest_user.png";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../features/auth/authSlice";
import Card from "./Card";
import { updateList } from "../features/watchList/listSlice";
import {
  CloseIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  ThreeDotIcon,
} from "../utils/SVG";

export default function Sidebar() {
  const [search, setSearch] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const { myList } = useAppSelector((state) => state.list);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(updateList([]));
    navigate("/login");
    setOpenProfileMenu(false);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={() => setOpenSidebar((prev) => !prev)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" />
      </button>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen border-r-2 transition-transform ${
          !openSidebar ? "-translate-x-full sm:translate-x-0" : "w-full"
        } `}
        aria-label="Sidebar"
      >
        <div
          className="sm:hidden absolute right-5 top-7"
          onClick={() => setOpenSidebar((prev) => !prev)}
        >
          <CloseIcon className="w-6 h-6" />
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white flex justify-between flex-col">
          <div>
            <Link
              to={"/"}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#f33f40]">
                Watchlists
              </h5>
            </Link>
            <div className="relative">
              <SearchIcon className="w-5 h-5 absolute left-2 bottom-1.5 opacity-40" />
              <Input
                value={search}
                onChange={setSearch}
                placeholder="Search"
                className="pl-8"
                name="search"
              />
            </div>
            <ul className="space-y-2 font-medium mt-5">
              <li>
                <Link
                  to="/"
                  className={`flex items-center p-2 ${
                    pathname === "/"
                      ? "text-white bg-[#f33f40]"
                      : "text-gray-900"
                  } rounded-lg  hover:bg-[#f75a4f] group`}
                >
                  <HomeIcon
                    className={`w-5 h-5  transition duration-75  group-hover:text-gray-100`}
                    color={pathname === "/" ? "white" : "black"}
                  />
                  <span className="ms-3">Home</span>
                </Link>
              </li>
              <hr />
              <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    My Lists
                  </span>
                </a>
              </li>
            </ul>
            {myList?.length > 0 ? (
              <Link to={"/watchlists"}>
                <Card
                  className={
                    pathname === "/watchlists"
                      ? "!text-white !bg-[#f33f40] sm:w-full"
                      : "sm:w-full"
                  }
                >
                  <div className="px-3 py-2 flex gap-3 items-center">
                    <div className="p-3 bg-black w-5 h-5 flex items-center justify-center">
                      <p className="text-white font-serif">M</p>
                    </div>
                    <p
                      className={`${
                        pathname === "/watchlists" ? "text-white" : "text-black"
                      } text-[12px] font-semibold`}
                    >
                      Movies by Tom Cruise
                    </p>
                  </div>
                </Card>
              </Link>
            ) : null}
          </div>
          <div className="px-2 py-1 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 flex gap-2 items-center">
                <img
                  src={GuestUser}
                  alt=""
                  className="object-contain w-full h-full"
                />
                <p>GUEST</p>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="flex bg-transparent"
                  onClick={() => setOpenProfileMenu((prev) => !prev)}
                >
                  <span className="sr-only">Menu</span>
                  <ThreeDotIcon />
                </button>
                {/* Menus */}
                <div
                  className={`${
                    !openProfileMenu ? "hidden" : ""
                  } z-50 absolute bottom-5 right-[-8px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
                  id="dropdown-user"
                >
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
