import { create } from 'zustand';
import { ChatMessage, Reaction } from '../domain/models';
import { chatSeed, featuredMatch } from '../data/mock/db';
import { connectMatchSocket } from '../services/realtime';

export const reactionEmojis = ['🔥', '⚽', '🇧🇷', '😱', '👏', '😂', '❤️'];

let disposer: (() => void) | null = null;
let reactionSeq = 0;

type LiveState = {
  minute: number;
  chat: ChatMessage[];
  reactions: Reaction[];
  connect: () => void;
  disconnect: () => void;
  addReaction: (emoji: string) => void;
  removeReaction: (id: number) => void;
};

export const useLiveStore = create<LiveState>((set, get) => ({
  minute: featuredMatch.minute,
  chat: chatSeed,
  reactions: [],

  connect: () => {
    if (disposer) return;
    disposer = connectMatchSocket({
      onMinute: () => set((s) => ({ minute: Math.min(90, s.minute + 1) })),
      onMessage: (msg) => set((s) => ({ chat: [...s.chat.slice(-40), msg] })),
    });
  },

  disconnect: () => {
    disposer?.();
    disposer = null;
  },

  addReaction: (emoji) => {
    const id = reactionSeq++;
    const left = `${(15 + Math.random() * 60).toFixed(0)}%`;
    set((s) => ({ reactions: [...s.reactions, { id, emoji, left }] }));
    setTimeout(() => get().removeReaction(id), 1600);
  },

  removeReaction: (id) => set((s) => ({ reactions: s.reactions.filter((r) => r.id !== id) })),
}));
