import type { NextPage } from "next";
import axios from "axios";
import Masonry from "react-masonry-css";
import PreviewCard from "../components/PreviewCard";
import { IAnimeProps } from "../utils/interfaces";

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
  return (
    <div className="px-6 sm:px-10 mb-10">
      <Masonry
        breakpointCols={MASONARY_COL_BREAK_POINTS}
        className="flex w-auto -ml-8"
        columnClassName="masonary_grid_col pl-8 bg-clip-padding"
      >
        {posts.map((d) => (
          <PreviewCard key={d.mal_id} {...d} />
        ))}
      </Masonry>
    </div>
  );
};

export default Home;
