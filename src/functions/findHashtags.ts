import { ContentBlock } from "draft-js";
import { HASHTAG_REGEX } from "../constants/regex";

export const findHashtags = (contentBlock: ContentBlock, callback: (start: number, end: number) => void) => {
    const text = contentBlock.getText();
    let matchArr;
    while ((matchArr = HASHTAG_REGEX.exec(text)) !== null) {
        const start = matchArr.index;
        const end = start + matchArr[0].length;
        callback(start, end);
    }
};
