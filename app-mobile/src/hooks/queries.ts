import { useQuery } from '@tanstack/react-query';
import { catalogRepository, matchRepository } from '../data/repositories';

export const queryKeys = {
  liveMatches: ['catalog', 'liveMatches'] as const,
  todayGames: ['catalog', 'todayGames'] as const,
  clips: ['catalog', 'clips'] as const,
  channels: ['catalog', 'channels'] as const,
  groupA: ['copa', 'groupA'] as const,
  bracket: ['copa', 'bracket'] as const,
  match: (id: string) => ['match', id] as const,
  stats: (id: string) => ['match', id, 'stats'] as const,
};

export const useLiveMatches = () =>
  useQuery({ queryKey: queryKeys.liveMatches, queryFn: catalogRepository.liveMatches });

export const useTodayGames = () =>
  useQuery({ queryKey: queryKeys.todayGames, queryFn: catalogRepository.todayGames });

export const useClips = () =>
  useQuery({ queryKey: queryKeys.clips, queryFn: catalogRepository.clips });

export const useChannels = () =>
  useQuery({ queryKey: queryKeys.channels, queryFn: catalogRepository.channels });

export const useGroupA = () =>
  useQuery({ queryKey: queryKeys.groupA, queryFn: catalogRepository.groupA });

export const useBracket = () =>
  useQuery({ queryKey: queryKeys.bracket, queryFn: catalogRepository.bracket });

export const useMatch = (id: string) =>
  useQuery({ queryKey: queryKeys.match(id), queryFn: () => matchRepository.byId(id) });

export const useStats = (id: string) =>
  useQuery({ queryKey: queryKeys.stats(id), queryFn: () => matchRepository.stats(id) });
