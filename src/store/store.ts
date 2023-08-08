import { atom, selector, selectorFamily } from "recoil";
import { INotesItem } from "../components/NotesItem/NotesItem";
import { Typehashtags } from "../functions/createArrayHashtags";
import { getAllNotes, getNoteById } from "../db/IndexedDB";

const items: INotesItem[] = [];

export const noteListState = atom({
    key: "noteListState",
    default: items,
})

export const noteItemState = atom<INotesItem | null>({
    key: "noteItemState",
    default: null,
})

const hashtagsDefaut: Typehashtags = []

export const hashtagsList = atom({
    key: "hashtagsList",
    default: hashtagsDefaut,
})


export const allNotesSelector = selector<INotesItem[]>({
    key: 'allNotesSelector',
    get: async () => {
        try {
            const notes = await getAllNotes();
            return notes;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
});

export const noteByIdSelector = selectorFamily<INotesItem | undefined, string>({
    key: 'noteByIdSelector',
    get: (id: string) => async () => {
      try {
        const note = await getNoteById(id);
        return note || undefined;
      } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
      }
    },
  });
