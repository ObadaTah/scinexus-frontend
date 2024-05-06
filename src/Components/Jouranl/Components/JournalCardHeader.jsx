import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

function JournalCardHeader(props) {
    return (
        <CardHeader
            avatar={
                <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={
                        props.publisher.profilePicture != null
                            ? props.publisher.profilePicture.fileName
                            : null
                    }
                >
                    {props.publisher.firstName[0]}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title={props.publisher.firstName + " " + props.publisher.lastName}
            subheader={new Date(props.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
            })}
        />
    );
}
export default JournalCardHeader;
