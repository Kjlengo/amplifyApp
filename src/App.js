import './App.css';
import ContainerForm from './components/containerForm';
import { Login } from "./pages/login"
import {LOGIN, FORMDESCARGA} from './config/router/paths';

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
            <Routes>                
                <Route path={LOGIN} element={<Login />}/>
                <Route path={FORMDESCARGA} element={<ContainerForm />}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
