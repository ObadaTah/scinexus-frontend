import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import AvatarWithStatus from "./AvatarWithStatus";
import { ChatProps, MessageProps, UserProps } from "../../../types";
import { toggleMessagesPane } from "../../../utils";

// type ChatListItemProps = ListItemButtonProps & {
//   id: string;
//   unread?: boolean;
//   sender: UserProps;
//   messages: MessageProps[];
//   selectedChatId?: string;
//   setSelectedChat: (chat: ChatProps) => void;
// };

export default function ChatListItemDemo(props: any) {
  //   const { id, sender, messages, selectedChatId, setSelectedChat } = props;
  const {
    userId,
    fullName,
    status,
    username,
    selectedChatIdDemo,
    setSelectedChatDemo,
    selectedChatDemo,
  } = props;
  console.log(userId, fullName, status, username);

  const selected = selectedChatIdDemo === username;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChatDemo({ userId, fullName, status, username });
            // setSelectedChat({ id, sender, messages });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: "column",
            alignItems: "initial",
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={status === "ONLINE"} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{fullName}</Typography>
              <Typography level="body-sm">@{username}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: "right",
              }}
            >
              {/* {messages[0].unread && ( */}
              {/* <CircleIcon sx={{ fontSize: 12 }} color="primary" /> */}
              {/* )} */}
              <Typography
                level="body-xs"
                display={{ xs: "none", md: "block" }}
                noWrap
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {/* {messages[0].content} */}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
