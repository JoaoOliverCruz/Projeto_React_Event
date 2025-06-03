import React from 'react'
import ImgDeletar from '../../assets/img/Vector (5).png';
import "./Modal.css";

 const Modal = (props) => {
  return (
    <>
    <div className="model_overlay" onClick={props.fecharmodal}></div>
      <div className="model">
        <h1>{props.titulo}</h1>
        <div className="model_conteudo">
            {props.tipoModel === "descricaoEvento" ? (
                <p>{props.descricao}</p>
            ) : (
                <>
                    {comentarios.map((item) => (
                        <div key={item.idComentarioEvento}>
                            <strong>{item.usuario.nomeUsuario}
                            </strong>
                            <img src={ImgDeletar} alt="Deletar"/>
                            <p>{item.descricao}</p>
                            <hr/>
                        </div>
                    ))}
                    <div>
                        <input type="text" placeholder="Escreva seu comentário..."/>
                        <button >
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

