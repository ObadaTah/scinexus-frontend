import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MenuItem, Snackbar, Typography } from "@mui/joy";

function NotificationList() {
    const { jwtToken } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState("block");
    const [open, setOpen] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState("");
    useEffect(function () {
        async function getNotifications() {
            const response = await fetch(
                "http://localhost:8080/notifications",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                console.log(data["_embedded"].notificationList);
                var newNotifications = [];
                setNotifications(data["_embedded"].notificationList);
                if (notifications.length === 0) {
                    setNotifications(data["_embedded"].notificationList);
                    setIsLoading("none");
                    return;
                } else if (
                    notifications.length !==
                    data["_embedded"].notificationList.length
                ) {
                    var found = false;
                    notifications.forEach((notification) => {
                        data["_embedded"].notificationList.forEach(
                            (newNotification) => {
                                if (notification.id === newNotification.id)
                                    found = true;
                            }
                        );
                        if (!found && notification.status === "UNSEEN") {
                            console.log(notification);
                            newNotifications.push(notification);
                        }
                    });

                    newNotifications.forEach((notification) => {
                        setSnackbarContent(notification.content);
                        setOpen(true);
                        sleep(3000);
                    });
                    setNotifications(data["_embedded"].notificationList);
                }
                setNotifications(data["_embedded"].notificationList);
            } else {
                // Handle error
            }
            setIsLoading("none");
        }
        getNotifications();
        setInterval(getNotifications, 100000);
    }, []);
    return (
        <>
            {notifications.map((notification) => {
                return <MenuItem>{notification.content}</MenuItem>;
            })}
        </>
    );
}
export default NotificationList;
{
    /* <Snackbar
        autoHideDuration={3000}
        open={open}
        variant={"solid"}
        color="success"
        onClose={(event) => {
            setOpen(false);
        }}
    >
        {snackbarContent}{" "}
    </Snackbar> */
}
