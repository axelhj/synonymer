type Routes = {
  synonymsPath: string;
  addSynonym: string;
  getSynonym: (word: string) => string;
  resetSynonyms: string;
};

export default {
  synonymsPath: "synonyms",
  addSynonym: "synonyms",
  getSynonym: word => `synonyms/${word}`,
  resetSynonyms: "synonyms/reset",
} as Routes;
