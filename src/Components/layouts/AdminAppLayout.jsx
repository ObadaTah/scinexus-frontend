import { Outlet } from "react-router-dom";
import Navbar from "../Generic/Navbar";
function AdminAppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AdminAppLayout;
