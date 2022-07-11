import type { NextPage } from "next";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import Image from "next/image";
import { useMemo, useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second]: number[] = ids;

  const firstPokemon = trpc.useQuery([
    "get-pokemon.get-pokemon-by-id",
    { id: first! },
  ]);

  const secondPokemon = trpc.useQuery([
    "get-pokemon.get-pokemon-by-id",
    { id: second! },
  ]);

  const voteForBest = (selected: number) => {
    updateIds(getOptionsForVote());
  };

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return (
      <div className="text-center">
        <h1 className="text-center mt-20 text-2xl">Which Pokemon would win?</h1>
        <div className="grid mx-2  sm:grid-cols-1 md:grid-cols-[1fr,auto,1fr] sm:gap-6 gap-20 place-content-center place-items-center mt-8 md:mx-auto  max-w-3xl h-[450px] ">
          <div className=" bg-gray-300 drop-shadow-md rounded-lg w-[344px]">
            <div className="animate-pulse w-full h-[324px] bg-slate-200"></div>
            <div className="p-3 pb-0 space-y-4 h-[80px] ">
              <div className="animate-pulse w-2/3 h-6 mx-auto bg-slate-200"></div>
              <div className="flex space-x-4 justify-items-center w-full justify-center ">
                <div className="animate-pulse w-1/3 h-3 bg-gray-200 rounded-full px-3 py-1 "></div>
                <div className="animate-pulse w-1/3 h-3 bg-gray-200 rounded-full px-3 pt-1 "></div>
              </div>
            </div>
            <div className="animate-pulse w-2/3 h-6 mx-auto bg-sky-400 mb-6"></div>
          </div>

          <div className="w-8 rounded overflow-hidden shadow-lg ">
            <h3 className="text-blue-300 text-2xl">VS</h3>
          </div>

          <div className=" bg-gray-300 drop-shadow-md rounded-lg w-[344px]">
            <div className="animate-pulse w-full h-[324px] bg-slate-200"></div>
            <div className="p-3 pb-0 space-y-4 h-[80px] ">
              <div className="animate-pulse w-2/3 h-6 mx-auto bg-slate-200"></div>
              <div className="flex space-x-4 justify-items-center w-full justify-center ">
                <div className="animate-pulse w-1/3 h-3 bg-gray-200 rounded-full px-3 py-1 "></div>
                <div className="animate-pulse w-1/3 h-3 bg-gray-200 rounded-full px-3 pt-1 "></div>
              </div>
            </div>
            <div className="animate-pulse w-2/3 h-6 mx-auto bg-sky-400 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (firstPokemon.isError || secondPokemon.isError) {
    return <div className="text-center">Error</div>;
  }

  if (
    firstPokemon.data &&
    firstPokemon.data.sprites.front_default &&
    secondPokemon.data &&
    secondPokemon.data.sprites.front_default
  ) {
    return (
      <>
        <h1 className="text-center mt-20 text-2xl">Which Pokemon would win?</h1>
        <div className="grid mx-2  sm:grid-cols-1 md:grid-cols-[1fr,auto,1fr] sm:gap-6 gap-20 place-content-center place-items-center mt-8 md:mx-auto  max-w-3xl ">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300">
            <Image
              className="w-full"
              src={firstPokemon.data.sprites.front_default}
              alt={firstPokemon.data.name}
              width={400}
              height={400}
            />
            <div className="px-6 pb-4 mt-[-40px]">
              <div className="font-bold text-xl mb-2 text-gray-900 capitalize text-center">
                {firstPokemon.data.name}
              </div>
              <p className="text-gray-700 text-base text-center ">
                {firstPokemon.data.types.map((item) => (
                  <span
                    key={item.type.name}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 mb-2"
                  >
                    {item.type.name}
                  </span>
                ))}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500
              active:bg-blue-500 rounded capitalize mx-auto mt-2 w-full"
                onClick={() => voteForBest(first!)}
              >
                Choose {firstPokemon.data.name}
              </button>
            </div>
          </div>

          <div className="w-8 rounded overflow-hidden shadow-lg ">
            <h3 className="text-blue-300 text-2xl">VS</h3>
          </div>

          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300">
            <Image
              className="w-full"
              src={secondPokemon.data.sprites.front_default}
              alt="Sunset in the mountains"
              width={400}
              height={400}
            />
            <div className="px-6 pb-4 mt-[-40px]">
              <div className="font-bold text-xl mb-2 text-gray-900 capitalize text-center">
                {secondPokemon.data.name}
              </div>
              <p className="text-gray-700 text-base text-center">
                {secondPokemon.data.types.map((item) => (
                  <span
                    key={item.type.name}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 mb-2"
                  >
                    {item.type.name}
                  </span>
                ))}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded
              active:bg-blue-500 capitalize mx-auto mt-2 w-full"
                onClick={() => voteForBest(second!)}
              >
                Choose {secondPokemon.data.name}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Home;
