import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/joy/Typography";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import "./style.css";
function SendButton(props) {
    const onClick = () => {
        console.log("Send button clicked " + props.postId);
    };

    return (
        // TBI : To be implemented

        <>
            <div className="reactionButton">
                <IosShareOutlinedIcon />
            </div>
            <Typography style={{ marginLeft: 5 }}>Share</Typography>

            {/* <Typography className="p-2">Send</Typography> */}
        </>
    );
}

export default SendButton;
