import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
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
            detalhes: detalhes,
            usuario: usuarioEmail,
            visualizacoes: 0,
            publico: 1,
            criacao: new Date()
        };
        foto ? Object.assign(body, {foto: foto.name.split('.').pop()}): Object.assign(body, {foto: null});
        db.collection('cards').add(body).then((resultado)=>{
            if(foto){storage.ref(`imagens/${resultado.id+'.'+foto.name.split('.').pop()}`).put(foto).then(()=>{
                setMsgTipo('sucesso');
                setCarregando(0);
                setBotao('disabled');
                setTimeout(()=>{navigate('/')}, 2000);
            });
            }
            else{
                setMsgTipo('sucesso');
                setCarregando(0);
                setBotao('disabled');
                setTimeout(()=>{navigate('/')}, 2000);
            };
        }).catch(erro => {
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
                <h3 className="mx-auto fw-bold">Novo Card</h3>
            </div>
            <form>
                <div className="form-group">
                    <label>Título: </label>
                    <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Tipo do Card: </label>
                    <select defaultValue={'-- Selecione um tipo --'} onChange={(e) => setTipo(e.target.value)} className="form-control">
                        <option disabled>-- Selecione um tipo --</option>
                        <option>Comida</option>
                        <option>Emergências</option>
                        <option>Outros</option>
                    </select>
  
                </div>
                <div className="form-group">
                    <label>Descrição do Card</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows={3}/>
                </div>
                <div className="form-group">
                    <label>Upload da Foto:</label>
                    <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control"/>
                </div>
                <div className="row">
                    {
                    carregando ? <div className="mx-auto spinner-border text-danger mt-3" role="status"></div>
                    : <button onClick={cadastrar} type="button" className={"btn btn-lg btn-block mt-3 mb-5 btn-cadastro w-100 "+botao}>Criar Card</button>
                    }
                </div>
            </form>
            <div className="msg-login text-center">
            {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Card criado! &#128526;</span>}
            {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível criar o card! &#128546;</span>}
          </div>
        </div>
        </>
    )
}

export default CriarCard;