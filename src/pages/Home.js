import { useEffect } from "react";
import NavBar from "./components/NavBar";
import HomeFeatures from "./components/HomeFeatures";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("user_id") == null) {
      router.push("/Login");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <HomeFeatures />
    </div>
  );
}

export default Home;
