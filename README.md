## Trophy Email Builder

This is a fork of [usewaypoint/email-builder-js](https://github.com/usewaypoint/email-builder-js)
with some modifications to allow for the types of emails we need to send at Trophy.

### Installation

```console
npm install @trophy/email-builder-js
```

### Usage

```typescript
import { EmailBuilder } from '@trophy/email-builder-js';
import { renderToStaticMarkup, TReaderDocument } from "@trophyso/email-builder-js";

const document: TReaderDocument = {
  // Document content here
};

const html = renderToStaticMarkup(document, { rootBlockId: 'root' })
```

### Development

This package is written in TypeScript. `npm install` will install all packages, including in nested
folders (each block is its own package, with its own `package.json`).

All code is tested using jest. To run the tests, run:

```console
npm test
```

To build the package, tick the version number and run:

```console
npm run build && npm publish
```

For local development with the Trophy app, you can link the package to the Trophy app by setting the
dependency to the local repo from the Trophy app:

```json
{
  "dependencies": {
    "@trophy/email-builder": "file:../email-builder-js"
  }
}
```

Then run:

```console
npm install
```

This will symlink this email-builder-js `dist` folder to the `node_modules` folder of the Trophy
app, so you only need to `npm run build` to see the changes immediately reflected in the Trophy app.
