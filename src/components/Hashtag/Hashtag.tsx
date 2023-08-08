type HashtagPropType = {
    children: React.ReactNode;
}

export const Hashtag: React.FC<HashtagPropType> = ({ children }) => {
    return <span style={{ color: 'blue', cursor: 'pointer' }}>{children}</span>;
}
