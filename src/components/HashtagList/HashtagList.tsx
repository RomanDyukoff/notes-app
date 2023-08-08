import { HashtagItem } from "../HashtagItem/HashtagItem";
import "./style.scss";

type HashtagListPropTypes = {
    hashtags: string[]
}

export const HashtagList: React.FC<HashtagListPropTypes> = ({hashtags}) => {
  return (
    <ul className="hashtag-list">
        {
            hashtags.map((hashtag, i) => (
                <HashtagItem key={i} hashtag={hashtag}/>
            ))
        }
    </ul>
  )
}
