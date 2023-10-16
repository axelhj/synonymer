import assert from 'assert'
import SynonymStore from '../src/synonyms/synonym-store'


describe('SynonymStore', function () {
  describe('The SynonymStore', function () {
    it('should return a string value', function () {
      const store = new SynonymStore();

    "HelloSynonym";
      assert.equal(store.mySynonym(), "HelloSynonym");
    });
  });
})
