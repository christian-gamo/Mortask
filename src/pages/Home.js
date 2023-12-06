import React from "react";
import NavBar from "./components/NavBar";
import HomeFeatures from "./components/HomeFeatures";
import ToDo from "./components/ToDo";
import SpeedDial from "./components/SpeedDial";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {

  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("user_id") == null) {
      router.push("/Login");
    }
  }, []);

  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      <div>
        <NavBar />
        <HomeFeatures />
        <ToDo />
        <SpeedDial />
      </div>
    </>
  );
}

export default Home;
