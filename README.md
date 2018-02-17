# raplajs

> A Web Interface for the Rapla Event Manager

__Work in progress__

## Build Setup

Download and install NodeJS from <a href="https://nodejs.org/en/">https://nodejs.org/en/</a>

then run:

``` bash
# installs the yarn dependency management
npm install -g yarn

# navigate to your cloned repository
cd .../raplajsclient

# install dependencies
yarn install

# run the dev server
yarn run dev

# build the site for production usage
yarn  build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests (not included yet)
yarn run unit

# run e2e tests (not included yet)
yarn run e2e

# run all tests (not included yet)
yarn test
```

### Standalone Mode

to run the Application in a standalone mode, comment out the GWT-Reference in index.html and pass `standaloneMode: true` to the `RaplaGwtPlugin` in main.js. You may want to use `mode: 'hash'` in routes.js

### GWT Mode

to run the Application in GWT Mode, make sure the GWT-Reference is not commented out in index.html. Also set `standaloneMode` to `false` in the `RaplaGwtPlugin`-Configuration in main.js. Since the Rapla GWT Implementation seems to produce unexpected results by passing parameters in the URL-Fragment, always use `mode: 'history`. Because the App has to run behind a Proxy Server, also make sure to pass `base: /proxy` in the routes.js.