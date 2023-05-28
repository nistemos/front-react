"use client";
import useSWR from "swr";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useModalContext } from "@/context/modalcontext";
//import { showToastError, showToastInfo } from "../Toast";

const fetcherGet = async () =>
  await fetch("http://localhost:3001/v1/api/sucursal", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
const fetcherGetTown = async () =>
  await fetch("http://localhost:3001/v1/api/deparmento", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
const fetcherPost = async (data) =>
  await fetch(`http://localhost:3001/v1/api/sucursal`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      departamento: data.municipio,
    }),
  }).then((res) => res.json());
const fetcherPut = async (id, data) =>
  await fetch(`http://localhost:3001/v1/api/sucursal/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      departamento: data.municipio,
    }),
  }).then((res) => res.json());

const fetcherDeleteBranch = async (id) =>
  await fetch(`http://localhost:3001/v1/api/sucursal/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
let auxId;
function Table() {
  const {
    showToastInfo,
    showToastSuccess,
    showToastError,
    showToastWarn,
    newBranch,
    createBranch,
  } = useModalContext();

  //modal
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [opencreate, setOpenCreate] = useState(false);
  const [updateBranch, setUpdateBranch] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    municipio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateBranch({
      ...updateBranch,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateBranch);
    setOpenupdate(false);
    createBranch(
      updateBranch.nombre,
      updateBranch.direccion,
      updateBranch.telefono,
      updateBranch.municipio
    );
    try {
      if (
        !(
          updateBranch.nombre &&
          updateBranch.direccion &&
          updateBranch.telefono &&
          updateBranch.municipio
        )
      ) {
        showToastError("Text fields cannot be empty");
      } else {
        fetcherPut(auxId, updateBranch)
          .then((res) => {
            if (res.status === 200) {
              setUpdateBranch({
                nombre: "",
                direccion: "",
                telefono: "",
                municipio: "",
              });
              setOpenupdate(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitCreate = (e) => {
    e.preventDefault();
    console.log(updateBranch);
    setOpenCreate(false);
    createBranch(
      updateBranch.nombre,
      updateBranch.direccion,
      updateBranch.telefono,
      updateBranch.municipio
    );
    try {
      if (
        updateBranch.nombre &&
        updateBranch.direccion &&
        updateBranch.telefono &&
        updateBranch.municipio
      ) {
        fetcherPost(updateBranch)
          .then((res) => {
            if (res.status === 200) {
              setUpdateBranch({
                nombre: "",
                direccion: "",
                telefono: "",
                municipio: "",
              });
              setOpencreate(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelButtonRef = useRef(null);
  const handleModal = () => {
    setOpen(!open);
  };
  //apis
  const { data, error } = useSWR(
    "http://localhost:3001/v1/api/sucursal",
    fetcherGet,
    { refreshInterval: 250 }
  );
  if (error)
    <>
      <section className="bg-white rounded-3xl p-8 text-center">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Town</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>Failed to load</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>;
  if (!data)
    return (
      <>
        <section className="bg-white rounded-3xl p-8 text-center">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Town</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>Load ...</td>
              </tr>
            </tbody>
          </table>
        </section>
      </>
    );

  return (
    <section>
      <button
        onClick={() => setOpenCreate(true)}
        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded"
      >
        Create Branch
      </button>
      <section className="bg-white rounded-3xl p-8 text-center mt-2">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Town</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item) =>
                item.state ? (
                  <tr className="hover:bg-gray-100" key={item._id}>
                    <td>{item.nombre}</td>
                    <td>{item.direccion}</td>
                    <td>{item.telefono}</td>
                    <td>{item.departamento.MUNICIPIO}</td>
                    <td className="flex w-full text-center">
                      <HiOutlinePencil
                        className="w-5 h-5 mx-auto cursor-pointer"
                        onClick={() => {
                          auxId = item._id;
                          setUpdateBranch({
                            nombre: item.nombre,
                            direccion: item.direccion,
                            telefono: item.telefono,
                            municipio: item.departamento._id,
                          });
                          setOpenupdate(true);
                        }}
                      />
                      <HiOutlineTrash
                        className="w-5 h-5 cursor-pointer mx-auto"
                        onClick={() => {
                          auxId = item._id;
                          setOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr className="hover:bg-gray-100">
                <td colSpan={5}>no available data</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Branch
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete? All of your data
                            will be permanently removed. This action cannot be
                            undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        fetcherDeleteBranch(auxId);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openupdate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpenupdate}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                          <HiArrowPathRoundedSquare
                            className="h-6 w-6 text-purple-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Update Branch
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                  Branch Information
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                  This information will be displayed publicly so
                                  be careful what you share.
                                </p>

                                <div className="mt-5 grid grid-cols-1 gap-y-2 sm:grid-cols-6">
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="nombre"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Branch
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="nombre"
                                        required
                                        value={updateBranch.nombre}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="direccion"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      address
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="direccion"
                                        required
                                        value={updateBranch.direccion}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="telefono"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Phone
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="telefono"
                                        required
                                        value={updateBranch.telefono}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="municipio"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Municipio
                                    </label>
                                    <div className="">
                                      <select
                                        defaultValue={updateBranch.municipio}
                                        name="municipio"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      >
                                        <option value="">choose town</option>
                                        <option value="6462683f9ad02f4e89c75e7a">
                                          Neiva
                                        </option>
                                        <option value="6462683f9ad02f4e89c7602c">
                                          Bogota DC
                                        </option>
                                        <option value="6462683f9ad02f4e89c75c73">
                                          Medellin
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto disabled:backdrop-opacity-30"
                        disabled={
                          !updateBranch.nombre &&
                          !updateBranch.direccion &&
                          !updateBranch.municipio &&
                          !updateBranch.telefono
                        }
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpenupdate(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={opencreate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpenCreate}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleSubmitCreate}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                          <HiArrowPathRoundedSquare
                            className="h-6 w-6 text-purple-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Create Branch
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                  Branch Information
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                  This information will be displayed publicly so
                                  be careful what you share.
                                </p>

                                <div className="mt-5 grid grid-cols-1 gap-y-2 sm:grid-cols-6">
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="nombre"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Branch
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="nombre"
                                        required
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="direccion"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      address
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="direccion"
                                        required
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="telefono"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Phone
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="telefono"
                                        required
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="municipio"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Municipio
                                    </label>
                                    <div className="">
                                      <select
                                        defaultValue={updateBranch.municipio}
                                        name="municipio"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 pr-4 outline-none"
                                      >
                                        <option value="">choose town</option>
                                        <option value="6462683f9ad02f4e89c75e7a">
                                          Neiva
                                        </option>
                                        <option value="6462683f9ad02f4e89c7602c">
                                          Bogota DC
                                        </option>
                                        <option value="6462683f9ad02f4e89c75c73">
                                          Medellin
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto disabled:backdrop-opacity-30"
                        disabled={
                          !updateBranch.nombre &&
                          !updateBranch.direccion &&
                          !updateBranch.municipio &&
                          !updateBranch.telefono
                        }
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpenCreate(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
}

export default Table;
