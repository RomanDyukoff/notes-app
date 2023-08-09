import { Link } from "react-router-dom";
import "./style.scss";
import { Title } from "@mantine/core";

export const Header = () => {
    return (
        <header className="header">
            <Title size="h4" color="#fff">
                <Link to="/">Notes</Link>
            </Title>
        </header>
    )
}
