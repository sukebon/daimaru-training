import { Box } from '@mui/system';
import {
  ContentState,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useState } from 'react';

const DraftJSEditor = () => {
  const [editorEnable, setEditorEnable] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setEditorEnable(true);
  }, []);

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  console.log(editorState.getCurrentContent().getPlainText());

  return (
    <>
      {editorEnable && (
        <div>
          <h1>editor</h1>
          <div>
            <button onMouseDown={(e) => handleBlockClick(e, 'header-one')}>
              H1
            </button>
            <button onMouseDown={(e) => handleBlockClick(e, 'header-two')}>
              H2
            </button>
            <button onMouseDown={(e) => handleBlockClick(e, 'header-three')}>
              H3
            </button>
            <button onMouseDown={(e) => handleBlockClick(e, 'unstyled')}>
              Normal
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, 'BOLD')}>
              bold
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, 'ITALIC')}>
              italic
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, 'STRIKETHROUGH')}>
              strikthrough
            </button>
            <button
              onMouseDown={(e) => handleBlockClick(e, 'ordered-list-item')}
            >
              Ordered List
            </button>
            <button
              onMouseDown={(e) => handleBlockClick(e, 'unordered-list-item')}
            >
              Unordered List
            </button>
            <Box sx={{ p: 1, border: '1px solid #e1e1e1' }} minHeight='200px'>
              <Editor
                placeholder='入力してください'
                editorState={editorState}
                onChange={setEditorState}
              />
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default DraftJSEditor;
