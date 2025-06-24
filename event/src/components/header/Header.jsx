import "./Header.css";
import Logo from "../../assets/img/logoevent.png";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../../assets/img/Vector.png";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Header = (props) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/Home">
                    <img src={Logo} alt="Logo do EventPlus" />
                </Link>

                <button className="menu-toggle" onClick={toggleMenu}>
                    &#9776;
                </button>

                <nav className="nav_header">
                    <Link className="link_header" to="/Home">Home</Link>
                    
                    {/* Mostra "Eventos" apenas para alunos */}
                    {usuario?.tipoUsuario !== "admin" && (
                        <Link className="link_header" to="/ListarEventos">Eventos</Link>
                    )}

                    {/* Links específicos para admin */}
                    {usuario?.tipoUsuario === "admin" && (
                        <>
                            <Link className="link_header" to="/Cadastro">CadastroEventos</Link>
                            <Link className="link_header" to="/CadastrarTipoEvento">TipoEventos</Link>
                            <Link className="link_header" to="/CadastrarTipoUsuario">TipoUsuario</Link>
                        </>
                    )}
                </nav>

                {usuario && (
                    <nav className="nav_img">
                        <div className="adm">
                            <Link to="/Home">
                                {props.tituloHeader || (usuario.tipoUsuario === "admin" ? "Admin" : "Aluno")}
                                <img src={Vector} alt="Ícone do usuário" />
                            </Link>
                        </div>
                    </nav>
                )}

                <div className="login">
                    {usuario ? (
                        <button className="logar" onClick={handleLogout}>Sair</button>
                    ) : (
                        <Link to="/">
                            <button className="logar">Logar</button>
                        </Link>
                    )}
                </div>
            </div>

            {menuAberto && (
                <nav className="nav_mobile">
                    <Link to="/Home" onClick={toggleMenu}>Home</Link>
                    
                    {/* Mostra "Eventos" apenas para alunos no mobile */}
                    {usuario?.tipoUsuario !== "admin" && (
                        <Link to="/ListarEventos" onClick={toggleMenu}>Eventos</Link>
                    )}

                    {usuario?.tipoUsuario === "admin" && (
                        <>
                            <Link to="/Cadastro" onClick={toggleMenu}>CadastroEventos</Link>
                            <Link to="/CadastrarTipoEvento" onClick={toggleMenu}>TipoEventos</Link>
                            <Link to="/CadastrarTipoUsuario" onClick={toggleMenu}>TipoUsuario</Link>
                        </>
                    )}

                    {usuario && (
                        <button className="logar" onClick={handleLogout}>Sair</button>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;