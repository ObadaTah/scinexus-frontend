import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import ChatBubbleDemo from "./ChatBubbleDemo";
import { ChatProps, MessageProps } from "../../../types";

// type MessagesPaneProps = {
//   chat: ChatProps;
// };

export default function MessagesPaneDemo(props: any) {
  const { chat, msgContent, setMsgContent, onSend, messages, me } = props;
  const [chatMessages, setChatMessages] = React.useState(messages);

  console.log("These are the messages", chatMessages);

  React.useEffect(() => {
    setChatMessages(messages);
  }, []);

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      <MessagesPaneHeader
        sender={{
          name: chat.fullName,
          username: `@${chat.username}`,
          avatar: "/static/images/avatar/2.jpg",
          online: chat.status === "ONLINE",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {messages.map((message: any, index: number) => {
            console.log("There are the messages", messages);
            const isYou = message.senderId === me;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {message.senderId !== me && (
                  <AvatarWithStatus
                    online={chat.status === "ONLINE"}
                    src="/static/images/avatar/2.jpg"
                  />
                )}
                <ChatBubbleDemo
                  variant={isYou ? "sent" : "received"}
                  me={me}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={msgContent}
        setTextAreaValue={setMsgContent}
        onSubmit={onSend}
      />
    </Sheet>
  );
}
