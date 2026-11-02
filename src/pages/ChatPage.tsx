import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import {
  MessageSquare,
  Send,
  Search,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  BookOpen,
  Tag,
} from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

export const ChatPage: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversation, sendMessage, isTyping } =
    useChatStore();
  const { currentUser } = useAuthStore();

  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileThreadView, setIsMobileThreadView] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConv) return;
    sendMessage(activeConv.id, messageText.trim());
    setMessageText('');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contextTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-6xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Privacy Notice Banner */}
      <div className="px-4 py-2.5 rounded-2xl bg-surface border border-border shadow-soft-sm flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="text-text-muted">
            <strong className="text-primary font-heading">Masked Privacy Relay Active:</strong> Personal phone numbers and WhatsApp IDs remain confidential between campus peers.
          </span>
        </div>
        <span className="text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/20 hidden sm:inline">
          End-to-End Encrypted Node
        </span>
      </div>

      {/* Main Two-Pane Chat Container */}
      <div className="flex-1 bg-surface rounded-3xl border border-border shadow-soft-sm overflow-hidden flex min-h-0">
        {/* Left Pane: Conversation List */}
        <div
          className={`w-full md:w-80 border-r border-border flex flex-col shrink-0 ${
            isMobileThreadView ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search Contacts / Context */}
          <div className="p-3.5 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search messages or books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-muted text-text placeholder:text-text-muted text-xs pl-8 pr-3 py-2 rounded-xl border border-border focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Conversations Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConversation(conv.id);
                    setIsMobileThreadView(true);
                  }}
                  className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 ${
                    isActive ? 'bg-surface-muted/90' : 'hover:bg-surface-muted/40'
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar
                      src={conv.participant.avatar}
                      name={conv.participant.name}
                      size="md"
                      isVerified={true}
                    />
                    {conv.participant.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-heading font-bold text-xs text-primary truncate">
                        {conv.participant.name}
                      </h4>
                      <span className="text-[10px] text-text-muted shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    {/* Context Badge (e.g. "About: CLRS Algorithms") */}
                    <div className="text-[10px] font-semibold text-accent truncate flex items-center gap-1 mb-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span className="truncate">{conv.contextTitle}</span>
                    </div>

                    <p className="text-xs text-text-muted truncate leading-snug">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-accent text-primary text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Thread */}
        <div
          className={`flex-1 flex flex-col min-w-0 bg-surface/50 ${
            !isMobileThreadView ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConv ? (
            <>
              {/* Thread Header */}
              <div className="p-3.5 sm:px-6 border-b border-border bg-surface flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setIsMobileThreadView(false)}
                    className="md:hidden p-1.5 rounded-lg text-text-muted hover:text-primary"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <Avatar
                    src={activeConv.participant.avatar}
                    name={activeConv.participant.name}
                    size="sm"
                    isVerified={true}
                  />

                  <div className="min-w-0">
                    <h3 className="font-heading font-bold text-sm text-primary truncate flex items-center gap-1.5">
                      <span>{activeConv.participant.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    </h3>
                    <p className="text-[11px] text-text-muted truncate">
                      {activeConv.participant.role} •{' '}
                      <span className="text-emerald-700 font-semibold">Active on Campus</span>
                    </p>
                  </div>
                </div>

                {/* Context Label Tag */}
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-text-muted block">
                    Subject Context
                  </span>
                  <span className="text-xs font-heading font-bold text-accent truncate block max-w-xs">
                    {activeConv.contextTitle}
                  </span>
                </div>
              </div>

              {/* Message History Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {activeConv.messages.map((msg) => {
                  const isMe = msg.senderId === currentUser?.id || msg.senderId === 'user-student-1';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-soft-sm ${
                          isMe
                            ? 'bg-primary text-onPrimary rounded-tr-none'
                            : 'bg-surface border border-border text-text rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-text-muted mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Simulated "typing..." indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-text-muted italic pt-1">
                    <div className="flex gap-1 py-2 px-3 rounded-2xl bg-surface border border-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span>{activeConv.participant.name} is typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Bar */}
              <form
                onSubmit={handleSend}
                className="p-3 sm:p-4 bg-surface border-t border-border flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={`Reply to ${activeConv.participant.name}...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 bg-surface-muted text-text placeholder:text-text-muted text-xs sm:text-sm px-4 py-3 rounded-2xl border border-border focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-accent/30 transition-all"
                />

                <Button
                  type="submit"
                  variant="accent"
                  size="md"
                  disabled={!messageText.trim()}
                  rightIcon={<Send className="w-4 h-4" />}
                  className="font-bold shadow-copper shrink-0"
                >
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8 text-text-muted">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

