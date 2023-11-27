import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "./criar-card.css";
import Navbar from '../../components/navbar'
import firebase from '../../config/firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

function CriarCard(){

    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [foto, setFoto] = useState();
    const [botao, setBotao] = useState();
    const [carregando, setCarregando] = useState();
    const storage = firebase.storage();
    const db = firebase.firestore();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const navigate = useNavigate();

    function success(){
        setMsgTipo('sucesso');
        setCarregando(0);
        setBotao('disabled');
        setTimeout(()=>{navigate('/')}, 2000);
    }

    function isImage(extension){
        if(extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'gif' || extension === 'svg' || extension === 'webp'){
            return true;
        }
        else{
            return false;
        }
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
        if(foto){
            const nomefoto = foto.name.split('.').pop().toLowerCase()
            if(isImage(nomefoto) === true){
                Object.assign(body, {
                    foto: foto.name.split('.').pop()
                })
            }
            else{
                Object.assign(body, {
                    foto: "https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2F1697669890197.png?alt=media"
                });
            }
        }
        else{Object.assign(body, {foto: "https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/src%2F1697669890197.png?alt=media"});}
        db.collection('cards').add(body).then((resultado)=>{
            if(foto){
                const nomefoto = foto.name.split('.').pop().toLowerCase()
                if(isImage(nomefoto) === true){
                    db.collection("cards").doc(resultado.id).update({foto: `https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/imagens%2F${resultado.id+'.'+nomefoto}?alt=media`});
                    storage.ref(`imagens/${resultado.id+'.'+nomefoto}`).put(foto).then(()=>(success()));
                }
                else(success());
            }
            else(success());
        }).catch(erro => {
            console.log(erro)
            setMsgTipo('erro');
            setCarregando(0);
        });
    };
    
    return(
        <>
        <Navbar/>
        {useSelector(state => state.usuarioLogado) > 0 ? null : <Navigate to="/"/> }
        <div className="col-12 p-3">
            <div className="row text-center">
                <h3 className="mx-auto fw-bold">Novo card</h3>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="tituloInput">Título: </label>
                    <input id="tituloInput" onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="tipoSelect">Tipo do card: </label>
                    <select id="tipoSelect" defaultValue={'-- Selecione um tipo --'} onChange={(e) => setTipo(e.target.value)} className="form-control">
                        <option disabled>-- Selecione um tipo --</option>
                        <option>Comida</option>
                        <option>Emergências</option>
                        <option>Outros</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="descricaoTextArea">Descrição do card</label>
                    <textarea className="form-control" onChange={(e) => setDetalhes(e.target.value)} id="descricaoTextArea" rows="3"/>
                </div>
                <div className="form-group">
                    <label htmlFor="fotoInput">Upload da foto:</label>
                    <input id="fotoInput" onChange={(e) => setFoto(e.target.files[0])} type="file" accept="image/*" className="form-control"/>
                </div>
                <div className="row">
                    {
                    carregando ? <div className="mx-auto spinner-border text-danger mt-3" role="status"></div>
                    : <button onClick={cadastrar} type="button" className={"btn btn-lg btn-block my-3 btn-criarCard text-white w-100 "+botao}>Criar card</button>
                    }
                </div>
            </form>
            <div className="msg-login text-center">
                {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Card criado! &#128526;</span>}
                {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível criar o card! &#128546;</span>}
            </div>
            <div className="text-center pt-5">
                <h3>Está sem ideias?</h3>
                <h4><Link to='/cardsref'>Veja alguns cards pré-prontos!</Link></h4>
            </div>
        </div>
        </>
    )
}

export default CriarCard;