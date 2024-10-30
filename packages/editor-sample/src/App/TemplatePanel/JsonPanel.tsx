import React from 'react';

import { useDocument } from '../../documents/editor/EditorContext';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function JsonPanel() {
  const document = useDocument();
  const code = JSON.stringify(document, null, '  ');
  return <HighlightedCodePanel type="json" value={code} />;
}
