import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HomeFeatures = (props) => {
  const userData = props.userData;
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <>
      <div className="p-3 sm:ml-64">
        <div className="relative items-center justify-center h-48 my-4 lg:px-10">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search a task"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex flex-col md:flex-row items-center pt-12">
            <Image
              width={80}
              height={80}
              src="/happy_mortis.png"
              alt="Happy Mortis"
            />
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white md:ml-4">
              {getGreeting()}, {userData?.user_fname}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFeatures;
