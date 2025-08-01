import "./Lista.css";

//importacao de imagens
import Editar from "../../assets/img/Vector (1).png";
import Excluir from "../../assets/img/Vector (2).png";
import Informacoes from "../../assets/img/informacoes 1.png";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />
            <div className="tabela">
                <table>
                    <thead>
                        <tr className="cabecalho_tabela">
                            <th>{props.titulo}</th>
                            <th style={{ display: props.visibilidade }}>Data do Evento</th>
                            <th style={{ display: props.visibilidade }}>Tipo Evento</th>
                            <th>Editar</th>
                            {/* Coluna de Excluir - Só aparece se mostrarExcluir = true */}
                            <th style={{ display: props.mostrarExcluir ? "table-cell" : "none" }}>Excluir</th>
                            <th style={{ display: props.visibilidade }}>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                                <tr className="item_lista" key={props.tipoLista === "TiposEventos" ? item.idTipoEvento : (props.tipoLista === "TiposUsuarios" ? item.idTipoUsuario : item.idEvento)}>
                                    <td data-cell="Nome">{props.tipoLista === "TiposEventos" ? item.tituloTipoEvento : (props.tipoLista === "TiposUsuarios" ? item.tituloTipoUsuario : item.nomeEvento)}</td>
                                    <td data-cell="Data" style={{ display: props.visibilidade }}>{item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}</td>
                                    <td data-cell="Evento" style={{ display: props.visibilidade }}>{item.tiposEvento?.tituloTipoEvento}</td>
                                    <td data-cell="Editar"><img src={Editar} alt="Caneta" onClick={() => props.funcEditar(item)} /></td>
                                    {/* Botão de Excluir - Só aparece se mostrarExcluir = true */}
                                    <td data-cell="Excluir" style={{ display: props.mostrarExcluir ? "table-cell" : "none" }}>
                                        <img src={Excluir} alt="Lixeira" onClick={() => props.deletar(item)} />
                                    </td>
                                    <td data-cell="Descrição" style={{ display: props.visibilidade }}><img src={Informacoes} alt="I" onClick={() => props.descricao(item)} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="paragrafo">Nenhum item encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Lista;