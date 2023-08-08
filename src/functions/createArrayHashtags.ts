import { AutocompleteItem } from "@mantine/core";
import { INotesItem } from "../components/NotesItem/NotesItem";

export type Typehashtags = readonly (string | AutocompleteItem)[];

export const createArrayHashtags = (notes: INotesItem[]): Typehashtags => {
    return notes.map(note => note.hashtags?.join(" ") !== undefined ? note.hashtags?.join(" ") : "");
}