import {PodcastImage} from '../content/schemas';

export function findClosestHeightImage(images: PodcastImage[], targetHeight: number): PodcastImage | null {
  return images.reduce(
    (closest, image) => {
      const imageHeight = parseInt(image.attributes?.height ?? '0', 10);
      // Skip if current image has no defined height
      if (imageHeight <= 0) return closest;

      // Use current image if there's no closest yet
      if (!closest) return image;

      const closestHeight = parseInt(closest.attributes?.height ?? '0', 10);
      const diffCurrent = Math.abs(targetHeight - imageHeight);
      const diffClosest = Math.abs(targetHeight - closestHeight);

      // If current image is closer to target height, or if the height difference is the same but the current image has higher resolution, choose current image
      if (diffCurrent < diffClosest || (diffCurrent === diffClosest && imageHeight > closestHeight)) {
        return image;
      } else {
        return closest;
      }
    },
    null as PodcastImage | null
  );
}
