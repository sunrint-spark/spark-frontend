import { BrowserRouter, Route, Routes } from "react-router-dom"
import Community from "./pages/community";
import { ModalProvider } from './modal/ModalContext';
import Ideaboard from "./pages/ideaboard";
import Brainstorm from "./pages/Brainstorm";
import HomePage from "@/pages/Home.tsx";
import './styles/global.css'
import AuthRequired from "@/pages/AuthRequired";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "@/components/theme-provider"

const clientId = '975166081717-5kv5d2vbfj9nubq6jbo9u4u34b8lc0ir.apps.googleusercontent.com';

export default function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <GoogleOAuthProvider clientId={clientId}>
            <HomePage/>
            </GoogleOAuthProvider>
        }/>
        <Route path="/callback" element={
            <AuthRequired/>
        }/>
          <Route path="/community" element={<Community/>}/>
          <Route path ="/ideaboard" element={
              <ModalProvider>
                  <Ideaboard/>
              </ModalProvider>
          }/>
          <Route path="/brainstorm" element={<Brainstorm/>}/>
      </Routes>
    </BrowserRouter>
        </ThemeProvider>
  )
}