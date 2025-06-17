import "./Header.css";
import Logo from "../../assets/img/logoevent.png";
import { Link } from "react-router-dom";
import Vector from "../../assets/img/Vector.png";

const Header = (props) => {
    return(
        <header>
            <div className="layout_grid cabecalho">
                {/* Ao clicar no link, redireciona na tela login */}
            <Link to="/">
                <img src= {Logo} alt="Logo do EventPlus"/>
            </Link>

            <nav className="nav_header">
                {/* <a href="" className="link_header">Home</a>
                <a href="" className="link_header">Evento</a>
                <a href="" className="link_header">Usuario</a>
                <a href="" className="link_header">Contatos</a> */}

                <Link className="link_header" to="/Home">Home</Link>
                <Link className="link_header" to="/Evento">Eventos</Link>
                <Link className="link_header" to="/Usuario">Usuarios</Link>
                <Link className="link_header" to="/Contatos">Contatos</Link>
            </nav>

            <nav className="nav_img" style={{ display: props.visibilidade}}>
                <div className="adm">
                {/* <a href="">{props.tituloHeader}<img src= {Vector} alt="portinha"/></a> */}
                <Link to="/Home"><img src= {Vector} alt="portinha"/></Link>
                </div>
            </nav>

            <div className="login" style={{ display: props.botao_logar }}>
<<<<<<< HEAD
                
                <Link href="" to="/" className="logar">Logar</Link>
=======
                {/* <Link href="" to="/">Logar</Link> */}
                <button className="logar">
                    Logar
                </button>
>>>>>>> 3d9cbf82047867dc2e4d52066d5697e752ca2378
            </div>

        </div>
    </header>
   
    )
}


export default Header;