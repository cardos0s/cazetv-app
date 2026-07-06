import { api } from './api';
import * as db from './mock/db';
import { Match, Stat } from '../domain/models';

export const catalogRepository = {
  liveMatches: () => api.get(db.liveMatches),
  todayGames: () => api.get(db.todayGames),
  clips: () => api.get(db.clips),
  channels: () => api.get(db.channels),
  groupA: () => api.get(db.groupA),
  bracket: () => api.get(db.bracket),
};

export const matchRepository = {
  featured: (): Promise<Match> => api.get(db.featuredMatch),
  byId: (id: string): Promise<Match> => api.get({ ...db.featuredMatch, id }),
  stats: (_id: string): Promise<Stat[]> => api.get(db.statsBase),
};
