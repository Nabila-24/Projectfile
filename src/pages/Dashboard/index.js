import React, { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { config } from "../../config/config";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/posts`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

const Dashboard = () => {
  const posts = useLoaderData();
  const [items, setItems] = useState(posts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  // const [editTitle, seteditTitle] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    let obj = {
      id: items.length + 1,
      title: title,
    };
    items.unshift(obj);
    items.map((val, index) => (val.id = index + 1));
    setItems([...items]);
    setIsModalOpen(false);
    reset();
  }

  const handleEdit = (id) => {
    const find = items.find((item) => item.id === id);
    setTitle(find.title);
    setId(find.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const filter = items.filter((item) => item.id !== id);
    setItems(filter);
  };

  const reset = () => {
    setTitle("");
    setId("");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    reset();
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Button
          type="submit"
          size="large"
          className=""
          onClick={() => setIsModalOpen(true)}
        >
          Add
        </Button>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-600">Id</th>
              <th className="px-4 py-2 text-gray-600">Title</th>
              <th className="px-4 py-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                  {item.id}
                </td>

                <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                  {item.title}
                </td>

                <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      size="large"
                      className="mr-3"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="large"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateModal
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
        handleClick={handleClick}
        title={title}
        setTitle={setTitle}
        id={id}
        setId={setId}
      />
    </div>
  );
};
export default Dashboard;

function CreateModal({
  isModalOpen,
  handleModalClose,
  handleClick,
  title,
  setTitle,
  id,
  setId,
}) {
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-slate-200 rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={handleModalClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <form className="space-y-6" onSubmit={handleClick}>
              <div className="mb-4">
                <Input
                  label="Title"
                  name="title"
                  id="title"
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center">
                <Button type="submit" size="large" className="mr-3">
                  Add
                </Button>
                <Button
                  type="button"
                  size="large"
                  variant="danger"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
