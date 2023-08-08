import "../init";
import { useEffect, useState } from 'react';
import { CompositeDecorator, ContentState, Editor, EditorState } from 'draft-js';
import { findHashtags } from "../../functions/findHashtags";
import { Hashtag } from "../Hashtag/Hashtag";
import 'draft-js/dist/Draft.css';

import "./style.scss"
import { Text } from "@mantine/core";

type MyEditorPropType = {
  text: string
  setText: (text: string) => void;
}

export const MyEditor: React.FC<MyEditorPropType> = ({ text, setText }) => {

  const hashtagDecorator: CompositeDecorator = new CompositeDecorator([
    {
      strategy: findHashtags,
      component: Hashtag,
    },
  ]);

  const initState = ContentState.createFromText(text);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(initState, hashtagDecorator)
  )

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    setText(currentContent.getPlainText())
  }, [editorState, setText])


  return (
    <div className="my-editor">
      <Text fw={500} fz="sm">Edit Note</Text>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Your note..."
      />
    </div>
  )
};



