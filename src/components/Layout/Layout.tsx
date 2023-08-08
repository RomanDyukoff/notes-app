import { Outlet } from "react-router";
import { Header } from "../Template/Header/Header";
import { Footer } from "../Template/Footer/Footer";
import { Container } from "@mantine/core";


export const Layout = () => {
    return (
        <>
            <div className="wrapper">
                <Header />
                <main className="main main-position">
                    <Container fluid>
                        <Outlet />
                    </Container>
                </main>
                <Footer className="footer-position"/>
            </div>
        </>
    )
}
