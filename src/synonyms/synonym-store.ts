class SynonymStore {
  store = new Map<string, string[]>();

  add(word: string, synonym: string) {
    let synonyms = this.store.get(word);
    if (synonyms) {
      synonyms.push(synonym);
    } else {
      this.store.set(word, [synonym]);
    }
    synonyms = this.store.get(synonym);
    if (synonyms) {
      synonyms.push(word);
    } else {
      this.store.set(synonym, [word]);
    }
  }

  getSingle(word: string) {
    return this.store.get(word)?.[0];
  }

  get(word: string): string[] {
    const seen = new Set<string>();
    const stack: string[] = [];
    let result = this.store.get(word) || [];
    while (result.length) {
      result?.forEach(item => {
        if (!seen.has(item)) {
          seen.add(item);
          stack.unshift(item);
        }
      });
      const top = stack.shift();
      result = top && this.store.get(top ) || [];
    }
    return Array.from(seen).filter(item => item !== word);
  }

  toString() {
    return JSON.stringify({items: Array.from(this.store.entries())});
  }
};

export default SynonymStore;
