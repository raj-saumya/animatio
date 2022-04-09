export interface IAnimeResponse {
  pagination: any;
  meta: any;
  links: any;
  data: IAnimeProps[];
}

export interface IAnimeProps {
  mal_id: string;
  airing: boolean;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  status: string;
  aired: {
    from: string;
    to: string;
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: IAnimeGenric[];
  studios: IAnimeGenric[];
  genres: IAnimeGenric[];
}

export interface IAnimeGenric {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
