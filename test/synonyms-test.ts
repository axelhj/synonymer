import { assert } from 'chai'

import SynonymStore from '../src/synonyms/synonym-store'

describe('SynonymStore', () => {
  describe('can add a pair of synonyms', () => {
    let store: SynonymStore;
  
    beforeEach(() => {
      store = new SynonymStore();
      store.add("ajax", "fotbollsklubb");
    });

    it('returns the added synonym for the term', () => {
      assert.equal(store.getSingle("fotbollsklubb"), "ajax");
    });

    it('returns the added term for the synonym', () => {
      assert.equal(store.getSingle("ajax"), "fotbollsklubb");
    });

    it('returns all added synonyms for the term', () => {
      store.add("ajax", "tvättmedel");
      assert.sameMembers(store.get("ajax"), ["tvättmedel", "fotbollsklubb"]);
      assert.sameMembers(store.get("ajax"), ["fotbollsklubb", "tvättmedel"]);
    });

    it('does not return non-synonyms of the terms', () => {
      store.add("ajax", "tvättmedel");
      store.add("sportbil", "ferrari");
      assert.notIncludeMembers(store.get("sportbil"), ["tvättmedel", "ajax", "fotbollsklubb"]);
      assert.notIncludeMembers(store.get("ferrari"), ["ajax", "fotbollsklubb", "tvättmedel"]);
    });

    it('re-adding term does not include the synonym more times', () => {
      store.add("ajax", "tvättmedel");
      store.add("ajax", "tvättmedel");
      store.add("ajax", "tvättmedel");
      store.add("ferrari", "sportbil");
      store.add("ferrari", "sportbil");
      store.add("ferrari", "sportbil");
      assert.lengthOf(store.get("sportbil"), 1);
      assert.lengthOf(store.get("ajax"), 2);
    });

    it('does include items from the same disjoint set of synonyms', () => {
      store.add("ajax", "tvättmedel");
      store.add("sportbil", "ferrari");
      assert.sameMembers(store.get("sportbil"), ["ferrari"]);
      assert.sameMembers(store.get("ferrari"), ["sportbil"]);
      assert.sameMembers(store.get("fotbollsklubb"), ["ajax", "tvättmedel"]);
      assert.sameMembers(store.get("tvättmedel"), ["fotbollsklubb", "ajax"]);
    });
  });
})
