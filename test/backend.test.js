import Backend from '../src';
import BackendMock from './BackendMock';
import 'jest';

const localResources = {
  en: {
    word: "english",
  },
  fr: {
    word: "france",
  },
  ja: {
    word: "japanese",
  },
};

describe('remote backend with locals plugin', () => {
  describe('initialization', () => {
    it('initialization on construction', () => {
      const options = {
        localResources: {
          en: localResources.en,
          fr: localResources.fr,
          ja: localResources.ja,
        },
        remoteBackend: {
          type: BackendMock,
          options: {
            name: 'Some remote backend',
            lngs: ['en', 'fr', 'ja'],
          },
        },
      };

      const backend = new Backend(null, options);
      backend.read('en', 'some_namespace', (err, data) => {
        expect(err).toBeNull();
        expect(data).toBeDefined();
        expect(data.word).toEqual('english');
      })
    });

    it('initialization after construction', () => {
      const options = {
        localResources: {
          en: localResources.en,
          fr: localResources.fr,
          ja: localResources.ja,
        },
        remoteBackend: {
          type: BackendMock,
          options: {
            name: 'Some remote backend',
            lngs: ['en', 'fr', 'ja'],
          },
        },
      };
      
      const backend = new Backend();
      backend.init(null, options);
      backend.read('fr', 'some_namespace', (err, data) => {
        expect(err).toBeNull();
        expect(data).toBeDefined();
        expect(data.word).toEqual('france');
      });
    });

    it('initializing without local resources', () => {
      const options = {
        remoteBackend: {
          type: BackendMock,
          options: {
            name: 'Some remote backend',
            lngs: ['en', 'fr', 'ja'],
          },
        },
      };
      
      const backend = new Backend();
      backend.init(null, options);
      backend.read('fr', 'some_namespace', (err, data) => {
        
      });
    });

    it('initializing without remoteBackend', () => {
      const options = {
        localResources: {
          en: localResources.en,
          fr: localResources.fr,
          ja: localResources.ja,
        },
      };
      
      const backend = new Backend();
      backend.init(null, options);
      expect(backend).toBeNull;
    });

    it('initializing without remoteBackend.type', () => {
      const options = {
        localResources: {
          en: localResources.en,
          fr: localResources.fr,
          ja: localResources.ja,
        },
        remoteBackend: {
          options: {
            name: 'Some remote backend',
            lngs: ['en', 'fr', 'ja'],
          },
        },
      };
      
      const backend = new Backend();
      backend.init(null, options);
      expect(backend).toBeNull;
    });

    it('initializing without remoteBackend.options', () => {
      const options = {
        localResources: {
          en: localResources.en,
          fr: localResources.fr,
          ja: localResources.ja,
        },
        remoteBackend: {
          type: BackendMock,
        },
      };
      
      const func = () => {
        const backend = new Backend();
        backend.init(null, options);
        backend.read('en', 'some_namespace', (err, data) => {});
      };

      expect(func).toThrow(TypeError);
    });
  });

  describe('read', () => {
    let backend;
    beforeAll(() => {
      const options = {
        localResources: {
          en: localResources.en,
          fr: localResources.fr,
          ja: localResources.ja,
        },
        remoteBackend: {
          type: BackendMock,
          options: {
            name: 'Some remote backend',
            lngs: ['en', 'fr', 'ja', 'id'],
          },
        },
      };
      
      backend = new Backend();
      backend.init(null, options, { fallbackLng: 'en' });
    });

    it('basic read', () => {
      const callbackMock = jest.fn((err, data) => {
        expect(err).toBeNull();
        expect(data).toBeDefined();
        expect(data.word).toEqual('japanese')
      });

      backend.read('ja', 'some_namespace', callbackMock);
      expect(callbackMock.mock.calls.length).toBe(2);
    });

    it('read language which available only on remote backend (should be fallbacked to english)', () => {
      const callbackMock = jest.fn().mockImplementation((err, data) => {
        expect(err).toBeNull();
        expect(data).toBeDefined();
        expect(['english', 'indonesian']).toContain(data.word);
      });

      backend.read('id', 'some_namespace', callbackMock);
      expect(callbackMock.mock.calls.length).toBe(2);
    })
  });
});
