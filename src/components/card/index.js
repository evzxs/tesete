import React, { useEffect, useState } from "react";
import "./card.css";
import firebase from "../../config/firebase";
import 'firebase/compat/auth';
import 'firebase/compat/storage';


function GerarCard({id, img, titulo, detalhes, visualizacoes, asd}){

    const storage = firebase.storage();
    const [urlImagem, setUrlImagem] = useState();
    const [carregando, setCarregando] = useState(1);

    useEffect(()=>{
        if(img.split('.').pop() !== 'null' || img.split('.').pop() === 'png' || img.split('.').pop() === 'jpg' || img.split('.').pop() === 'gif' || img.split('.').pop() === 'jpeg'){
            storage.ref(`imagens/${img}`).getDownloadURL().then(url => {
                setUrlImagem(url);
                setTimeout(()=>{
                setCarregando(0);
                },1000)
            });
        }
        else{
            setUrlImagem("https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/imagens%2F6wCStEUf53mVcSF7rqsF.png?alt=media&token=891ce99f-b102-44ea-9ec5-b24026fe3fe3");
            setTimeout(()=>{setCarregando(0)},2000)
        }// eslint-disable-next-line
    }, []);
    
    return(
        <div className="card m-2">
            {
            carregando ? <div className='row spinnerCard'><div className="mx-auto spinner-border text-danger my-5" role="status"></div></div>
            : <img src={urlImagem} className="card-img-top img-fluid img-cartao" alt="Imagem do Card"/>
            }
            
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{detalhes}</p>
                <button type="button" className="btn btn-sm btn-detalhes" data-bs-toggle="modal" data-bs-target="#cardModal">
                + Detalhes
                </button>
            </div>
        </div>
    )
}

export default GerarCard;