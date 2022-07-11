import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  return (
    <>
      <h1 className="text-center mt-20 text-2xl">Which Pokemon is the best?</h1>
      <div className="grid mx-2  sm:grid-cols-1 md:grid-cols-[1fr,auto,1fr] sm:gap-6 gap-20 place-content-center place-items-center mt-8 md:mx-auto  max-w-3xl ">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
          <Image
            className="w-full"
            src="https://source.unsplash.com/random/400x400"
            alt="Sunset in the mountains"
            width={400}
            height={400}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-900">
              The Coldest Sunset
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>

        <div className="w-8 rounded overflow-hidden shadow-lg ">
          <h3 className="text-blue-300 text-2xl">VS</h3>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
          <Image
            className="w-full"
            src="https://source.unsplash.com/random/400x400"
            alt="Sunset in the mountains"
            width={400}
            height={400}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-900">
              The Coldest Sunset
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
