import { Textarea } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { Button } from '@mantine/core';
import { useNavigate } from "react-router";
import { Paths } from "../../../constants/path";
import { actionNotes } from "../../../db/IndexedDB";
import { formatDate } from "../../../functions/formatDate";
import { HASHTAG_REGEX } from "../../../constants/regex";
import { extractHashtags } from "../../../functions/extractHashtags";
import { HashtagList } from "../../HashtagList/HashtagList";

import "./style.scss";


export const CreateNote: React.FC = () => {
  const [text, setText] = useState<string>("");
  const href = useNavigate()

  const saveNote = () => {
    if (text) {
      try {
        actionNotes({
          text,
          id: `${Math.random()}`,
          date: formatDate(new Date),
          hashtags: extractHashtags(text, HASHTAG_REGEX),
        })

      } catch (error) {
        console.error(error);
      }
      setText('')
      href(Paths.notes)
    }

    href(Paths.notes)
  }

  return (
    <section className="create-note">
      <Button color="yellow" onClick={saveNote} className="create-note__button">Add</Button>
      <Textarea
        autoFocus
        label="New Note"
        placeholder="Your note..."
        value={text}
        radius={10}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.currentTarget.value)}
      />
      <HashtagList hashtags={extractHashtags(text, HASHTAG_REGEX)} />
    </section>
  )
}
