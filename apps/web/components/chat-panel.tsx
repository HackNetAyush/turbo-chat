'use client';

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { createMessage, isValidMessage, sortMessagesByTime, formatTimestamp, ChatMessage } from '../lib/chat';

const TYPING_TIMEOUT_MS = 2000;

interface ChatPanelProps {
  currentUser: string;
}

export function ChatPanel({ currentUser }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChangeText = (value: string) => {
    setDraft(value);
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, TYPING_TIMEOUT_MS);
  };

  const handleSend = () => {
    if (!isValidMessage(draft)) {
      return;
    }
    const message = createMessage(currentUser, draft);
    setMessages((prev) => sortMessagesByTime([...prev, message]));
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageList}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageRow}>
            <Text style={styles.author}>{message.author}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(message.createdAt)}</Text>
            <Text style={styles.content}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      {isTyping && <Text style={styles.typingIndicator}>{currentUser} is typing…</Text>}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSend}
          placeholder="Type a message"
        />
        <TouchableOpacity
          style={[styles.sendButton, draft.length === 0 && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={draft.length === 0}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 480,
    marginTop: 20,
  },
  messageList: {
    maxHeight: 240,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    paddingVertical: 4,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  timestamp: {
    fontSize: 11,
    color: '#888',
  },
  content: {
    fontSize: 14,
    flexShrink: 1,
  },
  typingIndicator: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: 'purple',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#c9a3d6',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
