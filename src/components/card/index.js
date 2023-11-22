import React, { useEffect, useState } from "react";
import "./card.css";
import firebase from "../../config/firebase";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

function GerarCard({id, img, titulo, detalhes, visualizacoes, props}){


    const storage = firebase.storage();
    const [urlImagem, setUrlImagem] = useState();
    const [carregando, setCarregando] = useState(1);

    useEffect(()=>{
            if(img.split('.').pop() === 'null'){
                setUrlImagem("https://firebasestorage.googleapis.com/v0/b/testers-fc6a9.appspot.com/o/imagens%2F1697669890197.png?alt=media&token=4090be02-f553-4328-8c1c-1fac936b52c3")
                setTimeout(()=>{setCarregando(0)},2000)
            }
            else{
                storage.ref(`imagens/${img}`).getDownloadURL().then(url => {
                    setUrlImagem(url);
                    setTimeout(()=>{
                    setCarregando(0);
                    },2000)
                }).catch(error =>{
                    setTimeout(()=>{setCarregando(0)},2000)
                });
            }
        }// eslint-disable-next-line
    , []);
    
    return(
        <div className="card m-2">
            {
            carregando ? <div className='row spinnerCard'><div className="mx-auto spinner-border text-danger my-5" role="status"></div></div>
            : <img src={urlImagem} className="card-img-top img-fluid img-cartao" alt="Imagem do Card" id={id}/>
            }
            
            <div className="card-body text-center">
                <h5 className="card-title">{titulo}</h5>
                <button type="button" className="btn btn-detalhes" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={()=>props(titulo,detalhes)}>
                Ver card
                </button>
            </div>
        </div>
    )
}

export default GerarCard;