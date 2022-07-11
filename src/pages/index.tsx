import type { NextPage } from "next";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import Image from "next/image";
import { useMemo, useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [ids, _] = useState(() => getOptionsForVote());

  const [first, second]: number[] = ids;

  const firstPokemon = trpc.useQuery([
    "get-pokemon.get-pokemon-by-id",
    { id: first! },
  ]);

  const secondPokemon = trpc.useQuery([
    "get-pokemon.get-pokemon-by-id",
    { id: second! },
  ]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div className="text-center">Loading...</div>;
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
        <h1 className="text-center mt-20 text-2xl">
          Which Pokemon is the best?
        </h1>
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
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Home;
