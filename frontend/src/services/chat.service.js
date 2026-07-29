// src/services/chat.service.js

import api from "./api";

const chatService = {
    getConversations() {
        return api.get("/chat");
    },
    getMessages(conversationId) {
        return api.get(`/chat/${conversationId}`);
    },
    sendMessage(conversationId, message) {
        return api.post(`/chat/${conversationId}`, message);
    },
    markRead(conversationId) {
        return api.patch(`/chat/${conversationId}/read`);
    },
    uploadImage(formData) {
        return api.post("/chat/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default chatService;
