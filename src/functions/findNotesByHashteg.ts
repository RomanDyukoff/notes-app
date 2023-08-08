import { INotesItem } from "../components/NotesItem/NotesItem";

export const findNotesByHashteg = (notes: INotesItem[], hashtag: string) => {
    const hashtagRegex = new RegExp(`#${hashtag}\\b`, 'i');

    const postsWithHashtag = notes.filter(note => hashtagRegex.test(note.text));

    return postsWithHashtag
}