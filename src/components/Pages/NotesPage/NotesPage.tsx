import { useNavigate } from "react-router"
import { Autocomplete, Button, Skeleton, Title } from "@mantine/core"
import { NotesList } from "../../NotesList/NotesList"
import { Paths } from "../../../constants/path"
import { useRecoilState } from "recoil"
import { hashtagsList, noteListState } from "../../../store/store"
import { useEffect, useState } from "react"
import { getAllNotes } from "../../../db/IndexedDB"
import { createArrayHashtags } from "../../../functions/createArrayHashtags"
import { useDebounce } from "../../../hooks/useDebounce"
import { filterByHashtag } from "../../../functions/filterByHashtag"

import "./style.scss"

export const NotesPage: React.FC = () => {
  const href = useNavigate();
  const [notes, setNotes] = useRecoilState(noteListState);
  const [hashtags, setHashtags] = useRecoilState(hashtagsList);
  const [value, setValue] = useState<string>("");
  const debouncs = useDebounce(value, 800);

  useEffect(() => {
    getAllNotes()
      .then(data => setNotes(data))
      .catch(console.error);
  }, [setNotes])

  useEffect(() => {
    setHashtags(createArrayHashtags(notes));
  }, [notes, setHashtags])

  return (
    <section className="notes-page notes-page__container">
      <div className="notes-page__header">
        <Title align="center">Notes</Title>
        <div className="notes-page__controller">
          <Autocomplete
            placeholder="#hashtags"
            data={hashtags}
            onChange={(e: string) => setValue(e)}
          />
          <Button color="yellow" onClick={() => href(Paths.create)}>Create</Button>
        </div>
      </div>
      <div className="notes-page__main">
        {
          notes.length ?
            <NotesList items={filterByHashtag(debouncs, notes)} className="notes-page__list" />
            :
            <Skeleton className="notes-page__s" width={597} height={73} onClick={() => href(Paths.create)} />
        }
      </div>
    </section>
  )
}
