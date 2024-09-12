import {useNavigate} from "react-router-dom";
import {SetStateAction, useEffect, useState} from "react";
import Api from "@/lib/api";
import Slidebar from "@/components/slidebar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import "../styles/home.css";

function HomePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  const [recentFlowList, setRecentFlowList] = useState([] as Record<string, string>[])
  const [recommendedFlowList, setRecommendedFlowList] = useState([] as string[])
  const [inputValue, setInputValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogData, setDialogData] = useState({} as Record<string, string>)

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };


  useEffect(() => {
    async function getRecentFlowList() {
      const response = await Api.getRecentFlow() as unknown as Record<string, Record<string, string>[]>
      setRecentFlowList(response.data)
    }
    async function getRecommendedFlowList() {
        const response = await Api.getRecommendFlow() as unknown as Record<string, string[]>
        setRecommendedFlowList(response.data)
    }
    getRecentFlowList()
    getRecommendedFlowList()
  }, []);

  const recentListPrint = recentFlowList.map((item: Record<string, string>) => {
    return (<div key={item.id} className = "recommendList" onClick={
      async () => {
        navigate(`/brainstorm/${item.id}`)
      }
    } style={{
        cursor: 'pointer'
    }}>
      <div>{item.name}</div>
      <div>{item.description}</div>
    </div>)
  })
  const recommendedListPrint = recommendedFlowList.map((item: string) => {
    return (
        <div className = "recommendList"
            key={item}
            style={{
              cursor: 'pointer'
            }}
            onClick={
              async () => {
                  setDialogData(
                      {
                          title: "프로젝트를 생성중입니다...",
                          description: "잠시만 기다려주세요"
                      }
                  )
                  setIsDialogOpen(true)
                const response = await Api.createFlow(item) as unknown as Record<string, string>
                navigate(`/brainstorm/${response.data}`)
              }
            }
        >{item}</div>
    )
  })

  return (
      <div className="home">
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
                  {dialogData.error == "true" && (
                      <AlertDialogFooter>
                          <AlertDialogAction onClick={
                              async () => {
                                  setIsDialogOpen(false)
                                  return navigate('/')
                              }
                          }>확인</AlertDialogAction>
                      </AlertDialogFooter>
                  )}
              </AlertDialogContent>
          </AlertDialog>
        <Slidebar/>
        <div className="home-container">
          <div className="MyIdea">
          <p>나의 아이디어 시작하기</p>
        </div>
        <div className="comment-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="아이디어 주제나 만들 프로젝트에 대해서 1줄 아내로 설명해주세요 "
                />
                <div>
                    <button onClick={
                      async () => {
                          setDialogData(
                              {
                                  title: "프로젝트를 생성중입니다...",
                                  description: "잠시만 기다려주세요"
                              }
                          )
                          setIsDialogOpen(true)
                        const response = await Api.createFlow(inputValue) as unknown as Record<string, string>
                        navigate(`/brainstorm/${response.data}`)
                      }
                    }>시작</button>
                </div>
            </div>
        <div className="example">
          <div>
            <p>예시를 눌러 시작하세요!</p>
          </div>
          <div className="asdf">
            {recommendedListPrint}
            <div className ="recommendListButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path d="M13 1.5005L1 13.5005M1 1.5005L13 13.5005" stroke="#F08080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.32 0.529471C8.70071 0.411643 10.0884 0.654478 11.347 1.23419C12.6056 1.8139 13.6921 2.71061 14.5 3.83647V2.25047C14.5 2.05156 14.579 1.86079 14.7197 1.72014C14.8603 1.57949 15.0511 1.50047 15.25 1.50047C15.4489 1.50047 15.6397 1.57949 15.7803 1.72014C15.921 1.86079 16 2.05156 16 2.25047V6.50047H11.75C11.5511 6.50047 11.3603 6.42145 11.2197 6.2808C11.079 6.14015 11 5.94938 11 5.75047C11 5.55156 11.079 5.36079 11.2197 5.22014C11.3603 5.07949 11.5511 5.00047 11.75 5.00047H13.477C12.7931 3.93038 11.8107 3.08406 10.6512 2.56606C9.4917 2.04806 8.20584 1.88108 6.95248 2.08574C5.69912 2.29039 4.53316 2.85772 3.59864 3.71765C2.66412 4.57757 2.00198 5.69242 1.694 6.92447C1.67128 7.02125 1.62955 7.11255 1.57123 7.19306C1.51291 7.27357 1.43917 7.34168 1.35429 7.39344C1.26942 7.44519 1.1751 7.47956 1.07682 7.49453C0.97854 7.5095 0.878265 7.50479 0.781825 7.48066C0.685385 7.45654 0.594703 7.41348 0.515053 7.35399C0.435404 7.29451 0.368375 7.21978 0.317865 7.13415C0.267355 7.04853 0.234371 6.95372 0.220832 6.85523C0.207293 6.75674 0.213469 6.65655 0.239 6.56047C0.643544 4.9429 1.5434 3.49215 2.81279 2.41102C4.08218 1.32989 5.65766 0.672402 7.319 0.530471L7.32 0.529471ZM3.92 15.3815C4.99199 16.0169 6.19758 16.393 7.44068 16.48C8.68378 16.567 9.93001 16.3623 11.08 15.8824C12.23 15.4025 13.252 14.6606 14.0646 13.7158C14.8771 12.7709 15.4577 11.6494 15.76 10.4405C15.805 10.2487 15.7728 10.0469 15.6702 9.87864C15.5676 9.71042 15.403 9.58932 15.2119 9.54151C15.0207 9.4937 14.8185 9.52301 14.6488 9.62311C14.4791 9.72321 14.3556 9.88606 14.305 10.0765C13.9969 11.3083 13.3347 12.4228 12.4002 13.2825C11.4658 14.1422 10.3 14.7094 9.04688 14.9141C7.79373 15.1187 6.50809 14.9518 5.34871 14.434C4.18933 13.9163 3.20699 13.0702 2.523 12.0005H4.25C4.44891 12.0005 4.63968 11.9215 4.78033 11.7808C4.92098 11.6401 5 11.4494 5 11.2505C5 11.0516 4.92098 10.8608 4.78033 10.7201C4.63968 10.5795 4.44891 10.5005 4.25 10.5005H0V14.7505C0 14.9494 0.0790176 15.1401 0.21967 15.2808C0.360322 15.4215 0.551088 15.5005 0.75 15.5005C0.948912 15.5005 1.13968 15.4215 1.28033 15.2808C1.42098 15.1401 1.5 14.9494 1.5 14.7505V13.1645C2.14478 14.0628 2.96879 14.8177 3.92 15.3815Z" fill="#F08080"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="alarm">
          <div>
            <div>
              <p>알림</p>
            </div>
            <div>
              <p>다른 유저와 함께 작업하기</p>
              <p>아이디어 보드를 다른 유저와 실시간으로 작업할 수 있어요.</p>
            </div>
          </div>
        </div>
        <div className="recent">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.5 8H12V13L16.28 15.54L17 14.33L13.5 12.25V8ZM13 3C10.6131 3 8.32387 3.94821 6.63604 5.63604C4.94821 7.32387 4 9.61305 4 12H1L4.96 16.03L9 12H6C6 10.1435 6.7375 8.36301 8.05025 7.05025C9.36301 5.7375 11.1435 5 13 5C14.8565 5 16.637 5.7375 17.9497 7.05025C19.2625 8.36301 20 10.1435 20 12C20 13.8565 19.2625 15.637 17.9497 16.9497C16.637 18.2625 14.8565 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C7.47161 19.2004 8.46234 19.8668 9.55433 20.32C10.6463 20.7733 11.8177 21.0045 13 21C15.3869 21 17.6761 20.0518 19.364 18.364C21.0518 16.6761 22 14.3869 22 12C22 9.61305 21.0518 7.32387 19.364 5.63604C17.6761 3.94821 15.3869 3 13 3Z" fill="#F08080"/>
            </svg>
            <p>최근에 작업한 아이디어 보드</p>
            </div>
          <div className="recent-content">
            {recentListPrint}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
