import "./style.scss"

export type HashtagItemPropType = {
    hashtag: string
}

export const HashtagItem: React.FC<HashtagItemPropType> = ({ hashtag }) => {
    return (
        <li className="hashtag-item">{hashtag}</li>
    )
}
