import { createRouter } from "./context";
import { z } from "zod";

import { PokemonClient } from "pokenode-ts";

export const getPokemonRouter = createRouter()
  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number().positive(),
    }),
    async resolve({ input }) {
      const api = new PokemonClient();

      const pokemon = await api.getPokemonById(input.id);

      return {
        name: pokemon.name,
        sprites: pokemon.sprites,
        types: pokemon.types,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
