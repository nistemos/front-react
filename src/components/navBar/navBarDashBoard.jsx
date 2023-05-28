"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
function NavBarDashboard() {
  const [sideBar, setSideBar] = useState(false);
  const handleSideBar = () => {
    setSideBar(!sideBar);
  };
  return (
    <>
      <section
        className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-40 bg-white transition-all h-full overflow-y-scroll lg:overflow-auto col-span-1 p-8 border-r text-center ${
          sideBar ? "-left-0" : "-left-full"
        }`}
      >
        <section className="p-8">
          <h1 className="uppercase font-bold tracking-[4px]">Tú logo</h1>
        </section>
        <section className="flex flex-col justify-between h-[630px]">
          <nav>
            <ul>
              <li className="flow-root">
                <Link
                  href="/dashboard"
                  className="flex gap-2 hover:bg-purple-600 p-4 hover:text-white rounded-lg transition-colors text-gray-400 font-semibold"
                >
                  <HiOutlineViewGrid className="h-6 w-6" />
                  Dashboard
                </Link>
              </li>
              <li className="flow-root">
                <Link
                  href="/dashboard/branch"
                  className="flex gap-2 hover:bg-purple-600 p-4 hover:text-white rounded-lg transition-colors text-gray-400 font-semibold"
                >
                  <HiOutlineBuildingOffice2 className="h-6 w-6" />
                  Branch
                </Link>
              </li>
              <li className="flow-root">
                <Link
                  href="/dashboard/clients"
                  as="/dashboard/clients"
                  className="flex gap-2 hover:bg-purple-600 p-4 hover:text-white rounded-lg transition-colors text-gray-400 font-semibold"
                >
                  <HiOutlineUserGroup className="h-6 w-6" />
                  Clients
                </Link>
              </li>
              <li className="flow-root">
                <Link
                  href="/dashboard/employees"
                  className="flex gap-2 hover:bg-purple-600 p-4 hover:text-white rounded-lg transition-colors text-gray-400 font-semibold"
                >
                  <HiOutlineBuildingOffice2 className="h-6 w-6" />
                  Employees
                </Link>
              </li>
            </ul>
          </nav>
          <section className="flex flex-col gap-4">
            <Image
              src="/images/dashboard.svg"
              alt="Picture of the dashboard"
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={"/images/dashboard.svg"}
            />
            <Link
              href="#"
              className="flex gap-2 hover:bg-purple-600 p-4 hover:text-white rounded-lg transition-colors text-gray-400 font-semibold"
            >
              <HiOutlineLogout className="h-6 w-6" />
              LogOut
            </Link>
          </section>
        </section>
      </section>
      <button
        onClick={handleSideBar}
        className="block lg:hidden absolute bottom-4 right-4 bg-purple-600 p-2 text-white rounded-full text-2xl "
      >
        {sideBar ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>
    </>
  );
}

export default NavBarDashboard;
