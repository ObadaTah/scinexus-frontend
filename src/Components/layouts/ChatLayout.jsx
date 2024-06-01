import { Outlet } from "react-router-dom";
import Navbar from "../Generic/Navbar";

function ChatLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ChatLayout;
