import { Outlet } from "react-router-dom"
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div className="w-full bg-[#E0F2F1]">
      <div className="w-[100%]">
      <Navbar />
      </div>
      <div className="lg:flex">
        <div className="ml-2 lg:ml-10 my-10">
          <Sidebar />
        </div>
        <div className="w-full ">
          <div className="mx-2 lg:mx-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
