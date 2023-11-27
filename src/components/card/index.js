import React, { useEffect, useState } from "react";
import "./card.css";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

function GerarCard({id, img, titulo, descricao, props, typeButton, tipo}){

    const [urlImagem, setUrlImagem] = useState();
    const [carregando, setCarregando] = useState(1);

    useEffect(()=>{
        setUrlImagem(img)
        setTimeout(()=>{
        setCarregando(0);
        },2000)
    }// eslint-disable-next-line
    , []);
    
    return(
        <div className="card card-home m-2">
            {
            carregando ? <div className='row spinnerCard'><div className="mx-auto spinner-border text-danger my-5" role="status"></div></div>
            : <img src={urlImagem} className="card-img-top img-fluid img-cartao" alt="Imagem do Card" id={id}/>
            }
            
            <div className="card-body text-center">
                <h5 className="card-title card-title-home lead">{titulo}</h5>

                {typeButton === "vercard"? 
                <button type="button" className="btn btn-detalhes" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={()=>props(titulo, descricao, urlImagem, id, typeButton)}>
                    Ver card
                </button>
                :
                <button type="button" className="btn btn-detalhes" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={()=>props(tipo, img)}>
                    Adicionar card
                </button>}
            </div>
        </div>
    )
}

export default GerarCard;