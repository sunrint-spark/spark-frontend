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
import { AuthWrapper } from "@/pages/AuthWrapper"

const clientId = '975166081717-5kv5d2vbfj9nubq6jbo9u4u34b8lc0ir.apps.googleusercontent.com';

export default function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <GoogleOAuthProvider clientId={clientId}>
                <AuthWrapper>
                    <HomePage/>
                </AuthWrapper>
                </GoogleOAuthProvider>
        }/>
        <Route path="/callback" element={
            <AuthRequired/>
        }/>
          <Route path="/community" element={
              <AuthWrapper>
                    <Community/>
              </AuthWrapper>
          }/>
          <Route path ="/ideaboard" element={
              <AuthWrapper>
                  <ModalProvider>
                      <Ideaboard/>
                  </ModalProvider>
              </AuthWrapper>
          }/>
          <Route path="/brainstorm/:flowId" element={
              <AuthWrapper>
                  <Brainstorm/>
              </AuthWrapper>
          }/>
      </Routes>
    </BrowserRouter>
        </ThemeProvider>
  )
}