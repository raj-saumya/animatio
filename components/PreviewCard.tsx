import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IAnimeProps, IAnimeGenric } from "../utils/interfaces";

interface IGenres {
  genres: IAnimeGenric[];
}

const Genres: NextPage<IGenres> = ({ genres }) => {
  return (
    <div className="flex flex-row items-center justify-end rounded-tl-md rounded-tr-md bg-gray-100 w-full h-auto py-2 px-2">
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

const PreviewCard: NextPage<IAnimeProps> = ({
  title,
  images,
  synopsis,
  genres,
  mal_id,
}) => {
  return (
    <div className="rounded-lg flex flex-col bg-white min-w-[240px] shadow-md overflow-hidden">
      <div className="rounded-tl-lg rounded-tr-lg h-[140px] overflow-hidden">
        <Image
          src={images.jpg.large_image_url}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
          alt="anime_image"
        ></Image>
      </div>
      <div className="flex flex-col px-4 py-2">
        <Link href={`/anime/${mal_id}`} passHref>
          <a className="underline underline-offset-4 text-lg font-bold font-monospace mb-2">
            {title}
          </a>
        </Link>
        <p className="text-sm font-monospace h-[100px] overflow-hidden text-ellipsis mb-2">
          {synopsis}
        </p>
      </div>
      <Genres genres={genres} />
    </div>
  );
};

export default PreviewCard;
