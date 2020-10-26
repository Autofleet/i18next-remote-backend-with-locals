# Introduction

An i18next backend plugin to work with both local resources and remote backend. This plugin supports any other [i18next backend](https://www.i18next.com/plugins-and-utils.html#backends).
This backend will first load the local resources, and then will override them with the remote version.

# Getting started

Installation via NPM:

```
$ npm install i18next-remote-backend-with-locals
```

Setup:

```js
import i18next from 'i18next';
import Backend from 'i18next-remote-backend-with-locals';

i18next
  .use(Backend)
  .init(i18nextOptions)
```
As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.

# Backend Options

```js
{
  // An object that contains i18next resources. For example:
  localResources: {
    en: {
      hello: "Hello"
    },
    ja: {
      hello: "こんにちは"
    }
  },

  // Any kind of supported backend. See example with i18next-http-backend:
  remoteBackend: {
    type: i18NextHttpBackend,

    // Any options that the backend type accepts
    options: {
      loadPath: "http://example.com",
      parse: data => data,
      request: (options, url, payload, callback) => {
        axios.get(url)
          .then(res => callback(null, res))
          .catch(err => callback(err, null));
      },
    }
  }
}
```

Options can passed in:

**Preffered** - by setting 'backend' property on i18next.init:

```js
import i18next from 'i18next';
import Backend from 'i18next-remote-backend-with-locals';

i18next
  .use(Backend)
  .init({
    backend: options
  });
```

On construction:

```js
import Backend from 'i18next-remote-backend-with-locals';

const Backend = new Backend(null, options);
const Backend = new Backend();
  Backend.init(null, options);
```

Via calling init:

```js
import Backend from 'i18next-remote-backend-with-locals';

const Backend = new Backend();
Backend.init(null, options);
```

# Complete Sample

```js
import i18next from 'i18next';
import Backend from 'i18next-remote-backend-with-locals';
import i18NextHttpBackend from 'i18next-http-backend';
import en from './en.json';
import ja from './ja.json';
import id from './id.json';
import fr from './fr.json';

i18next
  .use(Backend)
  .init({
    fallbackLng: 'en',
    backend: {
      localResources: {
        en, 
        ja, 
        id, 
        fr,
      },
      remoteBackend: {
        type: i18nHttpLoader,
        options: {
          loadPath: 'http://example.com',
          parse: data => data,
          request: (options, url, payload, callback) => {
            axios.get(url)
              .then(res => callback(null, res))
              .catch(err => callback(err, null));
          },
        },
      },
    },
  });
```