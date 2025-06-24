import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Toggle from "../../components/toggle/Toggle";
import { useEffect, useState } from "react";
import "./ListagemDeEvento.css";
import Comentario from "../../assets/img/Vector (3).png";
import Informacoes from "../../assets/img/informacoes (1) 1.png";
import api from '../../Services/services';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Modal from "../../components/modal/Modal";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const ListagemDeEvento = () => {
    const [listaEvento, setListaEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [filtroData, setFiltroData] = useState("todos"); // Alterado para string

    const { usuario } = useAuth();

    async function listarEvento() {
        try {
            if (!usuario?.idUsuario) return;

            const eventoBuscado = await api.get("Eventos");
            const todosOsEventos = eventoBuscado.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuario.idUsuario);
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null  
                };
            });
            
            setListaEvento(eventosComPresencas);
        } catch (error) {
            console.log(error);
            Swal.fire('Erro!', 'Não foi possível carregar os eventos.', 'error');
        }
    }

    useEffect(() => {
        listarEvento();
    }, [usuario]);

    function abrirModal(tipo, dados) {
        setModalAberto(true);
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca) {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presença foi removida.', 'error');  
            } else if (idPresenca) {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmada!', 'Sua presença foi confirmada.', 'success');
            } else {
                await api.post("PresencasEventos", { 
                    situacao: true, 
                    idUsuario: usuario.idUsuario, 
                    idEvento: idEvento 
                });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            }
            listarEvento();
        } catch (error) {
            console.log(error);
            Swal.fire('Erro!', 'Ocorreu um erro ao processar sua solicitação.', 'error');
        }
    }

    function filtrarEventos() {
        const hoje = new Date();
        return listaEvento.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);
            
            if (filtroData === "todos") return true;
            if (filtroData === "futuros" && dataEvento > hoje) return true;
            if (filtroData === "passados" && dataEvento < hoje) return true;
            
            return false;
        });
    }

    return (
        <>
            <Header
                tituloHeader="Aluno"
                botao_logar="none"
            />
            <main>  
                <section className="layout_grid lista_eventos">
                    <h1>Eventos</h1>
                    <hr />

                    <div className="tabelas">
                        <select 
                            name="Tipo De Evento" 
                            className="select" 
                            value={filtroData}
                            onChange={(e) => setFiltroData(e.target.value)}
                        >
                            <option value="todos">Todos os Eventos</option>
                            <option value="futuros">Somente futuros</option>
                            <option value="passados">Somente passados</option>
                        </select>
                      
                        <table>
                            <thead>
                                <tr className="cabecalhos">
                                    <th>Titulo</th>
                                    <th>Data do evento</th>
                                    <th>Tipo Evento</th>
                                    <th>Descrição</th>
                                    <th>Comentarios</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrarEventos().map((item, index) => (
                                    <tr key={index} className="itens">
                                        <td data-cell="Titulo">{item.nomeEvento}</td>
                                        <td data-cell="Data">
                                            {item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}
                                        </td>
                                        <td data-cell="Nome">{item.tiposEvento?.tituloTipoEvento}</td>
                                        <td data-cell="Descrição">
                                            <button className="icon" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                                <img src={Informacoes} alt="Informações" />
                                            </button>
                                        </td>
                                        <td data-cell="Comentario">
                                            <button className="icon" onClick={() => abrirModal("Comentarios", { idEvento: item.idEvento })}>
                                                <img src={Comentario} alt="Comentários" />
                                            </button>
                                        </td>
                                        <td data-cell="Participar">
                                            <Toggle 
                                                presenca={item.possuiPresenca} 
                                                metodo={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <Footer />

            {modalAberto && (
                <Modal
                    titulomodal={tipoModal === "descricaoEvento" ? "Descrição do Evento" : "Comentário"}
                    tipoModel={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharmodal={fecharModal}
                />
            )}
        </>
    );
};

export default ListagemDeEvento;