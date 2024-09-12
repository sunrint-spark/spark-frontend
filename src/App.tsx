import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Community from "./pages/community";
import { ModalProvider } from './modal/ModalContext';
import Brainstorm from "./pages/Brainstorm";
import HomePage from "@/pages/Home.tsx";
import './styles/global.css'
import AuthRequired from "@/pages/AuthRequired";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthWrapper } from "@/pages/AuthWrapper"

const clientId = '975166081717-5kv5d2vbfj9nubq6jbo9u4u34b8lc0ir.apps.googleusercontent.com';

export default function App() {
  return (
      <HelmetProvider>
          <Helmet>
              <title>Spark</title>
              <meta property="og:title" content="Spark, AI 브레인스토밍 플렛폼" />
              <meta property="og:site_name" content="Spark" />
              <meta property="og:url" content="https://spark.ychan.me" />
              <meta property="og:description" content="주제 한 줄로 아이디어 생성, 프로젝트 기획까지 Spark로." />
              <meta property="og:type" content="website" />
          </Helmet>
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
          <Route path="/brainstorm/:flowId" element={
              <AuthWrapper>
                  <ModalProvider>
                      <Brainstorm/>
                  </ModalProvider>
              </AuthWrapper>
          }/>
      </Routes>
    </BrowserRouter>
          <Toaster/>
        </ThemeProvider>
          </HelmetProvider>
  )
}