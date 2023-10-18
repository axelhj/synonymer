import singletonStore from '../../synonyms/singleton-store';

type SynonymRequest = {
  word: string;
  synonym: string;
};

// Save a new synonym. Only new synonyms are accepted.
// The accepted format is json similar to { "word": "",
// "synonym": ""}.
export async function POST(request: Request) {
  const data = await request.json() as SynonymRequest;
  if (
    typeof (data?.word) !== 'string' ||
    typeof (data?.synonym) !== 'string' ||
    singletonStore.store
      .get(data.synonym)
      .includes(data.synonym)
  ) {
    return new Response(null, {status: 400});
  }
  singletonStore.store.add(data.word, data.synonym);
  return new Response(null, { status: 204 });
}
