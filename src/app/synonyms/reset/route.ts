import SynonymStore from '../../../synonyms/synonym-store';
import singletonStore from '../../../synonyms/singleton-store';

// Let a user throw away all of those synonyms.
export async function POST() {
  singletonStore.store = new SynonymStore();
  return new Response(null, { status: 204 });
}
