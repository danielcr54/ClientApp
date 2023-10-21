# client-apps

Client-side apps and reusable libraries for the IGG Platform.

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). That means that several packages are published from a single repository. Currently, no packages are to be published just yet and are only supposed to be imported by the `client-*` apps to be bundled together. Therefore, `lerna` is currently here for development convenience only.

The monorepo uses **independent versioning** strategy, so each package gets its version incremented independently (once we get to versioning).

There are several packages and several apps that are being maintained in this monorepo:

- `@igg/auth` package is a library with authentication-related components and modules.
- `@igg/common` package is a library with general-purpose reusable components and modules.
- `client-main` is the main client-side app written in React.
- `client-admin` is the complementary client-side app written in React, for application data administration purposes.


## Quick start

The packages in this repo are managed with [lerna](https://github.com/lerna/lerna).

To start developing the packages and actual apps:

0.  Make sure you have [`yarn`](https://yarnpkg.com) installed.

1.  Install the root dependencies:

        $ yarn install

2.  [Bootstrap](https://github.com/lerna/lerna#bootstrap) lerna with:

        $ yarn bootstrap

3.  Build local packages

        $ yarn build-packages

4. Start the development of all apps at once with:

        $ yarn start

    This will start watching for any changes in packages sources and will rebuild packages automatically and will also run both apps in the development mode.

    The `client-main` is served at [`http://localhost:9000/`](http://localhost:9000/) and `client-admin` is at [http://localhost:9001/](http://localhost:9001/) by default (configurable with `PORT` env variable per app). Running `npm start` will automatically open both in a default browser.


Alternatively, its possible to run:

    $ npm run watch-packages
        
from root folder to only watch changes in all packages' source code and then run `npm start` from individual app folder instead. This will also make the individual app's compilation results and errors reflected in the console.
