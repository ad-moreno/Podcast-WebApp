import {z} from 'zod';

const LabelSchema = z.object({
  label: z.string(),
});

const ImageAttributesSchema = z.object({
  height: z.string(),
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

const PodcastImageSchema = z.object({
  label: z.string(),
  attributes: ImageAttributesSchema.optional(),
});

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
  wrapperType: z.string(),
  kind: z.string(),
  artistId: z.number().optional(),
  collectionId: z.number(),
  trackId: z.number(),
  artistName: z.string().optional(),
  collectionName: z.string(),
  trackName: z.string(),
  collectionCensoredName: z.string().optional(),
  trackCensoredName: z.string().optional(),
  artistViewUrl: z.string().url(),
  collectionViewUrl: z.string().url(),
  feedUrl: z.string().url().optional(),
  trackViewUrl: z.string().url(),
  artworkUrl30: z.string().url().optional(),
  artworkUrl60: z.string().url().optional(),
  artworkUrl100: z.string().url().optional(),
  collectionPrice: z.number().optional(),
  trackPrice: z.number().optional(),
  collectionHdPrice: z.number().optional(),
  releaseDate: z.string().optional(),
  collectionExplicitness: z.string().optional(),
  trackExplicitness: z.string().optional(),
  trackCount: z.number().optional(),
  trackTimeMillis: z.number().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
  primaryGenreName: z.string().optional(),
  artworkUrl600: z.string().url().optional(),
  genreIds: z.array(z.string()).optional(),
  genres: z.array(Genre).optional(),
});

export const PodcastEpisodesSchema = z.object({
  resultCount: z.number(),
  results: z.array(PodcastEpisodeSchema),
});
