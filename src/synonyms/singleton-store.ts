import SynonymStore from './synonym-store'

type SingletonStore = {
  store: SynonymStore;
}

// Keep a synonym-store instance inside the module
// so it can be shared by other modules.
const singletonStore: SingletonStore = {
  store: new SynonymStore()
};

export default singletonStore;
