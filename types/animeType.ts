export interface ICoverAnimeType {
  mal_id: string;
  images: {
    jpg: ImageURLs;
  };
  title: string;
  year: number;
}

interface ImageURLs {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}
