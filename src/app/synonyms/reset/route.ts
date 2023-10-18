import SynonymStore from '../../../synonyms/synonym-store';
import singletonStore from '../../../synonyms/singleton-store';

export async function POST() {
  singletonStore.store = new SynonymStore();
  return new Response(null, { status: 204 });
}
