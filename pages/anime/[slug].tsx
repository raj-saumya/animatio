import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { IAnimeProps, IAnimeGenric } from "../../utils/interfaces";
import { NextPage } from "next/types";

interface IAnimeDetailResponse {
  data: IAnimeProps;
}

interface IGenres {
  genres: IAnimeGenric[];
}

const Genres: NextPage<IGenres> = ({ genres }) => {
  return (
    <div className="flex flex-row items-center rounded-tl-md rounded-tr-md bg-gray-100 w-full h-auto mb-3">
      {genres.map((d) => (
        <label
          key={d.mal_id}
          className="text-xs font-monospace font-bold px-2 py-1 bg-yellow-400 text-yellow-900 mr-2 rounded-md"
        >
          {d.name}
        </label>
      ))}
    </div>
  );
};

const AnimeDetailPage = () => {
  const { query } = useRouter();
  const [isLoading, setLoadingStatus] = useState<boolean>(true);
  const [animeDescp, setAnimeDescp] = useState<IAnimeProps>({} as any);

  useEffect(() => {
    if (query && query.slug) {
      setLoadingStatus(true);
      axios
        .get(`https://api.jikan.moe/v4/anime/${query.slug}`)
        .then((resp: AxiosResponse<IAnimeDetailResponse>) => {
          setAnimeDescp(resp.data.data);
        })
        .finally(() => setLoadingStatus(false));
    }
  }, [query]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start">
      <div className="flex flex-col items-center mb-10">
        <div className="w-fit h-[350px] rounded-md overflow-hidden shadow-lg mb-8">
          <Image
            src={animeDescp.images.jpg.large_image_url}
            height="360px"
            width="240px"
            alt="anime_image"
          ></Image>
        </div>
        <label className="font-monospace font-bold text-4xl max-w-xs">
          {animeDescp.title}
        </label>
      </div>
      <div className="flex-1 flex flex-col px-10">
        <div className="flex flex-col">
          <label className="font-monospace text-gray-500 text-sm mb-2">
            {animeDescp.title_japanese}
          </label>
          {animeDescp.title_synonyms.map((d) => (
            <label
              key={d}
              className="font-monospace text-gray-500 text-sm mb-2"
            >
              {d}
            </label>
          ))}
        </div>
        <Genres genres={animeDescp.genres} />
        <label className="text-sm w-fit font-monospace font-bold px-2 py-1 bg-gray-200 text-gray-900 mr-2 rounded-md mb-2">
          {animeDescp.aired.string}
        </label>
        <label className="font-monospace font-bold text-sm mb-2">
          Synopsis ( {animeDescp.status} )
        </label>
        <p className="font-monospace text-base mb-2">{animeDescp.synopsis}</p>
      </div>
    </div>
  );
};

export default AnimeDetailPage;
