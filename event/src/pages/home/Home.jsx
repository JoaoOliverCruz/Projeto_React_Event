import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './Home.css';

import Banner from "../../assets/img/homeazul.png";
import Mapa from "../../assets/img/mapaazul.png";
import Visao from "../../assets/img/Group 3.png";

const Home = () => {
    return (
        <>
            <Header
                visibilidade="none" />
            <main>
                <section className="home_section">
                    <div className="pagina_home">
                        <img src={Banner} alt="" />
                    </div>

                    <div className="proximos_eventos">
                        <div className="titulo">
                            <h1>Próximos Eventos</h1>
                            <hr />
                        </div>

                        <div className="eventos layout_grid">
                            <article className="item">
                                <h1>Titulo do Evento</h1>

                                <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                                <button>Conectar</button>
                            </article>

                            <article className="item">
                                <h1>Titulo do Evento</h1>

                                <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                                <button>Conectar</button>
                            </article>

                            <article className="item">
                                <h1>Titulo do Evento</h1>

                                <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                                <button>Conectar</button>
                            </article>

                            <article className="item">
                                <h1>Titulo do Evento</h1>

                                <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                                <button>Conectar</button>
                            </article>
                        </div>
                    </div>

                    <div className="visao">
                        <img src={Visao} alt="" />
                    </div>

                    <div className="contato">
                        <div className="titulo_2">
                            <h1>Contato</h1>
                            <hr />
                        </div>

                        <div className="mapa_informacoes layout_grid">
                            <div className="mapa">
                                <img src={Mapa} alt="" />
                            </div>

                            <div className="informacoes_contato">
                                <p>Rua Niterói, 180 - Centro</p>
                                <p>São Caetano  do  Sul - SP</p>
                                <p>(11) 4225-2000</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home;