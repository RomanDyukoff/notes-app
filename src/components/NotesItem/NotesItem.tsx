import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { Paths } from "../../constants/path";
import { useRecoilState } from "recoil";
import { noteListState } from "../../store/store";
import { actionNotes } from "../../db/IndexedDB";
import { shortString } from "../../functions/shortStrong";

import "./style.scss";

export interface INotesItem {
    id: string;
    text: string;
    className?: string;
    date?: string
    hashtags?: string[];
}

export const NotesItem: React.FC<INotesItem> = ({ id, text, date, className }) => {
    const href = useNavigate()
    const [notes, setNotes] = useRecoilState(noteListState);

    const handleTransition = () => {
        href(Paths.note + `/${id}`)
    }

    const removeNote = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setNotes(notes.filter(note => note.id !== id))
        actionNotes(id)
            .catch((error) => new Error(error));
    }

    return (
        <li className={`notes-item ${className}`} id={id} onClick={handleTransition}>
            <div className="notes-item__content">
                <span>{shortString(text, 4)}</span>
                <span>{date}</span>
            </div>
            <Button color="red" size="xs" onClick={(e) => removeNote(e)}>Delete</Button>
        </li>
    )
}
