import SendIcon from "@mui/icons-material/Send";
function SendButton(props) {
    const onClick = () => {
        console.log("Send button clicked " + props.postId);
    };

    return (
        // TBI : To be implemented

        <SendIcon onClick={() => onClick()} />
    );
}

export default SendButton;
