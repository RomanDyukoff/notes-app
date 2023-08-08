import { INotesItem } from "../components/NotesItem/NotesItem"

export const filterByHashtag = (hash: string, notes: INotesItem[]) => {
    return hash ? notes.filter(note => hash.split(" ").some(tag => note.hashtags?.includes(tag))) : notes
}