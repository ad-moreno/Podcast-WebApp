import {PodcastEntry, PodcastEpisode} from '#/features/content/schemas';

export const fakePodcast: PodcastEntry = {
  'im:name': {label: 'Fictional Podcast Name'},
  'im:image': [
    {
      label: 'https://example.com/podcast-image.jpg',
      attributes: {height: '600'}, // Assuming height is a required field
    },
  ],
  summary: {label: 'Brief description of the fictional podcast.'},
  'im:price': {
    label: 'Free',
    attributes: {
      amount: '0.00',
      currency: 'USD',
    },
  },
  'im:contentType': {
    attributes: {
      term: 'Podcast',
      label: 'Podcast',
    },
  },
  title: {label: 'Fictional Episode Title'},
  link: {
    attributes: {
      rel: 'alternate',
      type: 'text/html',
      href: 'https://example.com/podcast-episode',
    },
  },
  id: {
    label: 'Fictional Episode URL',
    attributes: {
      'im:id': '123', // Ensuring this field is "123"
    },
  },
  'im:artist': {
    label: 'Artist or Creator Name',
    attributes: {
      href: 'https://example.com/artist',
    },
  },
  category: {
    attributes: {
      'im:id': '10',
      term: 'Technology',
      scheme: 'https://example.com/category/technology',
      label: 'Technology',
    },
  },
  'im:releaseDate': {
    label: 'January 1, 2023',
    attributes: {
      label: 'January 1, 2023',
    },
  },
};

export const fakeEpisodes: PodcastEpisode[] = [
  {
    kind: 'podcast-episode',
    wrapperType: 'podcastEpisode',
    trackId: 1,
    trackName: 'Episodio 1',
    description: 'Descripción del episodio 1',
    releaseDate: new Date('2023-01-01'),
    trackTimeMillis: 1800000, // 30 minutos en milisegundos
  },
  {
    kind: 'podcast-episode',
    wrapperType: 'podcastEpisode',
    trackId: 2,
    trackName: 'Episodio 2',
    description: 'Descripción del episodio 2',
    releaseDate: new Date('2023-01-08'),
    trackTimeMillis: 2400000, // 40 minutos en milisegundos
  },
];
