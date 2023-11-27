import React, { useState, useEffect } from "react";
import "./home.css";
import firebase from '../../config/firebase';
import {Link} from 'react-router-dom';
import 'firebase/compat/firestore';
import Navbar from '../../components/navbar/';
import Card from "../../components/card";
import { useSelector } from "react-redux";

const db = firebase.firestore();

function Home(){
    
    const [cards, setCards] = useState([]);
    const [modalBody, setModalBody] = useState([]);
    const [modalTitle, setModalTitle] = useState([]);
    const [currentModalId, setCurrentModalId] = useState([]);
    const updateModal = (title, description, imgsrc, id)=>{
        setModalTitle(title);
        setCurrentModalId(id);
        setModalBody(<>
        {description?<>
            <div className="card-body w-100 border-bottom">
                <p className="card-text">{description}</p>
            </div>
        </>
        :null
        }
        <img src={imgsrc} className="img-fluid img-Modal" alt={title}/>
        </>
        );
    }
    let listaCards = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    

    const deleteCard = async(id)=>{
        if (window.confirm("Você tem certeza que quer apagar esse card?\nEssa ação é irreversível.")){
            await db.collection('cards').doc(id).delete().then(()=>{window.location.reload(false)}).catch((error) => {console.log(error)});
        }
    }

    useEffect(() => {
        db.collection('cards').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaCards.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setCards(listaCards);
        });// eslint-disable-next-line
    }, []);

    return(
        <>
        <Navbar/>
        <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title lead fs-5" id="cardModalLabel">
                        {
                        modalTitle.length !== 0 ? modalTitle
                        : <>Carregando...</>
                        }
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body p-0 d-flex justify-content-center flex-wrap">
                        {
                        modalBody.length !== 0 ? <div className="card w-100 border-white">{modalBody}</div>
                        : <>...</>
                        }
                    </div>
                    <div className="modal-footer justify-content-between">
                        <button type="submit" className="btn btn-danger" onClick={()=>{deleteCard(currentModalId)}}>Apagar card</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center pb-3">
            {
            useSelector(state => state.usuarioLogado) > 0 ?
            <>
            <div className="userContent col-12">
                <h2 className="p-3 position-relative">Aqui estão seus cards! <span className="fw-normal fs-6">*separados por tipos</span></h2>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false">
                                Comida <span className="ms-1 badge">{cards.filter((a) => a.tipo === 'Comida').length}</span>
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body text-center">
                                    {
                                    cards.filter((a) => a.tipo === 'Comida').length >= 1 ?
                                    cards.filter((a) => a.tipo === 'Comida').map(item => <Card key={item.id} id={item.id} img={item.foto} titulo={item.titulo} descricao={item.descricao} props={updateModal} typeButton="vercard"/>)
                                    :
                                    <>
                                        <h3>Você não possui ainda nenhum card nessa categoria! &#128546;</h3>
                                        <h4><Link to='/criarcard'>Cadastre um card!</Link></h4>
                                    </>
                                    }
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Emergências <span className="ms-1 badge">{cards.filter((a) => a.tipo === 'Emergências').length}</span>
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body text-center">
                                    {
                                    cards.filter((a) => a.tipo === 'Emergências').length >= 1 ?
                                    cards.filter((a) => a.tipo === 'Emergências').map(item => <Card key={item.id} id={item.id} img={item.foto} titulo={item.titulo} descricao={item.descricao} props={updateModal} typeButton="vercard"/>)
                                    :
                                    <>
                                        <h3>Você não possui ainda nenhum card nessa categoria! &#128546;</h3>
                                        <h4><Link to='/criarcard'>Cadastre um card!</Link></h4>
                                    </>
                                    }
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                Outros <span className="ms-1 badge">{cards.filter((a) => a.tipo === 'Outros').length}</span>
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                            <div className="accordion-body text-center">
                                    {
                                    cards.filter((a) => a.tipo === 'Outros').length >= 1 ?
                                    cards.filter((a) => a.tipo === 'Outros').map(item => <Card key={item.id} id={item.id} img={item.foto} titulo={item.titulo} descricao={item.descricao} props={updateModal} typeButton="vercard"/>)
                                    :
                                    <>
                                        <h3>Você não possui ainda nenhum card nessa categoria! &#128546;</h3>
                                        <h4><Link to='/criarcard'>Cadastre um card!</Link></h4>
                                    </>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            :
            <div className="p-3 userNotContent">
                <h1>Você não está logado! &#128546;</h1>
                <h4><Link to='/login'>Logue-se</Link> para ver seus cards!</h4>
            </div>
            }
        </div>
        </>
    );
};

export default Home;
