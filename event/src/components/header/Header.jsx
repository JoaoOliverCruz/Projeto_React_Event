import "./Header.css";
import Logo from "../../assets/img/logoevent.png";
import { Link } from "react-router-dom";
import Vector from "../../assets/img/Vector.png";
import { useEffect, useState } from "react";


const Header = (props) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");

    useEffect(() => {
        const tipo = localStorage.getItem("tipoUsuario");
        setTipoUsuario(tipo);
    }, []);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <header>
            <div className="layout_grid cabecalho">
                {/* Logo */}
                <Link to="/Home">
                    <img src={Logo} alt="Logo do EventPlus" />
                </Link>

                {/* Botão hamburguer visível apenas no mobile */}
                <button className="menu-toggle" onClick={toggleMenu}>
                    &#9776;
                </button>

                {/* Menu padrão (desktop) */}
                <nav className="nav_header">
                    <Link className="link_header" to="/Home">Home</Link>
                    <Link className="link_header" to="/ListarEventos">Eventos</Link>

                    {tipoUsuario !== "aluno" && (
                        <Link className="link_header" to="/Usuario">Usuarios</Link>
                    )}

                    {tipoUsuario === "admin" && (
                        <>
                            <Link className="link_header" to="/TipoEventos">TipoEventos</Link>
                            <Link className="link_header" to="/TipoUsuario">TipoUsuario</Link>
                        </>
                    )}
                </nav>

                {/* Admin link com imagem */}
                <nav className="nav_img" style={{ display: props.visibilidade }}>
                    <div className="adm">
                        <Link to="/Home">
                            {props.tituloHeader}
                            <img src={Vector} alt="portinha" />
                        </Link>
                    </div>
                </nav>

                {/* Botão Logar */}
                <div className="login" style={{ display: props.botao_logar }}>
                    <Link to="/">
                        <button className="logar">Logar</button>
                    </Link>
                </div>
            </div>

            {/* Menu Mobile Responsivo */}
            {menuAberto && (
                <nav className="nav_mobile">
                    <Link to="/Home" onClick={toggleMenu}>Home</Link>
                    <Link to="/ListarEventos" onClick={toggleMenu}>Eventos</Link>

                    {tipoUsuario !== "aluno" && (
                        <Link to="/Usuario" onClick={toggleMenu}>Usuarios</Link>
                    )}

                    {tipoUsuario === "admin" && (
                        <>
                            <Link to="/TipoEventos" onClick={toggleMenu}>TipoEventos</Link>
                            <Link to="/TipoUsuario" onClick={toggleMenu}>TipoUsuario</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;
