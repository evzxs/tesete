import React, { useState } from "react";
import "./login.css";
import { Link, Navigate } from 'react-router-dom';

import Navbar from '../../components/navbar'
import Logo from '../LOgo.svg'

import firebase from '../../config/firebase';
import 'firebase/compat/auth';

import { useSelector, useDispatch } from "react-redux";

function Login() {

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [carregando, setCarregando] = useState();
  const [spinner, setSpinner] = useState();
  const [msg, setMsg] = useState();
  const dispatch = useDispatch();

  function logar(){
    setCarregando(1);
    setMsgTipo(null);
    
    if(!email || !senha){
      setCarregando(0);
      setMsgTipo('erro');
      setMsg('Você precisa informar o e-mail e senha para fazer o login!');
      return;
  };

    firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado =>{
      setSpinner('d-none');
      setMsgTipo('sucesso');
      setTimeout(() => {
        dispatch({type: 'LOG_IN', usuarioEmail: email});
        setCarregando(0);
      }, 2000);
    }).catch(erro =>{
      setMsgTipo('erro');
      setMsg('Verifique se o usuário ou a senha estão corretos!')
      setCarregando(0);
    });
  };

  return (
    <>
    <Navbar/>
      <div className="login-content d-flex align-items-center my-2 py-lg-5">
        {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to="/"/> : null}
        <form onSubmit={e => e.preventDefault()} className="form-signin mx-auto">
          <div className="text-center mb-4">
            <img className="mb-4" src={Logo} alt="" width="150" height="150"/>
            <h1 className="h3 mb-3 fw-normal fw-bold">Login</h1>
          </div>
          <div className="form-floating">
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" id="floatingInput" placeholder="E-mail"/>
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" id="floatingPassword" placeholder="Senha"/>
            <label htmlFor="floatingPassword">Senha</label>
          </div>
            {
            carregando ? <div className={'row '+spinner}><div className="mx-auto spinner-border text-danger mt-3" role="status"></div></div>
            : <input onClick={logar} value="Logar" className="btn btn-lg btn-block mt-3 btn-login w-100 text-white" type="submit"/> 
            }
          <div className="msg-login text-center my-3">
            {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Você está conectado! &#128526;</span>}
            {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
          </div>
          <div className="opcoes-login mt-3 text-center">
            <Link to="/usuariorecuperarsenha" className="mx-2">Recuperar Senha</Link>
            <span>&#9733;</span>
            <Link to="/novousuario" className="mx-2">Quero Cadastrar</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
