import {z} from 'zod';

const LabelSchema = z.object({
  label: z.string(),
});

const PriceAttributesSchema = z.object({
  amount: z.string(),
  currency: z.string(),
});

const ContentTypeAttributesSchema = z.object({
  term: z.string(),
  label: z.string(),
});

const LinkAttributesSchema = z.object({
  rel: z.string(),
  type: z.string(),
  href: z.string(),
});

const IdAttributesSchema = z.object({
  'im:id': z.string(),
});

const ArtistAttributesSchema = z.object({
  href: z.string(),
});

const CategoryAttributesSchema = z.object({
  'im:id': z.string(),
  term: z.string(),
  scheme: z.string(),
  label: z.string(),
});

const ReleaseDateAttributesSchema = z.object({
  label: z.string(),
});

const ImageAttributesSchema = z.object({
  height: z.string(),
});

const PodcastImageSchema = z.object({
  label: z.string(),
  attributes: ImageAttributesSchema.optional(),
});

export type PodcastImage = z.infer<typeof PodcastImageSchema>;

const PodcastEntrySchema = z.object({
  'im:name': LabelSchema,
  'im:image': z.array(PodcastImageSchema),
  summary: LabelSchema,
  'im:price': z.object({
    label: z.string(),
    attributes: PriceAttributesSchema.optional(),
  }),
  'im:contentType': z.object({
    attributes: ContentTypeAttributesSchema.optional(),
  }),
  rights: LabelSchema.optional(),
  title: LabelSchema,
  link: z.object({
    attributes: LinkAttributesSchema.optional(),
  }),
  id: z.object({
    label: z.string(),
    attributes: IdAttributesSchema,
  }),
  'im:artist': z.object({
    label: z.string(),
    attributes: ArtistAttributesSchema.optional(),
  }),
  category: z.object({
    attributes: CategoryAttributesSchema.optional(),
  }),
  'im:releaseDate': z.object({
    label: z.string(),
    attributes: ReleaseDateAttributesSchema.optional(),
  }),
});

export type PodcastEntry = z.infer<typeof PodcastEntrySchema>;

const PodcastFeedSchema = z.object({
  author: z.object({
    name: LabelSchema,
    uri: LabelSchema,
  }),
  entry: z.array(PodcastEntrySchema),
});

export const PodcastsSchema = z.object({
  feed: PodcastFeedSchema,
});

const Genre = z
  .object({
    name: z.string(),
    id: z.string(),
  })
  .or(z.string());

const PodcastEpisodeSchema = z.object({
  artistId: z.number().optional(),
  artistName: z.string().optional(),
  artistViewUrl: z.string().url().optional(),
  artworkUrl100: z.string().url().optional(),
  artworkUrl160: z.string().url().optional(),
  artworkUrl30: z.string().url().optional(),
  artworkUrl60: z.string().url().optional(),
  artworkUrl600: z.string().url().optional(),
  collectionCensoredName: z.string().optional(),
  collectionExplicitness: z.string().optional(),
  collectionHdPrice: z.number().optional(),
  collectionId: z.number().optional(),
  collectionName: z.string().optional(),
  collectionPrice: z.number().optional(),
  collectionViewUrl: z.string().url().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
  description: z.string().optional(),
  episodeUrl: z.string().optional(),
  feedUrl: z.string().url().optional(),
  genreIds: z.array(z.string()).optional(),
  genres: z.array(Genre).optional(),
  kind: z.literal('podcast').or(z.literal('podcast-episode')),
  previewUrl: z.string().optional(),
  primaryGenreName: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  shortDescription: z.string().optional(),
  trackCensoredName: z.string().optional(),
  trackCount: z.number().optional(),
  trackExplicitness: z.string().optional(),
  trackId: z.number(),
  trackName: z.string(),
  trackPrice: z.number().optional(),
  trackTimeMillis: z.number().optional(),
  trackViewUrl: z.string().url().optional(),
  wrapperType: z.literal('track').or(z.literal('podcastEpisode')),
});

export const PodcastEpisodesSchema = z.object({
  resultCount: z.number(),
  results: z.array(PodcastEpisodeSchema),
});
