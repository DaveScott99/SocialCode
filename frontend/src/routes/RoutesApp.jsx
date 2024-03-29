import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Authentication from "../pages/Authentication/Authentication";
import { AuthProvider, AuthContext } from "../contexts/Auth/AuthContext";
import { useContext } from "react";
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout";
import Test from "../pages/Tests/Test";
import UserProfile from "../pages/UserProfile/UserProfile";
import Publish from "../pages/Publish";
import InterestSelection from "../pages/InterestSelection";
import Post from "../pages/Post";
import WatchList from "../pages/Watch/WatchList";
import Search from "../pages/Search";
import Watch from "../pages/Watch";
import PublishVideo from "../pages/PublishVideo";
import SidebarVideo from "../components/SidebarVideo";
import Playlist from "../pages/Playlist";
import SidebarPost from "../components/SidebarPost";
import Groups from "../pages/Groups";

export default function RouteApp() {
  const Private = ({ children }) => {
    // Puxando as informações de login do AuthContext
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    // Se o usuário não estiver autenticado ele ira redirecionar para a página de Autenticação
    if (!authenticated) {
      return <Navigate to="/authentication" />;
    }

    // Se o usuário estiver autenticado o componente filho será renderizado
    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Private>
                <Layout asideItens={<SidebarPost />}>
                  <Home />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/profile/:username"
            element={
              <Private>
                <Layout asideItensAbsolute={<SidebarPost />}>
                  <UserProfile />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/publicar"
            element={
              <Private>
                <Layout asideItensAbsolute={<SidebarPost />}>
                  <Publish />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/publicar/video"
            element={
              <Private>
                <Layout asideItensAbsolute={<SidebarVideo />}>
                  <PublishVideo />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/interest"
            element={
              <Private>
                <Layout>
                  <InterestSelection />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/post/:title"
            element={
              <Private>
                <Layout asideItensAbsolute={<SidebarPost />}>
                  <Post />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/watch"
            element={
              <Private>
                <Layout asideItens={<SidebarVideo />}>
                  <WatchList />
                </Layout>
              </Private>
            }
          />

          <Route
            exact
            path="/playlist/:playlistName"
            element={
              <Private>
                <Layout asideItens={<SidebarVideo />}>
                  <Playlist />
                </Layout>
              </Private>
            }
          />

          <Route
            exact
            path="/watch/:filename"
            element={
              <Private>
                <Layout asideItensAbsolute={<SidebarVideo />}>
                  <Watch />
                </Layout>
              </Private>
            }
          />

          <Route
            exact
            path="/search/:query"
            element={
              <Private>
                <Layout asideItensAbsolute={<SidebarPost />}>
                  <Search />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/groups"
            element={
              <Private>
                <Layout asideItens={<SidebarPost />}>
                  <Groups />
                </Layout>
              </Private>
            }
          />
          <Route
            exact
            path="/test"
            element={
              <Private>
                <Layout>
                  <Test />
                </Layout>
              </Private>
            }
          />
          <Route exact path="/authentication" element={<Authentication />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
