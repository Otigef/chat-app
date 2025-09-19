import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const isTypingRef = useRef(false);
	const typingTimeoutRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
		if (isTypingRef.current) {
			socket?.emit("stopTyping", { receiverId: selectedConversation?._id });
			isTypingRef.current = false;
		}
	};

	const emitStopTypingWithDelay = () => {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
		typingTimeoutRef.current = setTimeout(() => {
			if (isTypingRef.current) {
				socket?.emit("stopTyping", { receiverId: selectedConversation?._id });
				isTypingRef.current = false;
			}
		}, 1200);
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setMessage(value);
		if (!selectedConversation?._id) return;
		if (!isTypingRef.current && value.trim().length > 0) {
			socket?.emit("typing", { receiverId: selectedConversation._id });
			isTypingRef.current = true;
		}
		emitStopTypingWithDelay();
	};

	useEffect(() => {
		return () => {
			if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
			if (isTypingRef.current && selectedConversation?._id) {
				socket?.emit("stopTyping", { receiverId: selectedConversation._id });
			}
			isTypingRef.current = false;
		};
	}, [selectedConversation?._id]);

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={handleChange}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
