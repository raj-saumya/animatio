import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import Masonry from "react-masonry-css";
import PreviewCard from "../components/PreviewCard";
import { IAnimeProps, IAnimeResponse } from "../utils/interfaces";

interface IHome {
  posts: IAnimeProps[];
}

const MASONARY_COL_BREAK_POINTS = {
  default: 5,
  1560: 4,
  1280: 3,
  972: 2,
  656: 1,
};

export const getStaticProps = async () => {
  const res = await axios.get(
    "https://api.jikan.moe/v4/anime?page=1&limit=10&status=airing"
  );
  const posts = res.data.data;
  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<IHome> = ({ posts }) => {
  const [animeList, setAnimeList] = useState<IAnimeProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);

  useEffect(() => {
    setAnimeList(posts);
  }, []);

  useEffect(() => {
    if (page > 1) {
      setLoadingStatus(true);
      axios
        .get(
          `https://api.jikan.moe/v4/anime?page=${page}&limit=10&status=airing`
        )
        .then((resp: AxiosResponse<IAnimeResponse>) => {
          setAnimeList([...animeList, ...resp.data.data]);
          setLoadingStatus(false) ;
        });
    }
  }, [page]);

  return (
    <div className="px-6 sm:px-10 mb-10">
      <Masonry
        breakpointCols={MASONARY_COL_BREAK_POINTS}
        className="flex w-auto -ml-8"
        columnClassName="masonary_grid_col pl-8 bg-clip-padding"
      >
        {animeList.map((d) => (
          <PreviewCard key={d.mal_id} {...d} />
        ))}
      </Masonry>
      <div className="flex justify-center mt-6">
        <label
          className="font-monospace text-m px-5 py-1 rounded bg-sky-500 text-white cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          Load More
        </label>
      </div>
      {isLoading && (
        <div className="fixed h-screen w-screen flex items-center justify-center top-0 left-0 bg-slate-200/50 z-40">
          <Image
            src="/icons/icon-pulse.svg"
            width={64}
            height={64}
            alt="icon-home"
          ></Image>
        </div>
      )}
    </div>
  );
};

export default Home;
