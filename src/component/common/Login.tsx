import { useEffect, useState } from "react";
import loginImage from "../../Styles/assets/img/login-final.jpg";
import foodassoLogo from "../../Styles/assets/img/foodasso.svg";
import userlogin from "../../Styles/assets/img/user-icon.svg";
import code from "../../Styles/assets/img/code-icon.svg";
import Footer from "../layout/Footer";
import apiClient from "../../Api/ApiClient";
import { useNavigate } from "react-router-dom";
import { useTabContext } from "../../contexts/TabContext";
import { setLoginUserData } from "../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserData } = useTabContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    // Handle login logic here
    // console.log("Logging in with", credentials);
    // localStorage.setItem("isLogin", "true");
    // window.location.href = "/";

    try {
      const finalData: any = {
        username: credentials?.username,
        password: credentials?.password,
      };

      const response = await apiClient.post(
        "/user_management/v1/biller_app_user/biller_login/",
        finalData
      );
      const userData = response.data.data;
      console.log("API Response:", userData);

      // Set tokens in localStorage
      if (userData && response.status === 200) {
        localStorage.setItem("access_token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token);
        localStorage.setItem("user_data", JSON.stringify(userData));
        localStorage.setItem("isLogin", "true");
        setUserData(userData);
        dispatch(setLoginUserData(userData));
        setIsLoggedIn(true);
        // toast.success(response.data.message); // Success toast
      }
    } catch (error: any) {
      const errorMessage = error.message || "Login failed";
      // toast.error(`Error: ${errorMessage}`); // Error toast
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/billing");
      window.location.href = "/billing";
    }
  }, [isLoggedIn, navigate]);

  const handlePasscodeClick = () => {
    // Navigate to the passcode page
    window.location.href = "login/passcode";
  };

  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <div className="w-full ">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <img className="h-12" src={foodassoLogo} alt="Foodasso Logo" />
            <div>
              <h2 className="text-lg font-bold mb-1">7 Foodies</h2>
              <p className="text-gray-500">REF No.: 335044</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="">
              <img
                className="w-full"
                src={loginImage}
                alt="Login Illustration"
              />
            </div>
            <div className="p-6 flex flex-col justify-center bg-white">
              <h2 className="text-center text-lg font-bold mb-4">
                Login To Billing Station
              </h2>
              <form className="space-y-4" action="post">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <input
                      type="text"
                      name="username"
                      placeholder="User Name"
                      // value={credentials.username}
                      onChange={handleInputChange}
                      className="w-full p-2 outline-none"
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      // value={credentials.password}
                      onChange={handleInputChange}
                      className="w-full p-2 outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-orange-400 text-white rounded hover:bg-orange-400 mb-4"
                  onClick={() => handleLogin()}
                >
                  Log In
                </button>
                <div className="flex items-center w-full pt-4">
                  <div className="flex-1 border-t border-gray-400"></div>
                  <span className="mx-4 text-gray-500">Log In With</span>
                  <div className="flex-1 border-t border-gray-400"></div>
                </div>
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-8 mt-5">
                    <div className="flex flex-col items-center px-7 py-4 bg-custom-gray  rounded-lg border-b-4 border-orange-400">
                      <div className="mb-2 text-gray-700">
                        <img
                          className="w-8 h-8 cursor-pointer"
                          src={userlogin}
                          alt="Login Illustration"
                        />{" "}
                      </div>
                      <div className="text-gray-700">Login</div>
                    </div>
                    {/* <div
                      className="flex flex-col items-center px-7 py-4 bg-custom-gray rounded-lg cursor-pointer"
                      onClick={handlePasscodeClick}
                    >
                      <div className="mb-2 text-gray-700">
                        <img
                          className="w-8 h-8"
                          src={code}
                          alt="Login Illustration"
                        />
                      </div>
                      <div className="text-gray-700">Passcode</div>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
