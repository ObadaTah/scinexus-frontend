import { Avatar, CardHeader } from "@mui/material";
// import { Avatar } from "@nextui-org/react";

const IconAndText = (props) => {
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar
                        style={{
                            width: "30px",
                            height: "30px",
                            // borderRadius: "100%",
                        }}
                        src={props.iconSrc}
                    />
                }
                title={props.text}
            />
        </>
    );
};
export default IconAndText;
