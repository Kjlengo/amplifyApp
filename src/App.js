import './App.css';
import ContainerForm from './components/containerForm';
import { Login } from "./pages/login"
import {PRIVATE} from './config/router/paths';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/router/PrivateRoute';
import AuthProvider from './contexts/authContext';
import PublicRoute from './components/router/PublicRoute';

// minuto 21 video
function App() {
  return (
    <AuthProvider> 
        <BrowserRouter>
            <Routes> 
              <Route path='/' element={<PublicRoute /> }>
                <Route index element={<Login />}/>
              </Route>
              <Route path={PRIVATE} element={<PrivateRoute />}>
                <Route index element={ <ContainerForm/> }/>
              </Route>              
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
