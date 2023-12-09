import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("user_id") != null) {
      router.replace("/Home");
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:2020/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_fname: fname,
          user_lname: lname,
          user_email: email,
          user_password: password,
          user_status: "0",
        }),
      });

      if (response.ok) {
        const { user_id } = await response.json();
        console.log(user_id);
        sessionStorage.setItem("user_id", user_id);
        router.replace("/Home", { scroll: false });
      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error === "User already exists") {
          // Render error message for existing user
          setErrorMessage("This user already exists, please try again");
        } else {
          // Handle other error cases
          console.log("Registration failed:", errorData);
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex flex-col items-center justify-center mb-4">
          {errorMessage && (
            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 me-3" />
              <span className="font-medium">Something went wrong !</span>&nbsp;
              <p>{errorMessage}</p>
            </div>
          )}
          </div>
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* Logo */}
            <Image
              className="mr-2"
              width={80}
              height={80}
              src="/mortis.png"
              alt="Logo"
            />
            {/* App Name */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Mortask
            </h1>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register
              </h1>
              <div className="space-y-4 md:space-y-6" action="#">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    {/* Firstname */}
                    <label
                      htmlFor="firstname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Firstname
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mortis"
                      required
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    {/* Lastname */}
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Lastname
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="BringerOfDoom"
                      required
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="mortis@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* Password */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900"
                  onClick={() => handleRegister()}
                >
                  Register
                </button>
                {/* Login Link */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/Login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-50"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
