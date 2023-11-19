import React, { useState } from "react";
import "./usuario-recuperar-senha.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/navbar'
import firebase from '../../config/firebase';
import 'firebase/compat/auth';

function UsuarioRecuperarSenha(){

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email).then(resultado =>{
            setMsg('Enviamos um link ao seu e-mail para você redefinir sua senha! 😉');
        }).catch(erro => {
            setMsg('Verifique se o e-mail está correto.');
        });
    };
    
    return(
        <>
        {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to="/"/> : null}
        <Navbar/>
        <form className="text-center form-login mx-auto mt-5">
            <h3 className="mb-3 fw-bold">Recuperar Senha</h3>
            <div className="form-floating">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/> 
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="msg my-4 text-center">
                <span>{msg}</span>
            </div>
            <input value="Recuperr Senha" onClick={recuperarSenha} type="submit" className="btn w-100 btn-lg btn-block btn-enviar"/>
        </form>
        </>
    );
};

export default UsuarioRecuperarSenha;