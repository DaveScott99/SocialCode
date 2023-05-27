import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Authentication from '../pages/Authentication/Authentication';
import { AuthProvider, AuthContext } from '../contexts/Auth/AuthContext';
import { useContext } from 'react';
import Home from '../pages/Home/Home';
import CardUserProfile from '../components/CardUserProfile/CardUserProfile';
import Layout from '../components/Layout/Layout';

export default function RouteApp() {

    const Private = ({ children }) => {

        // Puxando as informações de login do AuthContext
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        
        // Se o usuário não estiver autenticado ele ira redirecionar para a página de Autenticação
        if (!authenticated) {
            return <Navigate to="/authentication" />
        }

        // Se o usuário estiver autenticado o componente filho será renderizado
        return children;
    }
    
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path='/' element={ 
                        <Private>
                                <Layout>
                                    <Home />
                                </Layout>


                        </Private>
                    } />
                    <Route exact path='/profile' element={ 
                        <Private>
                            <Layout>
                                <CardUserProfile />
                            </Layout>
                        </Private>
                    } />
                    <Route exact path="/authentication" element={<Authentication />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}