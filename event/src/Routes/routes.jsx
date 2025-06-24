import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroEvento from "../pages/cadastroEventos/CadastroEvento";
import Home from "../pages/home/Home";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import ListagemDeEvento from "../pages/listagemDeEvento/ListagemDeEvento";
import { useAuth } from "../contexts/AuthContext";

const Privado = ({ children, tipoPermitido }) => {
    const { usuario } = useAuth();
    const location = useLocation();

    if (!usuario) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Admin tem acesso a tudo
    if (usuario.tipoUsuario === "admin") {
        return children;
    }

    // Verifica permissão específica se necessário
    if (tipoPermitido && usuario.tipoUsuario !== tipoPermitido) {
        return <Navigate to="/Home" replace />;
    }

    return children;
};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                
                {/* Rotas públicas */}
                <Route path="/Home" element={<Home />} />
                
                {/* Rotas de admin */}
                <Route path="/CadastrarTipoEvento" element={
                    <Privado>
                        <CadastroTipoEvento />
                    </Privado>
                } />
                
                <Route path="/CadastrarTipoUsuario" element={
                    <Privado>
                        <CadastroTipoUsuario />
                    </Privado>
                } />
                
                <Route path="/Cadastro" element={
                    <Privado>
                        <CadastroEvento />
                    </Privado>
                } />
                
                {/* Rota de aluno */}
                <Route path="/ListarEventos" element={
                    <Privado>
                        <ListagemDeEvento />
                    </Privado>
                } />
                
                {/* Rota de fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;