import { Avatar, CardHeader, CardMedia, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { red } from "@mui/material/colors";
import { Image } from "react-bootstrap";

const OrganizationIcon = (props) => {
    return (
        <>
            <CardHeader
                avatar={
                    <Image
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "100%",
                        }}
                        src={props.orgImage}
                    />
                }
                title={props.orgName}
            />
        </>
    );
};
export default OrganizationIcon;
