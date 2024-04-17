import {
    HomeFilled,
    LogoutOutlined,
    ReadOutlined,
    SettingFilled,
} from "@ant-design/icons";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Outlet, Link } from "react-router-dom";

import { Menu } from "antd";
import { useState } from "react";
import MyProfileIcon from "./MyProfileIcon";
const items = [
    {
        label: <Link to="/">Home</Link>,
        key: "home",
        icon: <HomeFilled />,
    },
    {
        label: <Link to="/myLinks">My Links</Link>,
        key: "links",
        icon: <PeopleAltIcon />,
    },
    {
        label: <Link to="/notifications">Notifications</Link>,
        key: "notifications",
        icon: <NotificationsIcon />,
    },

    {
        label: "Profile",
        key: "SubMenu",
        icon: <MyProfileIcon />,
        children: [
            {
                type: "group",
                label: "Profile",
                children: [
                    {
                        label: <Link to="/myProfile">My Profile</Link>,
                        key: "myProfile",
                        icon: <AssignmentIndIcon />,
                    },
                    {
                        label: (
                            <Link to="/myOrganization">My Organization</Link>
                        ),
                        key: "myOrganization",
                        icon: <ReadOutlined />,
                    },
                    {
                        label: <Link to="/logout">Logout</Link>,
                        key: "logout",
                        icon: <LogoutOutlined />,
                    },
                ],
            },
            {
                type: "group",
                label: "Settings",
                children: [
                    {
                        label: <Link to="/settings">Settings</Link>,
                        key: "appSettings",
                        icon: <SettingFilled />,
                    },
                ],
            },
        ],
    },
];

function Navbar() {
    const [current, setCurrent] = useState("mail");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <>
            <Menu
                style={{
                    width: "100%",
                    // alignItems: "center",
                    // alignContent: "center",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                }}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
            <Outlet />
        </>
    );
}

export default Navbar;
