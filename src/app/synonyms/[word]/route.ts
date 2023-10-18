import singletonStore from '../../../synonyms/singleton-store';

// Fetch the synoonyms of a single word.
export async function GET(
  request: Request,
  { params }: { params: { word: string } }) {
  const { word } = params || {};
  return Response.json({
    word,
    synonyms: singletonStore.store.get(word)
  });
}
