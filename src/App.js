import './App.css';
import ContainerForm from './components/containerForm';
import { Login } from "./pages/login"
import {LOGIN, FORMDESCARGA} from './config/router/paths';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/router/PrivateRoute';
import AuthProvider from './contexts/authContext';

function App() {
  return (
    <AuthProvider> 
        <BrowserRouter>
            <Routes>                
                <Route path={LOGIN} element={<Login />}/>
                <Route path={FORMDESCARGA} element={<PrivateRoute> <ContainerForm/> </PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
