import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import { useEffect } from "react";

import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";
import { ChatProps } from "../../../types";
import { chats } from "../../../data";
import { Client } from "@stomp/stompjs";
import { useUser } from "../../contexts/UserContext";
import ts from "typescript";
import ChatsPaneDemo from "./ChatPaneDemo";
import MessagesPaneDemo from "./MessagePaneDemo";
export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
  const [msgContent, setMsgContent] = React.useState("");
  const [selectedChatDemo, setSelectedChatDemo] = React.useState({});
  const { user } = useUser();
  const stompClientRef = React.useRef<Client | null>(null);
  const [connectedUsers, setConnectedUsers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [chatMessages, setChatMessages] = React.useState<any[]>([]);

  useEffect(() => {
    connect();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
    //@ts-ignore
  }, [user.username]);

  useEffect(() => {
    findAndDisplayConnectedUsers();
  }, []);

  useEffect(() => {
    // Filter messages to include only those where senderId equals selectedChatDemo.username
    const filteredMessages = messages.filter(
      (message) =>
        //@ts-ignore
        message.senderId === selectedChatDemo.username ||
        //@ts-ignore
        message.recipientId === selectedChatDemo.username
    );
    setChatMessages(filteredMessages);
    //@ts-ignore
  }, [messages, selectedChatDemo.username]);

  function connect() {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/websocket",
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 500,
      onConnect: onConnected,
      onStompError: onError,
      onWebSocketClose: () => {
        console.log("WebSocket closed");
      },
    });
    console.log(`Connecting to WebSocket at ws://localhost:8080/ws/websocket`);
    client.activate();
    stompClientRef.current = client;
  }

  function onConnected() {
    const client = stompClientRef.current;
    if (!client) {
      console.error("stompClient is null on connect");
      return;
    }
    client.subscribe(
      //@ts-ignore

      `/user/${user.username}/queue/messages`,
      onMessageReceived
    );
    client.subscribe(`/user/public`, onMessageReceived);

    client.publish({
      destination: "/app/user.addUser",
      body: JSON.stringify({
        //@ts-ignore

        username: user.username,
        //@ts-ignore

        fullName: `${user.firstName} ${user.lastName}`,
        status: "ONLINE",
        //@ts-ignore

        userId: user.id,
      }),
    });

    findAndDisplayConnectedUsers();
  }

  function onError(error: any) {
    console.error("Error: ", error);
  }

  async function findAndDisplayConnectedUsers() {
    const response = await fetch("http://localhost:8080/connected-users");
    let connectedUsers = await response.json();
    connectedUsers = connectedUsers.filter(
      //@ts-ignore

      (connectedUser: any) => connectedUser.username !== user.username
    );

    console.log("These are connected Users", connectedUsers);
    setConnectedUsers(connectedUsers);
  }

  function onMessageReceived(payload: any) {
    console.log("Message received: ", payload);
    const message = JSON.parse(payload.body);
    //@ts-ignore

    console.log("Selected chat demo: ", selectedChatDemo.username);
    console.log("Message senderId: ", message.senderId);
    // if (
    //   selectedChatDemo.username &&
    //   (selectedChatDemo.username === message.senderId ||
    //     selectedChatDemo.username === message.recipientId)
    // ) {
    displayMessage(
      message.senderId,
      message.recipientId,
      message.content,
      new Date()
    );
    // }
  }

  function displayMessage(
    senderId: string,
    recipientId: string,
    content: string,
    timestamp: Date
  ) {
    const newMessage = { senderId, recipientId, content, timestamp };
    console.log("New message: ", newMessage);
    //@ts-ignore

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  const sendMessage = (event: React.FormEvent) => {
    const messageContent = msgContent.trim();
    if (messageContent && stompClientRef.current) {
      const chatMessage = {
        //@ts-ignore

        senderId: user.username,
        //@ts-ignore

        recipientId: selectedChatDemo.username,
        content: messageContent,
        timestamp: new Date(),
      };
      stompClientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage),
      });
      displayMessage(
        //@ts-ignore

        user.username,
        //@ts-ignore

        selectedChatDemo.username,
        messageContent,
        new Date()
      );
      setMsgContent("");
    }
  };

  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        pt: { xs: "var(--Header-height)", sm: 0 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(30%, 400px)) 1fr",
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: "fixed", sm: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
            sm: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 100,
          width: "100%",
          top: 52,
        }}
      >
        {/* <ChatsPane
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        /> */}
        <ChatsPaneDemo
          // @ts-ignore
          connectedUsers={connectedUsers}
          chats={chats}
          //@ts-ignore

          selectedChatIdDemo={selectedChatDemo.username}
          setSelectedChatDemo={setSelectedChatDemo}
          selectedChatDemo={selectedChatDemo}
        />
      </Sheet>
      {/* <MessagesPane chat={selectedChat} /> */}
      <MessagesPaneDemo
        chat={selectedChatDemo}
        msgContent={msgContent}
        setMsgContent={setMsgContent}
        onSend={sendMessage}
        messages={chatMessages}
        //@ts-ignore

        me={user.username}
      />
    </Sheet>
  );
}
