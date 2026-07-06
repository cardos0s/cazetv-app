import { campo } from '../../theme';
import {
  Match,
  LiveMatch,
  Game,
  Clip,
  GroupRow,
  BracketCol,
  Channel,
  ChatMessage,
  Stat,
} from '../../domain/models';

export const featuredMatch: Match = {
  id: 'semi',
  comp: 'COPA 2026 · SEMIFINAL',
  minute: 67,
  home: 'BRA',
  homeFull: 'BRASIL',
  homeFlag: '🇧🇷',
  homeScore: 2,
  away: 'ARG',
  awayFull: 'ARGENTINA',
  awayFlag: '🇦🇷',
  awayScore: 1,
  viewers: '1,4M',
  bg: [campo.a, campo.b],
};

export const liveMatches: LiveMatch[] = [
  { home: 'FRA', away: 'ESP', score: '1·1', comp: 'Copa 2026 · Quartas', viewers: '890K', bg: ['#1a5fb4', '#164f96'] },
  { home: 'POR', away: 'NED', score: '0·2', comp: 'Copa 2026 · Quartas', viewers: '540K', bg: ['#8a1f2b', '#761821'] },
  { home: 'ENG', away: 'GER', score: '2·2', comp: 'Copa 2026 · Quartas', viewers: '720K', bg: ['#3a3f4a', '#2e323b'] },
];

export const todayGames: Game[] = [
  { time: "67'", live: true, home: 'Brasil', homeFlag: '🇧🇷', homeScore: '2', away: 'Argentina', awayFlag: '🇦🇷', awayScore: '1' },
  { time: '16:00', live: false, home: 'França', homeFlag: '🇫🇷', homeScore: '-', away: 'Espanha', awayFlag: '🇪🇸', awayScore: '-' },
  { time: '18:30', live: false, home: 'Portugal', homeFlag: '🇵🇹', homeScore: '-', away: 'Holanda', awayFlag: '🇳🇱', awayScore: '-' },
  { time: '21:00', live: false, home: 'Inglaterra', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeScore: '-', away: 'Alemanha', awayFlag: '🇩🇪', awayScore: '-' },
];

export const clips: Clip[] = [
  { title: 'Golaço de Vini Jr de fora da área', views: '3,2M views', bg: [campo.a, campo.b] },
  { title: 'Casimiro surta com o gol 😂', views: '5,8M views', bg: ['#1de782', '#0a5c33'] },
  { title: 'Defensaça do goleiro no fim', views: '1,9M views', bg: ['#1a5fb4', '#164f96'] },
  { title: 'Melhores momentos 1º tempo', views: '2,4M views', bg: ['#8a1f2b', '#761821'] },
];

export const groupA: GroupRow[] = [
  { pos: 1, name: 'Brasil', flag: '🇧🇷', j: 3, sg: '+6', pts: 9, classificado: true },
  { pos: 2, name: 'Croácia', flag: '🇭🇷', j: 3, sg: '+2', pts: 6, classificado: true },
  { pos: 3, name: 'Camarões', flag: '🇨🇲', j: 3, sg: '-1', pts: 3, classificado: false },
  { pos: 4, name: 'Canadá', flag: '🇨🇦', j: 3, sg: '-7', pts: 0, classificado: false },
];

export const bracket: BracketCol[] = [
  {
    round: 'QUARTAS',
    ties: [
      { a: 'BRA', aFlag: '🇧🇷', aScore: '2', b: 'ARG', bFlag: '🇦🇷', bScore: '1' },
      { a: 'FRA', aFlag: '🇫🇷', aScore: '1', b: 'ESP', bFlag: '🇪🇸', bScore: '1' },
    ],
  },
  {
    round: 'SEMIFINAL',
    ties: [{ a: 'BRA', aFlag: '🇧🇷', aScore: '-', b: '?', bFlag: '⚽', bScore: '-', bDim: true }],
  },
  {
    round: 'FINAL',
    ties: [{ a: '?', aFlag: '🏆', aScore: '-', aDim: true, b: '?', bFlag: '🏆', bScore: '-', bDim: true }],
  },
];

export const channels: Channel[] = [
  { title: 'BRASIL x ARGENTINA — Semifinal', host: 'CazéTV Principal', tag: 'Transmissão oficial · Narração', viewers: '1,4M', avatar: 'C', avatarBg: '#1de782', bg: [campo.a, campo.b] },
  { title: 'RESENHA com o Casimiro', host: 'Cazé & Convidados', tag: 'Watch-along · Reação ao vivo', viewers: '820K', avatar: 'CA', avatarBg: '#ffc531', bg: ['#2a1f3a', '#161022'] },
  { title: 'Câmera Tática — Visão do campo', host: 'CazéTV Extra', tag: 'Câmera alternativa', viewers: '210K', avatar: 'EX', avatarBg: '#5bd0ff', bg: ['#0e7a43', '#0a5c33'] },
  { title: 'FRANÇA x ESPANHA — Quartas', host: 'CazéTV 2', tag: 'Jogo simultâneo', viewers: '540K', avatar: 'C2', avatarBg: '#1a5fb4', bg: ['#1a5fb4', '#164f96'] },
];

export const statsBase: Stat[] = [
  { label: 'Posse de bola', home: '58%', away: '42%', homePct: 58, awayPct: 42 },
  { label: 'Finalizações', home: '12', away: '7', homePct: 63, awayPct: 37 },
  { label: 'No alvo', home: '5', away: '3', homePct: 62, awayPct: 38 },
  { label: 'Escanteios', home: '6', away: '4', homePct: 60, awayPct: 40 },
  { label: 'Faltas', home: '9', away: '13', homePct: 41, awayPct: 59 },
];

export const chatSeed: ChatMessage[] = [
  { name: 'ZéDaResenha', text: 'QUE JOGO É ESSE MANO 🔥', color: '#1de782' },
  { name: 'MariGol', text: 'Vini tá voando na esquerda!', color: '#ffc531' },
  { name: 'Torcedor_23', text: 'referee ladrão 😡', color: '#ff8a5b' },
  { name: 'CazéFan', text: 'melhor transmissão do brasil disparado', color: '#5bd0ff' },
  { name: 'Junin', text: 'BORA BRASIL CARALHÔ 🇧🇷🇧🇷', color: '#1de782' },
];

export const chatPool: ChatMessage[] = [
  { name: 'Fernanda', text: 'GOLAÇO seria esse agora hein', color: '#ff6bd0' },
  { name: 'PedroH', text: 'defesa argentina tá sofrendo', color: '#5bd0ff' },
  { name: 'ResenhaFC', text: 'coloca o replay Casimiro 😂', color: '#ffc531' },
  { name: 'Bruna_SP', text: 'que ansiedade meu deus 😱', color: '#ff8a5b' },
  { name: 'TioDaSeleção', text: 'esse árbitro tá comprado kkkk', color: '#c8a0ff' },
  { name: 'Léo10', text: 'CINCO estrelas na transmissão ⭐', color: '#1de782' },
  { name: 'Marquinhos', text: 'pressiona BRASIL!!!', color: '#ff6b6b' },
  { name: 'AnaClara', text: 'chat tá voando kkk', color: '#5bd0ff' },
];

