import Logo from "../../assets/img/logologin.png";
import "./Login.css";
import Botao from "../../components/botao/Botao";
import api from '../../Services/services';
import { useState } from "react";
import Swal from "sweetalert2";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";

import {useNavigate } from "react-router";
import {useAuth} from "../../contexts/AuthContext";



const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const { setUsuario } = useAuth();

    async function realizarAutenticacao(e) {
        e.preventDefault();

        if (!email.trim() || !senha.trim()) {
            alert("Preencha todos os campos para realizar o login");
            return;
        }

        try {
            const resposta = await api.post("Login", { email, senha });
            const token = resposta.data.token;
            
            if (token) {
                const tokenDecodificado = userDecodeToken(token);
                setUsuario(tokenDecodificado);
                
                // Salva em ambos os storages para garantir compatibilidade
                secureLocalStorage.setItem("token", token);
                secureLocalStorage.setItem("tipoUsuario", tokenDecodificado.tipoUsuario);
                localStorage.setItem("tipoUsuario", tokenDecodificado.tipoUsuario); // Para o Header
                
                const redirectPath = tokenDecodificado.tipoUsuario === "admin" 
                    ? "/CadastrarTipoEvento" 
                    : "/ListarEventos";
                
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Login realizado com sucesso!',
                    icon: 'success',
                    timer: 2000,
                    willClose: () => navigate(redirectPath)
                });
            }
        } catch (error) {
            console.error(error);
            alert("Email ou senha inválidos. Para dúvidas, entre em contato com o suporte");
        }
    }



    return(
        <main className= "main_login">
           <div className="banner"></div>
           <section className="section_login">
            <form action="" className="form_login"  onSubmit={realizarAutenticacao} >
            <img src={Logo} alt="Logo do EventPlus"/>
                <div className="campos_login">
                    <div className="campo_input">
                        {/* <label htmlFor="email">Email:</label> */}
                        <input type="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="campo_input">
                        {/* <label htmlFor="senha">Senha:</label> */}
                        <input type="password" name="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </div>
                </div>
                    <a href="">Esqueceu a senha?</a>
                    <Botao nomeDoBotao="Login"/>
            </form>
           </section>
        </main>
    )
}

export default Login;