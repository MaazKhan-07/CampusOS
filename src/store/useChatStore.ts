import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatConversation, ChatMessage } from '../types';
import { mockChats } from '../data/chats';

interface ChatState {
  conversations: ChatConversation[];
  activeConversationId: string;
  isTyping: boolean;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenChat: (
    participant: { id: string; name: string; avatar: string; role: string; online: boolean },
    contextType: 'book' | 'lost_found' | 'general',
    contextTitle: string,
    contextId?: string
  ) => string;
  resetChats: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: mockChats,
      activeConversationId: 'chat-1',
      isTyping: false,

      setActiveConversation: (id: string) => {
        set((state) => ({
          activeConversationId: id,
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, unreadCount: 0 } : c
          ),
        }));
      },

      sendMessage: (conversationId: string, text: string) => {
        const userMsg: ChatMessage = {
          id: 'msg-' + Date.now(),
          senderId: 'user-student-1',
          text,
          timestamp: 'Just now',
          isRead: true,
        };

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: text,
                  lastMessageTime: 'Just now',
                  messages: [...c.messages, userMsg],
                }
              : c
          ),
          isTyping: true,
        }));

        // Simulate typing response after 1.5s
        setTimeout(() => {
          const autoReplies = [
            'Thanks for reaching out! Let\'s meet by the college canteen at 1:30 PM.',
            'Got it, sounds great! I\'ll bring the original document/receipt with me.',
            'Perfect! Looking forward to it.',
            'Awesome, please feel free to call or ping me once you reach the campus building.',
            'Confirmed! See you there.',
          ];
          const replyText = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          const conv = get().conversations.find((c) => c.id === conversationId);
          const replyMsg: ChatMessage = {
            id: 'msg-' + (Date.now() + 1),
            senderId: conv?.participant.id || 'partner',
            text: replyText,
            timestamp: 'Just now',
            isRead: false,
          };

          set((state) => ({
            isTyping: false,
            conversations: state.conversations.map((c) =>
              c.id === conversationId
                ? {
                    ...c,
                    lastMessage: replyText,
                    lastMessageTime: 'Just now',
                    messages: [...c.messages, replyMsg],
                  }
                : c
            ),
          }));
        }, 1500);
      },

      startOrOpenChat: (participant, contextType, contextTitle, contextId) => {
        const existing = get().conversations.find(
          (c) => c.participant.id === participant.id && c.contextTitle === contextTitle
        );

        if (existing) {
          set({ activeConversationId: existing.id });
          return existing.id;
        }

        const newId = 'chat-' + Date.now();
        const newConv: ChatConversation = {
          id: newId,
          contextType,
          contextTitle,
          contextId,
          participant,
          lastMessage: `Started conversation regarding ${contextTitle}`,
          lastMessageTime: 'Just now',
          unreadCount: 0,
          messages: [
            {
              id: 'init-' + Date.now(),
              senderId: participant.id,
              text: `Hi! This is an in-app secure chat regarding ${contextTitle}. Phone numbers remain masked for privacy.`,
              timestamp: 'Just now',
              isRead: true,
            },
          ],
        };

        set((state) => ({
          conversations: [newConv, ...state.conversations],
          activeConversationId: newId,
        }));
        return newId;
      },

      resetChats: () => {
        set({
          conversations: mockChats,
          activeConversationId: 'chat-1',
          isTyping: false,
        });
      },
    }),
    {
      name: 'campus-os-chats',
    }
  )
);

