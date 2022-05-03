import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./route/Home";
import Login from "./route/Login";
import Register from "./route/Register";
import SinglePost from "./route/SinglePost";
import { AuthContext, AuthProvider } from "./context/auth";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" replace />}
            />
            <Route path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
