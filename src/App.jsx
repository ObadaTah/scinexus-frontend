import { useState } from "react";
// import { getData } from "./ApiFetcher";
// import Footer from "./Components/Generic/Footer";
// import SignIn from "./Pages/Auth/SignIn";
// import SignUp from "./Pages/Auth/SignUp";
import {
    AppstoreOutlined,
    RadiusSettingOutlined,
    HomeFilled,
    SettingFilled,
    PictureFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
const items = [
    {
        label: "Home",
        key: "home",
        icon: <HomeFilled />,
    },
    {
        label: "Navigation Two",
        key: "app",
        icon: <AppstoreOutlined />,
    },
    {
        label: "Profile",
        key: "SubMenu",
        icon: <PictureFilled />,
        children: [
            {
                type: "group",
                label: "Profile",
                children: [
                    {
                        label: "My Profile",
                        key: "myProfile",
                    },
                    {
                        label: "My Organization",
                        key: "myOrganization",
                    },
                ],
            },
            {
                type: "group",
                label: "Settings",
                children: [
                    {
                        label: "Application Settings",
                        key: "appSettings",
                        icon: <SettingFilled />,
                    },
                ],
            },
        ],
    },
    {
        label: (
            <a
                href="https://ant.design"
                target="_blank"
                rel="noopener noreferrer"
            >
                Navigation Four - Link
            </a>
        ),
        key: "alipay",
    },
];

function App() {
    // const [apiData, setApiData] = useState();

    // useEffect(() => {
    //     // getData("academics")
    //     //     .then((data) => {
    //     //         setApiData(data);
    //     //         console.log(apiData);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error("Error while fetching data:", error);
    //     //     });
    // }, []);
    const [current, setCurrent] = useState("mail");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default App;
