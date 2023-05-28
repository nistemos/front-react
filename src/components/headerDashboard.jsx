"use client";
import Link from "next/link";
import { HiOutlineBell, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BsFillCircleFill } from "react-icons/bs";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function HeaderDashboard() {
  return (
    <>
      <header className="bg-white flex flex-col md:flex-row gap-4 items-center justify-between p-4 lg:pl-12 w-full">
        <form
          action=""
          className="w-full md:[40%] lg:w-[30%] order-1 md:order-none"
        >
          <section className="relative">
            <HiOutlineMagnifyingGlass className="absolute left-2 top-3 text-gray-400" />
            <input
              type="search"
              className="py-2 pl-8 pr-4 outline-none rounded-lg bg-gray-100 w-full"
              placeholder="Buscar"
            />
          </section>
        </form>
        <nav className="w-full md:[60%] lg:w-[70%] flex justify-center md:justify-end">
          <ul className="flex items-center gap-4">
            <li>
              <Link rel="preload" href="#" className="relative">
                <HiOutlineBell className="text-xl" />
                <BsFillCircleFill className="absolute -right-1 -top-1 text-red-400 h-2 w-2" />
              </Link>
            </li>
            <li>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex w-full justify-center items-center gap-2 rounded-full outline-none focus:outline-none px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src="/images/edward.jpg"
                      width={200}
                      height={200}
                      alt="Picture of the author"
                    />
                    Edwar Mayorga
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/profile"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Your profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Sign Out
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HeaderDashboard;
