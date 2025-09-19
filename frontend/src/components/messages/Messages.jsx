import { useEffect, useMemo, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();
	const { selectedConversation, typingByUserId } = useConversation();
	const isPeerTyping = useMemo(() => {
		if (!selectedConversation?._id) return false;
		return Boolean(typingByUserId[selectedConversation._id]);
	}, [typingByUserId, selectedConversation?._id]);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}

			{isPeerTyping && (
				<div className='text-xs text-gray-300 italic my-2'>Typing...</div>
			)}
		</div>
	);
};
export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
