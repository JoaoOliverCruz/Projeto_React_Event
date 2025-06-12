import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroEvento from "../pages/cadastroEventos/CadastroEvento";
import Home from "../pages/home/Home";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import ListagemDeEvento from "../pages/listagemDeEvento/ListagemDeEvento";

import {Navigate} from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Privado = (props) => {
    // const {usuario} = useAuth();
    // //token, idUsuario, tipoUsuario

    // //se nao estiver autenticado, manda para login
    // if (!usuario) {
    //     return <Navigate to="/" />;
    // }
    // //Se o tipo do usuario nao for o permitido, bloqueia
    // if (usuario.tipoUsuario !== props.tipoPermitido) {
    //     //ir para a tela de nao encontrado!
    //     return <Navigate to="/" />; 
    // }
        
    // //senao, renderiza o componente passado
    // return<props.Item />;
};

const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>

            <Route element = {<Login/>} path="/" exact />;
            <Route path="/Cadastro" element={<CadastroEvento/>} exact/>;
            <Route path="/CadastrarTipoEvento" element={<CadastroTipoEvento/>} exact/>;
            <Route path="/CadastrarTipoUsuario" element={<CadastroTipoUsuario/>} exact/>;
            <Route path="/Home" element={<Home/>} exact/>;
            <Route path="/ListarEventos" element={<ListagemDeEvento/>} exact/>;
            {/* <Route element = {<Privado tipoPermitido="admin" Item={CadastroEvento} />} path="/Cadastro" />;
            <Route element = {<Privado tipoPermitido="admin" Item={CadastroTipoEvento} />} path="/CadastrarTipoEvento" />;
            <Route element = {<Privado tipoPermitido="admin" Item={CadastroTipoUsuario} />} path="/CadastrarTipoUsuario" />;
            <Route element = {<Privado tipoPermitido="aluno" Item={ListagemDeEvento} />} path="/ListarEventos" />; */}

        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;