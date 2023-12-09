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
