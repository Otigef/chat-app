import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, typingByUserId, setTypingByUserId } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		socket?.on("typing", ({ senderId }) => {
			if (!senderId) return;
			setTypingByUserId({ ...typingByUserId, [senderId]: true });
		});

		socket?.on("stopTyping", ({ senderId }) => {
			if (!senderId) return;
			const updated = { ...typingByUserId };
			delete updated[senderId];
			setTypingByUserId(updated);
		});

		return () => {
			socket?.off("newMessage");
			socket?.off("typing");
			socket?.off("stopTyping");
		};
	}, [socket, setMessages, messages, typingByUserId, setTypingByUserId]);
};
export default useListenMessages;
