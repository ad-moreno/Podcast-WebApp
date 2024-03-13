export const Routes = {
  Home: '/',
  Podcast: '/podcast/:podcastId',
  Episode: '/podcast/:podcastId/episode/:episodeId',
} as const;

// Function overloads to handle different cases
export function buildRoute(route: typeof Routes.Home): string;
export function buildRoute(route: typeof Routes.Podcast, params: {podcastId: string}): string;
export function buildRoute(route: typeof Routes.Episode, params: {podcastId: string; episodeId: string}): string;

// Function implementation
export function buildRoute(route: string, params: Record<string, string> = {}): string {
  return Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), route);
}
