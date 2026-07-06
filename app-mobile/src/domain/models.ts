export type Grad = readonly [string, string];

export type Match = {
  id: string;
  comp: string;
  minute: number;
  home: string;
  homeFull: string;
  homeFlag: string;
  homeScore: number;
  away: string;
  awayFull: string;
  awayFlag: string;
  awayScore: number;
  viewers: string;
  bg: Grad;
};

export type LiveMatch = {
  home: string;
  away: string;
  score: string;
  comp: string;
  viewers: string;
  bg: Grad;
};

export type Game = {
  time: string;
  live: boolean;
  home: string;
  homeFlag: string;
  homeScore: string;
  away: string;
  awayFlag: string;
  awayScore: string;
};

export type Clip = { title: string; views: string; bg: Grad };

export type GroupRow = {
  pos: number;
  name: string;
  flag: string;
  j: number;
  sg: string;
  pts: number;
  classificado: boolean;
};

export type Tie = {
  a: string;
  aFlag: string;
  aScore: string;
  aDim?: boolean;
  b: string;
  bFlag: string;
  bScore: string;
  bDim?: boolean;
};

export type BracketCol = { round: string; ties: Tie[] };

export type Channel = {
  title: string;
  host: string;
  tag: string;
  viewers: string;
  avatar: string;
  avatarBg: string;
  bg: Grad;
};

export type ChatMessage = { name: string; text: string; color: string };

export type Reaction = { id: number; emoji: string; left: string };

export type Stat = {
  label: string;
  home: string;
  away: string;
  homePct: number;
  awayPct: number;
};
