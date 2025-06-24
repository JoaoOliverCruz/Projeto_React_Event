import React, { useEffect, useState } from 'react'
import ImgDeletar from '../../assets/img/Vector (5).png';
import "./Modal.css";
import api from "../../Services/services"
import { useAuth } from '../../contexts/AuthContext';

 const Modal = (props) => {

 const [comentarios, setComentarios] = useState([]);
 const [novoComentario, setNovoComentario] = useState("");
 
 const {usuario} = useAuth();

 async function listarComentario() {
    try {
        const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);
        setComentarios(resposta.data);
        console.log(resposta);
    } catch (error) {
        console.log(error); 
    }
 }

useEffect(() => {
    listarComentario();
}, [])

 async function cadastrarComentario(comentario) {
    try {
        await api.post("ComentariosEventos",{
            idUsuario: usuario.idUsuario,
            idEvento: props.idEvento,
            descricao: comentario
        })
        listarComentario();
    } catch (error) {
        console.log(error);
    }
 }

 async function deletarComentario(idComentario) {
    try {
        await api.delete(`ComentariosEventos/${idComentario}`);
        listarComentario();
    } catch (error) {
        console.log(error);
        
    }
 }


  return (
    <>
    <div className="model-overlay" onClick={props.fecharmodal}></div>
      <div className="model">
        <h1>{props.titulomodal}</h1>
        <div className="model_conteudo">
            {props.tipoModel === "descricaoEvento" ? (
                <p>{props.descricao}</p>
            ) : (
                <>
                    {comentarios.map((item) => (
                        <div key={item.idComentarioEvento}>
                            <strong>{item.usuario.nomeUsuario}
                            </strong>
                            <img src={ImgDeletar} alt="Deletar" onClick={() => deletarComentario(item.idComentarioEvento)}/>
                            <p>{item.descricao}</p>
                            <hr/>
                        </div>
                    ))}
                    <div>
                        <input type="text" placeholder="Escreva seu comentário..." 
                        value={novoComentario}
                        onChange={(e) => setNovoComentario(e.target.value)}
                        />
                        <button
                        className='botao_comentario'
                         onClick={() => cadastrarComentario(novoComentario)}>
                         Cadastrar
                        </button>
                    </div>
                </>
            )}
        </div>
      </div>
    </>

  )
}

export default Modal

