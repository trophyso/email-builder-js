import React from 'react';

import renderToStaticMarkup from '../../../../email-builder/src/renderers/renderToStaticMarkup';
import { useDocument } from '../../documents/editor/EditorContext';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function HtmlPanel() {
  const document = useDocument();
  const code = renderToStaticMarkup(document, { rootBlockId: 'root' });
  return <HighlightedCodePanel type="html" value={code} />;
}
