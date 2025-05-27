import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/undraw_add_user_re_5oib 1.png";
import Lista from "../../components/lista/Lista";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import api from "../../Services/services";

const CadastroTipoUsuario = () => {

    const[tipousuario, setTipoUsuario] = useState("");
    const[listaTipoUsaurio, setListaTipoUsuario] = useState([]);

    function alerta(icone, mensagem){
           
                const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                didOpen: (toast) => {
                     toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                        icon: icone,
                        title: mensagem
                });
        
        }

    async function cadastrarTipoUsuario(e){
        e.preventDefault();

    if (tipousuario.trim() !== "") {
        try {
            await api.post("TiposUsuarios", {tituloTipoUsuario: tipousuario});
            alerta( "Cadastro realizado com sucesso!!");
            setTipoUsuario();
        } catch (error) {
            alerta( "Error! entre em contato com o suporte");
            console.log(error);
            
        }
    }

    }

    async function listarTipoUsuario(){
        try {
            const resposta = await api.get("TiposUsuarios");
            console.log(resposta.data);
            setListaTipoUsuario(resposta.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        listarTipoUsuario();
    },[listaTipoUsaurio]);
   


    return(
        <>
        <Header
            tituloHeader = "Administrador"
        />
        <main>
        <Cadastro 
            tituloCadastro = "Cadastro Tipo De Usuario"
            banner_img = {Banner}
            campoPlaceholder = "Titulo"
            visibilidade = "none"
            NomeDoBotao = "Cadastrar"

            valorInput = {tipousuario}
            setValorInput = {setTipoUsuario}
            funcCadastro = {cadastrarTipoUsuario}

        />
        <Lista
            tituloLista = "Lista Tipo De Usuario"
            visibilidade= "none"
            titulo = "Titulo"
            
            lista = {listaTipoUsaurio}

            


        />
        </main>
        <Footer/> 

        </>


    )

}
export default CadastroTipoUsuario;