import "../styles/slidebar.css"


const Slidebar: React.FC = () => {
    const list = [1,2,3,4]
    const user = JSON.parse(localStorage.getItem('user') as string)
    const ListPrint = list.map((item:number)=>{//나중에 리스트 구현할 예정
        return(
            <div className="slidebar-end-content-list" key={item}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2.5" y="2.5" width="15" height="15" rx="3" stroke="#F08080" strokeWidth="1.5"
                          strokeLinecap="round"/>
                </svg>
                <p>프로젝트{item} 이름</p>
            </div>
        )
    })

    return (
        <div className="slidebar-container">
            <div className="slidebar-top-content">
                <div>
                    <h3>{user['name']}</h3>
                </div>
                <svg style={{width:"20px", height:"20px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 6.66666L8.4714 10.1953C8.21106 10.4556 7.78895 10.4556 7.5286 10.1953L4 6.66666"
                      stroke="#686B6E" />
            </svg>
        </div>
         <div className="slidebar-bottom-content">
             <p>일반</p>
             <div className="slidebar-bottom-content-box">
                 <div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 20 20" fill="none">
                         <path
                             d="M16.6666 16.6667L13.6794 13.6794M13.6794 13.6794C14.7762 12.5827 15.4545 11.0675 15.4545 9.39393C15.4545 6.04675 12.7411 3.33333 9.39392 3.33333C6.04674 3.33333 3.33331 6.04675 3.33331 9.39393C3.33331 12.7411 6.04674 15.4545 9.39392 15.4545C11.0675 15.4545 12.5827 14.7762 13.6794 13.6794Z"
                             stroke="#686B6E" />
                     </svg>
                     <p>검색</p>
                 </div>
                 <div>
                     <p>시작하기</p>
                 </div>
             </div>
             <div className="slidebar-bottom-content-box">
                 <div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 20 20" fill="none">
                         <path
                             d="M2.5 7.08334V5.83334C2.5 4.91286 3.24619 4.16667 4.16667 4.16667H15.8333C16.7538 4.16667 17.5 4.91286 17.5 5.83334V7.08334M2.5 7.08334H17.5M2.5 7.08334V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V7.08334M5 13.3333H8.33333"
                             stroke="#686B6E" />
                     </svg>
                     <p>그룹</p>
                 </div>
                 <div>
                     <p>시작하기</p>
                 </div>
             </div>
         </div>
         <div className="slidebar-end-content">
            <div>
                <p>프로젝트</p>
            </div>
             <div className="slidebar-bottom-content-box2">
                 {ListPrint}
             </div>
         </div>
        </div>
    )
}

export default Slidebar;