import { INotesItem, NotesItem } from "../NotesItem/NotesItem";

import "./style.scss";

type NotesListPropType = {
    items: INotesItem[],
    className?: string
}

export const NotesList: React.FC<NotesListPropType> = ({ items, className }) => {
    return (
        <ul className={`notes-list ${className}`}>
            {
                items.map(item => (
                    <NotesItem key={item.id} id={item.id} text={item.text} date={item.date} />
                ))
            }
        </ul>
    )
}
