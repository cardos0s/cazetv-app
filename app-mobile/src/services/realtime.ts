import { chatPool } from '../data/mock/db';
import { ChatMessage } from '../domain/models';

type Handlers = {
  onMinute: () => void;
  onMessage: (msg: ChatMessage) => void;
};

export function connectMatchSocket({ onMinute, onMessage }: Handlers): () => void {
  const clock = setInterval(onMinute, 5000);
  const chat = setInterval(() => {
    const msg = chatPool[Math.floor(Math.random() * chatPool.length)];
    onMessage(msg);
  }, 2800);

  return () => {
    clearInterval(clock);
    clearInterval(chat);
  };
}
