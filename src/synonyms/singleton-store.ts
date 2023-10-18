import SynonymStore from './synonym-store'

type SingletonStore = {
  store: SynonymStore;
}

const singletonStore: SingletonStore = {
  store: new SynonymStore()
};

export default singletonStore;
