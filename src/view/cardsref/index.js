import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import firebase from '../../config/firebase';
import "./cardsref.css";
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


function CardsRef(){

    const db = firebase.firestore();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [titulo, setTitulo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [botao, setBotao] = useState();
    const [tipo, setTipo] = useState([]);
    const [foto, setFoto] = useState([]);

    function success(){
        setMsgTipo('sucesso');
        setCarregando(0);
        setBotao('disabled');
        setTimeout(()=>{window.location.href='/tesete/'}, 2000);
    }

    const updateModal = (tipo, id)=>{
        setTipo(tipo);
        setFoto(id);
    }

    function cadastrar(){
        if(!titulo || !tipo || !detalhes){
            setMsgTipo('erro');
            setCarregando(0);
            return;
        }
        setMsgTipo(null);
        setCarregando(1);
        const body = {
            titulo: titulo,
            tipo: tipo,
            usuario: usuarioEmail,
            descricao: detalhes,
            criacao: new Date()
        };
        Object.assign(body, {foto: foto})
            db.collection('cards').add(body).then((resultado)=>{success()}).catch(erro => {
                console.log(erro)
                setMsgTipo('erro');
                setCarregando(0);
            });

    };
    

    return(
        <>
        <Navbar/>
        {useSelector(state => state.usuarioLogado) > 0 ? null : <Navigate to="/"/> }
        <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="cardModalLabel">Novo card</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="título" className="col-form-label">Título:</label>
                                <input type="text" className="form-control" id="título" onChange={(e) => setTitulo(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tipoSelect" className="col-form-label">Tipo do card: </label>
                                <select id="tipoSelect" defaultValue={'-- Selecione um tipo --'} className="form-control" onChange={(e) => setTipo(e.target.value)} disabled>
                                    <option defaultValue>{tipo}</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descrição" className="col-form-label">Descrição:</label>
                                <textarea className="form-control" id="descrição" onChange={(e) => setDetalhes(e.target.value)}></textarea>
                            </div>
                        </form>
                    <div className="msg-login text-center mb-2 mt-4">
                        {
                        carregando ? <div className="mx-auto spinner-border text-danger" role="status"></div>
                        :<>
                        {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Card criado! &#128526;</span>}
                        {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível criar o card! &#128546;</span>}
                        </>
                        }
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button onClick={cadastrar} type="button" className={"btn btn-primary "+botao} >Criar card</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false">
                        Comida
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                    <div className="accordion-body text-center">
                    <Card key={'lanche'} id={'lanche'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Fcomidas%2F1.svg?alt=media'} titulo={'Lanche'} descricao={''} tipo='Comida' props={updateModal}/>
                    <Card key={'almoço'} id={'almoço'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Fcomidas%2F2.svg?alt=media'} titulo={'Almoço'} descricao={''} tipo='Comida' props={updateModal}/>
                    <Card key={'janta'} id={'janta'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Fcomidas%2F3.svg?alt=media'} titulo={'Janta'} descricao={''} tipo='Comida' props={updateModal}/>
                    <Card key={'água'} id={'água'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Fcomidas%2F4.svg?alt=media'} titulo={'Água'} descricao={''} tipo='Comida' props={updateModal}/>
                    <Card key={'suco'} id={'suco'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Fcomidas%2F5.svg?alt=media'} titulo={'Suco'} descricao={''} tipo='Comida' props={updateModal}/>
                    <Card key={'refrigerante'} id={'refrigerante'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Fcomidas%2F6.svg?alt=media'} titulo={'Refrigerante'} descricao={''} tipo='Comida' props={updateModal}/>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Emergências
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                    <div className="accordion-body text-center">
                    <Card key={'polícia'} id={'polícia'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Femergencias%2F1.svg?alt=media'} titulo={'Polícia'} descricao={''} tipo='Emergências' props={updateModal}/>
                    <Card key={'médico'} id={'médico'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Femergencias%2F2.svg?alt=media'} titulo={'Médico'} descricao={''} tipo='Emergências' props={updateModal}/>
                    <Card key={'bombeiro'} id={'bombeiro'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Femergencias%2F3.svg?alt=media'} titulo={'Bombeiro'} descricao={''} tipo='Emergências' props={updateModal}/>
                    <Card key={'ambulância'} id={'ambulância'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Femergencias%2F4.svg?alt=media'} titulo={'Ambulância'} descricao={''} tipo='Emergências' props={updateModal}/>
                    <Card key={'ajuda'} id={'ajuda'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Femergencias%2F5.svg?alt=media'} titulo={'Ajuda!!!'} descricao={''} tipo='Emergências' props={updateModal}/>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                        Outros
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                    <div className="accordion-body text-center">
                    <Card key={'eu'} id={'eu'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Foutros%2FEU.svg?alt=media'} titulo={'Eu'} descricao={''} tipo='Outros' props={updateModal}/>
                    <Card key={'não'} id={'não'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Foutros%2FNAO.svg?alt=media'} titulo={'Não'} descricao={''} tipo='Outros' props={updateModal}/>
                    <Card key={'nós'} id={'nós'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Foutros%2FNOS.svg?alt=media'} titulo={'Nós'} descricao={''} tipo='Outros' props={updateModal}/>
                    <Card key={'sim'} id={'sim'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Foutros%2FSIM.svg?alt=media'} titulo={'Sim'} descricao={''} tipo='Outros' props={updateModal}/>
                    <Card key={'você'} id={'você'} img={'https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2Freferencias%2Foutros%2FVOCE.svg?alt=media'} titulo={'Você'} descricao={''} tipo='Outros' props={updateModal}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardsRef;