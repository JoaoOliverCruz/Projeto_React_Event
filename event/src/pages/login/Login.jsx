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
    const [email, setEmail]  = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const {setUsuario} = useAuth();
    

    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() != "" || email.trim() != "") {
            try {
                const resposta = await api.post("Login", usuario);

                const token = resposta.data.token
                if(token){
                    //token será decodificado
                    const tokenDecodificado = userDecodeToken(token);
                    // console.log("Token decodificado:");
                    // console.log(tokenDecodificado);
                    // console.log("O tipo de usuario e:");
                    // console.log(tokenDecodificado.tipoUsuario);

                    setUsuario(tokenDecodificado);

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));
                    
                    if(tokenDecodificado.tipoUsuario === "aluno"){
                        navigate("/ListarEventos")
                 } else {
                        navigate("/Cadastro")
                }
              }
             console.log(resposta.data.token);
                
            } catch (error) {
                console.log(error);
               alert("Email ou senha inválidos, para dúvidas, entre em contato com o suporte")
            }
        } else {
            alert("Preencha os campos vazios para realizar o login seu dedin nervoso")
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