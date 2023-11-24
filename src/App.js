import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import CriarCard from './view/criar-card';
import CardsRef from "./view/cardsref";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/tesete">
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route path='/novousuario' element={<NovoUsuario/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/usuariorecuperarsenha' element={<UsuarioRecuperarSenha/>}/>
            <Route path='/criarcard' element={<CriarCard/>}/>
            <Route path='/cardsref' element={<CardsRef/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
