import { Link } from 'react-router-dom';
import { CustomLinkPropType } from './customLink.type';

import "./style.scss";

export const CustomLink = ({ to, name, className }: CustomLinkPropType) => {
    return (
        <Link
            className={`custom-link ${className || ""}`}
            to={to}
        >
            {name}
        </Link>
    )
}
