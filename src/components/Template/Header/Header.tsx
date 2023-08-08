import { Link } from "react-router-dom";
import "./style.scss";

export const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">
                <Link to="/">notes</Link>
            </h1>
        </header>
    )
}
