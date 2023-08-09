import { useRecoilValue } from "recoil"
import { noteListState } from "../../../store/store"

import "./style.scss"
import { Text } from "@mantine/core"

type FooterPropType = {
    className?: string
}

export const Footer: React.FC<FooterPropType> = ({ className }) => {
    const notes = useRecoilValue(noteListState);

    return (
        <footer className={`footer ${className}`}>
            <Text color="#fff">
                {
                    notes.length ? `you have ${notes.length} notes` : "there are no notes here"
                }
            </Text>
        </footer>
    )
}
