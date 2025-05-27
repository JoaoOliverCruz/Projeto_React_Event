import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/undraw_add_information_j2wg 1.png";
import Lista from "../../components/lista/Lista";
import Footer from "../../components/footer/Footer";

import api from "../../Services/services";

const CadastroEvento = () => {
    return(
        <>
        <Header
            tituloHeader = "Administrador"
        />
        <main>
        <Cadastro 
            tituloCadastro = "Cadastro De Eventos"
            banner_img = {Banner}
            campoPlaceholder = "Titulo"
            NomeDoBotao = "Cadastrar"
        />
        <Lista
            tituloLista = "Lista De Eventos"
            titulo = "Nome"
            ttl = "Nome Do Evento"

        />
        </main>
        <Footer/> 

        </>


    )
}
export default CadastroEvento;