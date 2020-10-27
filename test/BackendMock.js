let arr = [];
let each = arr.forEach;
let slice = arr.slice;

function defaults(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

export const languages = {
  en: {
    word: "english",
  },
  fr: {
    word: "france",
  },
  ja: {
    word: "japanese",
  },
  id: {
    word: "indonesian",
  }
}

class BackendMock {
  constructor(services, options = {}) { /* irrelevant */ }

  init(services, options = {}, i18nextOptions) {
    this.services = services;
    this.options = defaults(options, this.options || {});
    this.cache = {};
    this.added = {};

    if (this.options.isCache) {
      this.save = (language, namespace, data) => {
        this.cache[`${language}.${namespace}`] = data;
      }
    }
  }

  read(language, namespace, callback) {
    if (this.options.lngs.indexOf(language) > -1 || this.cache[`${language}.${namespace}`]) {
      callback(null, this.options.isCache ? this.cache[`${language}.${namespace}`] : {
        name: this.options.name,
        lng: language,
        ns: namespace,
        ...languages[language]
      })
    } else {
      callback(new Error('not available'), null)
    }
  }

  create(languages, namespace, key, fallbackValue) {
    this.added[`${languages}.${namespace}.${key}`] = fallbackValue;
  }
}

BackendMock.type = 'backend';

export default BackendMock;