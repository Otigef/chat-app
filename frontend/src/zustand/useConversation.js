import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	typingByUserId: {},
	setTypingByUserId: (typingByUserId) => set({ typingByUserId }),
}));

export default useConversation;
