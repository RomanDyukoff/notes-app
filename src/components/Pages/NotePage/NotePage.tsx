import { Button, Skeleton } from '@mantine/core';
import { useRecoilState } from "recoil";
import { noteListState } from "../../../store/store";
import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MyEditor } from '../../MyEditor/MyEditor';
import { actionNotes, getAllNotes } from '../../../db/IndexedDB';
import { extractHashtags } from '../../../functions/extractHashtags';
import { HASHTAG_REGEX } from '../../../constants/regex';
import { Paths } from '../../../constants/path';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

import "./style.scss";

export const NotePage = () => {
  const { id } = useParams();
  const href = useNavigate();
  const [targetID, getTargetID, updateTargetID] = useLocalStorageState<string>("");
  const [notes, setNotes] = useRecoilState(noteListState);
  const note = useMemo(() => notes.filter(el => el.id === targetID)[0], [notes, targetID])
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getAllNotes()
      .then(data => setNotes(data))
      .catch(console.error);
  }, [])

  useEffect(() => {
    if (id) {
      updateTargetID("id", id);
      getTargetID("id")
    }

  }, [getTargetID, id, targetID, updateTargetID])

  const handleNotes = useCallback(() => {
    if (!targetID) return
    if (text) {
      actionNotes({
        ...note,
        text: text,
        hashtags: extractHashtags(text, HASHTAG_REGEX)
      })
        .catch(error => new Error(error))
      setNotes(notes.map((el) => el.id === note.id ? note : el))
    } else {
      actionNotes(targetID)
        .catch((error) => new Error(error));
    }
    href(Paths.notes)
  }
    , [href, note, notes, setNotes, targetID, text])

  return (
    <section className="note-page">
      <Button color="yellow" onClick={handleNotes} className='note-page__button'>Save</Button>
      {note ? <MyEditor text={note.text} setText={setText} /> : <Skeleton radius={10} height={300} />}
    </section>
  )
}

