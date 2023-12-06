import React, { useState } from "react";
import NavBar from "./components/NavBar";
import HomeFeatures from "./components/HomeFeatures";
import ToDo from "./components/ToDo";
import SpeedDial from "./components/SpeedDial";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const apiUrl = `http://localhost:2020/users/${sessionStorage.getItem(
      "user_id"
    )}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user_id") == null) {
      router.push("/Login");
    }
    getUserData();
  }, []);

  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      <div>
        <NavBar userData={userData} />
        <HomeFeatures userData={userData} />
        <ToDo />
        <SpeedDial />
      </div>
    </>
  );
}

export default Home;
