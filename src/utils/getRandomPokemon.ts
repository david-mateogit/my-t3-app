const MAX_DEX_ID = 898;

export const getRandomPokemon: (notTheSame?: number) => number = (
  notTheSame?: number
) => {
  const randomDexId = Math.floor(Math.random() * MAX_DEX_ID + 1);

  if (randomDexId !== notTheSame) {
    return randomDexId;
  }

  return getRandomPokemon(notTheSame);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);
  return [firstId, secondId];
};
