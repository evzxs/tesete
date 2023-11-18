import React from "react";
import "./navbar.css";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


function Navbar(){
    const dispatch = useDispatch();
    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="https://i.ibb.co/48Dnk3z/1697669419320.png" width="40" height="40" alt=""/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        {
                        useSelector(state => state.usuarioLogado) > 0 ?<>
                        <li className="nav-item"><Link className="nav-link" to="/criarcard">Criar um card</Link></li>
                        </>:null
                        }
                    </ul>
                    <ul className="navbar-nav d-flex">
                        {
                        useSelector(state => state.usuarioLogado) > 0 ?<>
                        <li className="nav-item nav-link pe-3 logout" onClick={() => {dispatch({type: 'LOG_OUT'});}}>Sair</li>
                        </>:<>
                        <li className="nav-item"><Link className="nav-link pe-3" to="/novousuario">Cadastrar</Link></li>
                        <li className="nav-item"><Link className="nav-link pe-3" to="/login">Login</Link></li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;