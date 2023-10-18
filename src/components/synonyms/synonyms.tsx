import { useState, MouseEvent, FormEvent } from 'react';
import { revalidatePath } from 'next/cache';

import routes from '@/api/api-routes';
import getJson from '@/api/get-json';
import postJson from '@/api/post-json';
import Synonym from '@/types/synonym';

const FindSynonym = () => {
  const [error, setError] = useState("");

  const [word, setWord] = useState("");

  const [synonym, setSynonym] = useState("");

  const [synonyms, setSynonyms] = useState<string[]>([]);

  const [initialState, setInitialState] = useState(true);

  const findSynonyms = async () => {
    if (!word) {
      setSynonyms([]);
      setError("Please enter a word before searching.");
      return;
    }
    const reponse = await getJson<Synonym>(routes.getSynonym(word));
    setInitialState(false);
    setError("");
    setSynonyms((reponse?.synonyms || []).sort());
  };

  const addSynonym = async () => {
    if (!word || !synonym) {
      setSynonyms([]);
      setError("Please enter a synonym before saving.");
      return;
    }
    const postedWord = word;
    await postJson(routes.addSynonym, {
        word, synonym
    });
    setInitialState(false);
    setWord(postedWord);
    setError("");
    findSynonyms();
  };

  const onClickAdd = (e: MouseEvent) => {
    e.preventDefault();
    addSynonym();
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    findSynonyms();
    e.preventDefault();
  };

  return (
    <section>
      <h1 className="h1 font-semibold text-xl pb-6">Welcome to the synonyms-checker</h1>
      <h2 className="h2 font-semibold text-lg pb-6">Save and check your synonyms</h2>
      <form onSubmit={onSubmit}>
        <div className="w-80 mb-5 text-base">
          <label htmlFor="word" className="block mb-2">Enter a word to begin</label>
          <input
            type="text"
            id="word"
            value={word}
            className="mb-6"
            onChange={e => setWord(e.target.value)}
          />
          <button
            type="submit"
            className="block p-2 border-solid rounded-lg border-2
            bg-gray-300 font-semibold"
          >Search</button>
        </div>
        <div className="w-80 mb-5 text-base">
          <label htmlFor="synonym" className="block mb-2">Add more synonyms</label>
          <input
            type="text"
            id="synonym"
            value={synonym}
            className="mb-6"
            onChange={e => setSynonym(e.target.value)}
          />
          <button
            type="button"
            className="block p-2 border-solid rounded-lg border-2
            bg-gray-700 text-indigo-50"
            onClick={onClickAdd}
          >Add</button>
        </div>
      </form>
      <div className="text-base flex flex-col">
        {synonyms.map(foundSynonym =>
          <p key={foundSynonym} className="mb-2 p-4 last:mb-0
            bg-gray-200 border-solid rounded-lg w-fit"
          >{foundSynonym}</p>
        )}
        {(initialState || error || (word && synonyms.length)) ? null : <div className="mb-2 p-4 last:mb-0
          bg-gray-200 border-solid rounded-lg w-fit">
          <p>Could not find synonyms{ word ? ` for ${word}` : ""}. Try saving some new!</p>
        </div>}
        {error ? <p className="p-7 text-red-950 bg-red-100 border-red-400 border-2
          border-solid rounded-lg w-fit"
        >{error}</p> :
        null}
      </div>
    </section>
  );
}

export default FindSynonym;
