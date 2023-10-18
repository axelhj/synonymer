// This class stores synonyms. They can be retrieved
// as an unsortered list. Methods should be clear from names.
// getSingle will return at moste one synonym regardless
// of actual number. Similar but less random than  the google
// "I feel lucky" button.
class SynonymStore {
  store = new Map<string, Set<string>>();

  add(word: string, synonym: string) {
    let synonyms = this.store.get(word);
    if (synonyms) {
      synonyms.add(synonym);
    } else {
      this.store.set(word, new Set([synonym]));
    }
    synonyms = this.store.get(synonym);
    if (synonyms) {
      synonyms.add(word);
    } else {
      this.store.set(synonym, new Set([word]));
    }
  }

  getSingle(word: string) {
    return this.store.get(word)?.values().next().value;
  }

  get(word: string): string[] {
    const seen = new Set<string>();
    const stack: string[] = [];
    let result = this.store.get(word) || new Set();
    while (result.size) {
      result?.forEach(item => {
        if (!seen.has(item)) {
          seen.add(item);
          stack.unshift(item);
        }
      });
      const top = stack.shift();
      result = top && this.store.get(top) || new Set();
    }
    return Array.from(seen).filter(item => item !== word);
  }

  toString() {
    return JSON.stringify({
      items: Object.fromEntries(
        Array.from(this.store .entries())
          .map(([key, value]: [string, Set<string>]) =>
            [key, Array.from(value.values())]
          )
      )
    });
  }
};

export default SynonymStore;
