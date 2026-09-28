export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  createdAt: number;
}

const MAX_MESSAGE_LENGTH = 500;

export function isValidMessage(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.length > 0 && content.length <= MAX_MESSAGE_LENGTH;
}

export function createMessage(author: string, content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    author,
    content: content.trim(),
    createdAt: Date.now(),
  };
}

export function sortMessagesByTime(messages: ChatMessage[]): ChatMessage[] {
  return [...messages].sort((a, b) => a.createdAt - b.createdAt);
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
