import singletonStore from '../../synonyms/singleton-store';

type SynonymRequest = {
  term: string;
  synonym: string;
};

export async function POST(request: Request) {
  const data = await request.json() as SynonymRequest;
  if (
    typeof (data?.term) !== 'string' ||
    typeof (data?.synonym) !== 'string' ||
    singletonStore.store
      .get(data.synonym)
      .includes(data.synonym)
  ) {
    return new Response(null, {status: 400});
  }
console.log(`  adding ("${data.term}, ${data.synonym}")`)
  singletonStore.store.add(data.term, data.synonym);
  return new Response(null, { status: 204 });
}
