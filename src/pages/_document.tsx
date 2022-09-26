import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class GadhaDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body className="cursor-crosshair bg-amber-50 text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default GadhaDocument;
