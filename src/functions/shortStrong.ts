export const shortString = (text: string, short?: number): string => {
    const index = short ? short : 3;
    if (text.split(" ").length > index) {
        return text.split(' ').slice(0, short ?? index).join(" ") + " ..."
    }
    return text
}
