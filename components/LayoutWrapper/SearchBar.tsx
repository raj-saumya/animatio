import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { IAnimeResponse, IAnimeProps } from "../../utils/interfaces";

const _debounce = (func: any, delay: number = 300) => {
  let token: any;
  return (...args: any[]) => {
    if (token) {
      clearTimeout(token);
    }
    token = setTimeout(() => {
      token = null;
      func.apply(this, args);
    }, delay);
  };
};

const Input = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [animeList, setAnimeList] = useState<IAnimeProps[]>([]);

  useEffect(() => {
    if (value !== "") {
      fetchAnimeSuggestions(value);
    }
  }, [value]);

  const handleInputChange = (query: string) => setValue(query);

  const fetchAnimeSuggestions = useCallback(
    _debounce((query: string) => {
      axios
        .get(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`)
        .then((resp: AxiosResponse<IAnimeResponse>) => {
          setAnimeList(resp.data.data);
        })
        .catch(() => setAnimeList([]));
    }),
    []
  );

  const navigateToAnime = (id: string): void => {
    setValue("");
    setAnimeList([]);
    router.push(`/anime/${id}`);
  };

  return (
    <React.Fragment>
      {value && animeList.length && (
        <div className="fixed bottom-24 right-10 w-[260px] rounded-md shadow-md bg-white px-4 py-2 z-10">
          {animeList.map((d: IAnimeProps, index: number) => (
            <div key={d.mal_id} className="flex flex-col divide-slate-400">
              <label
                className="text-sm font-monospace text-gray-600 cursor-pointer hover:text-sky-900"
                onClick={() => navigateToAnime(d.mal_id)}
              >
                {d.title}
              </label>
              {index !== animeList.length - 1 && (
                <div className="my-2 border-t-[1px] border-slate-100"></div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="fixed bottom-10 right-10 flex flex-row items-center rounded-md shadow-lg bg-white px-4 py-2 z-10">
        <Image
          src="/icons/icon-search.svg"
          height={18}
          width={18}
          layout="fixed"
          alt="search"
        />
        <div className="w-[200px] ml-2">
          <input
            width="100%"
            height="100%"
            value={value}
            placeholder="Search anime..."
            className="flex text-sm font-monospace bg-white outline-none text-gray-600"
            onChange={(e) => handleInputChange(e.target.value)}
          ></input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Input;
