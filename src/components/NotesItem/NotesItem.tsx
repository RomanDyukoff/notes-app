import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text } from "@mantine/core";
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
            <Box sx={(theme) => ({
                width: "100%",
                textAlign: 'center',
                padding: theme.spacing.sm,
                borderRadius: 8,
                cursor: 'pointer',
                border: "0.0625rem solid #ced4da",

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[0],
                },
            })}>
                <Flex align="center" justify="space-between">
                    <Flex align="flex-start" justify="center" direction="column">
                        <Text fw={500}>{shortString(text, 4)}</Text>
                        <Text c="dimmed">{date}</Text>
                    </Flex>
                    <Button color="red" size="xs" onClick={(e) => removeNote(e)}>Delete</Button>
                </Flex>
            </Box>
        </li>
    )
}
