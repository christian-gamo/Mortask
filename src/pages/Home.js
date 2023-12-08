import React, { useState } from "react";
import NavBar from "./components/NavBar";
import HomeFeatures from "./components/HomeFeatures";
import ToDo from "./components/ToDo";
import SpeedDial from "./components/SpeedDial";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [privateToDos, setprivateToDos] = useState([]);
  const [publicToDos, setpublicToDos] = useState([]);
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

  const fetchPrivateData = async () => {
    const apiUrl = `http://localhost:2020/todoList/privateTodosForUser/${sessionStorage.getItem(
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
      setprivateToDos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPublicData = async () => {
    const publicApiUrl = `http://localhost:2020/todoList/publicTodosForUser/${sessionStorage.getItem(
      "user_id"
    )}`;

    try {
      const response = await fetch(publicApiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setpublicToDos(data);
    } catch (error) {
      console.error("Error fetching public data:", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user_id") == null) {
      router.push("/Login");
    }
    fetchPrivateData();
    fetchPublicData();
    getUserData();
  }, []);

  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      <div>
        <NavBar
          userData={userData}
          privateToDos={privateToDos}
          publicToDos={publicToDos}
        />
        <HomeFeatures userData={userData} />
        <ToDo privateToDos={privateToDos} publicToDos={publicToDos} />
        <SpeedDial />
      </div>
    </>
  );
};

export default Home;
