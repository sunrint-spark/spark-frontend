import {useEffect, useState} from "react";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import "../styles/auth-required.css"
import { useSearchParams, useNavigate } from "react-router-dom";
import Api from "@/lib/api.ts";
import {BASEURL} from "@/lib/api.ts";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {AxiosError} from "axios";

export default function AuthRequired() {
    const navigate = useNavigate();
    const [isRequested, setIsRequested] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState({} as Record<string, string>)
    const [searchParams ] = useSearchParams();
    useEffect(() => {
        async function authenticate() {
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            if (!code || !state) {
                return;
            }
            setIsButtonLoading(true)
            try {
                const data  = await Api.authenticate({
                    code: code, state: state
                });
                if (data.detail == "Invalid State") {
                    setIsButtonLoading(false)
                    setDialogData({
                        title: "구글 인증 실패",
                        description: "구글 로그인 인증이 실패했습니다. 페이지에 다시 접속해주세요."
                    })
                    setIsDialogOpen(true);
                    navigate('/')
                }
                const token = data.token;
                localStorage.setItem('token', token);
                const response = await Api.getProfile() as Record<string, Record<string, string>>
                localStorage.setItem('user', JSON.stringify(response.data))
                return navigate('/');
            } catch (e) {
                const error = e as AxiosError;
                setIsButtonLoading(false)
                if (error.code == 'ERR_BAD_REQUEST') {
                    setDialogData({
                        title: "로그인 오류",
                        description: "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                    })
                } else if (error.code == 'ERR_NETWORK') {
                    setDialogData({
                        title: "서버 오류",
                        description: "서버에 응답이 없습니다. 잠시 후 다시 시도해주세요."
                    })
                } else {
                    setDialogData({
                        title: "알 수 없는 오류",
                        description: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                    })

                }
                setIsDialogOpen(true)
                console.error(e);

            }
        }
        if(localStorage.getItem('token') !== null) {
            return navigate('/')
        }
        if (!isRequested) {
            setIsRequested(true)
            authenticate();
        }
    }, [searchParams])

      return (
          <>
              <main className="main-content">
                  <AlertDialog open={isDialogOpen}>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>
                                  {dialogData.title}
                              </AlertDialogTitle>
                              <AlertDialogDescription style={{
                                  color: "white"
                              }}>
                                  {dialogData.description}
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogAction onClick={
                                    async () => {
                                        setIsDialogOpen(false)
                                        return navigate('/')
                                    }
                              }>확인</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                  <div id="g_id_onload"
                       data-client_id="975166081717-5kv5d2vbfj9nubq6jbo9u4u34b8lc0ir.apps.googleusercontent.com"
                       data-use_fedcm_for_prompt="true"
                       data-auto_prompt="true"
                       data-login_uri="http://localhost:5173/callback">
                  </div>
                  <div className="auth-icon">🔒</div>
                  <div className="auth-message">
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Spark, AI 기반 브레인스토밍 플랫폼
                      </h3>
                      <p className="leading-7 [&:not(:first-child)]:mt-6">
                          이 페이지는 로그인이 필요합니다
                      </p>
                  </div>
                  <div className="google-button p-4 max-w-sm mx-auto">
                      <Button disabled={isButtonLoading} onClick={
                          () => {
                              setIsButtonLoading(true)
                              window.location.href = BASEURL + "/user/authorization_url"
                          }
                      } style={{
                          gap: "0.3rem",
                      }}>
                          {isButtonLoading? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <FontAwesomeIcon icon={faGoogle}/> }
                          {isButtonLoading? "잠시만 기다려주세요..." : "구글 계정으로 로그인"}
                      </Button>
                  </div>
              </main>
          </>
      );
}