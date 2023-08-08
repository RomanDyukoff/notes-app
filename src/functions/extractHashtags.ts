export const extractHashtags = (text: string, reg: RegExp): string[] => {
    const extractedHashtags: string[] = [];
    const matches: RegExpMatchArray[] = [...text.matchAll(reg)]
    for (const match of matches) {
        extractedHashtags.push(String(match))
    }
    return extractedHashtags;
}