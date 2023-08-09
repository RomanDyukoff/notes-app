import { useNavigate } from "react-router"
import { Autocomplete, Breadcrumbs, Button, Title } from "@mantine/core"
import { NotesList } from "../../NotesList/NotesList"
import { Paths } from "../../../constants/path"
import { useRecoilState } from "recoil"
import { hashtagsList, noteListState } from "../../../store/store"
import { useEffect, useState } from "react"
import { getAllNotes } from "../../../db/IndexedDB"
import { createArrayHashtags } from "../../../functions/createArrayHashtags"
import { useDebounce } from "../../../hooks/useDebounce"
import { filterByHashtag } from "../../../functions/filterByHashtag"
import { CustomLink } from "../../CustomLink/CustomLink"

import "./style.scss"

const crumbs = [
  { title: 'notes', href: '/' },
].map((item, index) => (
  <CustomLink to={item.href} key={index} name={item.title} />
));

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

  const create = () => {
    href(Paths.create)
  }

  return (
    <section className="notes-page notes-page__container">
      <Breadcrumbs>{crumbs}</Breadcrumbs>
      <div className="notes-page__header">
        <Title order={2} size="h1" align="center">Notes</Title>
        <div className="notes-page__controller">
          <Autocomplete
            placeholder="#hashtags"
            data={hashtags}
            onChange={(e: string) => setValue(e)}
          />
          <Button color="yellow" onClick={create}>Create</Button>
        </div>
      </div>
      <div className="notes-page__main">
        {
          notes.length ?
            <NotesList items={filterByHashtag(debouncs, notes)} className="notes-page__list" />
            :
            <Button variant="subtle" color="yellow" onClick={create}>
              create note
            </Button>
        }
      </div>
    </section>
  )
}
