import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    navigate("signin");
  };
  return (
    <div className=" flex py-2 px-12 border-b-[1px] items-center sticky top-0 bg-white ">
      <div className="text-2xl font-serif">Task Manager</div>
      <div className="ms-auto flex items-center">
        <div
          className="text-blue-500 px-2 cursor-pointer hover:bg-blue-50 "
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </div>
        <div
          className="text-red-500 px-2 cursor-pointer hover:bg-red-50 "
          onClick={handleLogOut}
        >
          LogOut
        </div>
        {/* <div className="ms-2 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {`A`}
          </span>
        </div> */}
      </div>
    </div>
  );
}
