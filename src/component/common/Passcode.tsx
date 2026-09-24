import { useState, useEffect } from "react";
import foodaLogo from "../../Styles/assets/img/foodasso.svg";
import loginImage from "../../Styles/assets/img/passcode.png";
import vectoricon from "../../Styles/assets/img/Vectorclear.svg";
import backspace from "../../Styles/assets/img/Iconsbackspace.svg";
import userlogin from "../../Styles/assets/img/user-icon.svg";
import code from "../../Styles/assets/img/code-icon.svg";
import Footer from "../layout/Footer";

const Passcode = () => {
  const [passcode, setPasscode] = useState("");

  const handlePasscodeChange = (digit: string) => {
    if (passcode.length < 4) {
      setPasscode((prev) => prev + digit);
    }
  };

  const handleClear = () => setPasscode("");

  const handleBackspace = () => setPasscode((prev) => prev.slice(0, -1));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") {
        handlePasscodeChange(event.key);
      } else if (event.key === "Backspace") {
        event.preventDefault();
        handleBackspace();
      } else if (event.key === "Escape") {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [passcode]);

  useEffect(() => {
    if (passcode.length === 4) {
      const timer = setTimeout(() => {
        localStorage.setItem("isLogin", "true");
        window.location.href = "/"; // Redirect to the home page or desired page
      }, 100);

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [passcode]);

  const handleLoginClick = () => {
    window.location.href = "/login"; // Navigate to the login page
  };

  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <div className="w-full ">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <img className="h-12" src={foodaLogo} alt="Foodasso Logo" />
            <div>
              <h2 className="text-lg font-bold mb-1">7 Foodies</h2>
              <p className="text-gray-500">REF No.: 335044</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="md:flex items-center justify-center">
              <img
                className="w-full"
                src={loginImage}
                alt="Login Illustration"
              />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <h2 className="text-center text-lg font-bold mb-4 border-b border-gray-400 w-full py-1">
                Enter the passcode to access this billing station
              </h2>
              <div className="flex space-x-2 mb-6 bg-gray-100 px-12 gap-16 py-7 mr-14">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full border border-black transition-colors ${
                      passcode[i] ? "bg-black" : "bg-white"
                    } flex items-center justify-center`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6 mb-6 max-w-sm w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "backspace"].map(
                  (key, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (key === "clear") handleClear();
                        else if (key === "backspace") handleBackspace();
                        else handlePasscodeChange(key.toString());
                      }}
                      className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-300 transition-colors text-xl"
                      aria-label={
                        key === "clear"
                          ? "Clear"
                          : key === "backspace"
                          ? "Backspace"
                          : key.toString()
                      }
                      tabIndex={0}
                    >
                      {typeof key === "number" ? (
                        key
                      ) : key === "clear" ? (
                        <img className="w-8 h-8" src={vectoricon} alt="Clear" />
                      ) : (
                        <img
                          className="w-8 h-8"
                          src={backspace}
                          alt="Backspace"
                        />
                      )}
                    </button>
                  )
                )}
              </div>
              <div className="flex items-center w-full pt-4">
                <div className="flex-1 border-t border-gray-400" />
                <span className="mx-4 text-gray-500">Log In With</span>
                <div className="flex-1 border-t border-gray-400" />
              </div>
              {/* <div className="flex justify-center items-center">
                <div className="grid grid-cols-2 gap-8 mt-5">
                  <div
                    onClick={handleLoginClick}
                    className="flex flex-col items-center px-7 py-4 bg-custom-gray rounded-lg cursor-pointer"
                  >
                    <div className="mb-2 text-gray-700">
                      <img className="w-8 h-8" src={userlogin} alt="Login" />
                    </div>
                    <div className="text-gray-700">Login</div>
                  </div>
                  <div className="flex flex-col items-center  px-7 py-4 bg-custom-gray rounded-lg border-b-4 border-orange-400">
                    <div className="mb-2 text-gray-700">
                      <img className="w-8 h-8" src={code} alt="Passcode" />
                    </div>
                    <div className="text-gray-700">Passcode</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Passcode;
