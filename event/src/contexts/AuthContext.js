//importa funções do react necessarias para criar e usar contexto
import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";

//Cria o contexto de autenticacao, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

//Esse compenente vai evnolveer a aplicacao (ou parte dela) e fornecer os dados de autentocacap para os filhos
//Provider = prover/dar
export const AuthProvider = ({ children }) => {
    //Cria um estado que guarda os dados di usuario logado.
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;

    });

    return(
        //AuthContext.Provider permite que qualquer componente dentro dele acesse o `usuario` e `setUsuario`
        //Faz com que qualquer compenente que esteja dentro de <AuthProvider> consiga acessar o valor { usuario, setUsuario } usando o hook useAuth().
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

    //Esse hook personalizado facilita o acesso ao contexto dentro de qualque componente
    //USAR!!!
    export const useAuth = () => useContext(AuthContext);