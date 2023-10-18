import singletonStore from '../../../synonyms/singleton-store';

type SynonymRequest = {
  term: string;
  synonym: string;
};

export async function GET(
  request: Request,
  { params }: { params: { word: string } }) {
  const { word } = params || {};
  return Response.json({
    word,
    synonyms: singletonStore.store.get(word)
  });
}
