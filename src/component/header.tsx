import  "../styles/header.css"
import logoimage from "../image/dd.svg"
function Header(){
    return(
        <div className="header">
            <div className="header-container">
                <div className="header-left-content">
                    <img src={logoimage}/>
                    <p>홈</p>
                    <div>
                        <p>내 노트</p>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21"
                                 fill="none">
                                <path d="M5 8L10 13L15 8" stroke="#F08080" stroke-width="1.67" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <p>아이디어</p>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21"
                                 fill="none">
                                <path d="M5 8L10 13L15 8" stroke="#F08080" stroke-width="1.67" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="header-right-content">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M12.0227 13.7136C11.7967 14.0894 11.6667 14.5295 11.6667 15C11.6667 16.3807 12.786 17.5 14.1667 17.5C15.5474 17.5 16.6667 16.3807 16.6667 15C16.6667 13.6193 15.5474 12.5 14.1667 12.5C13.2565 12.5 12.4599 12.9865 12.0227 13.7136ZM12.0227 13.7136L7.97743 11.2864M7.97743 11.2864C8.20341 10.9106 8.33337 10.4705 8.33337 10C8.33337 9.52952 8.20341 9.0894 7.97743 8.71357M7.97743 11.2864C7.54022 12.0135 6.74361 12.5 5.83337 12.5C4.45266 12.5 3.33337 11.3807 3.33337 10C3.33337 8.61929 4.45266 7.5 5.83337 7.5C6.74361 7.5 7.54022 7.98645 7.97743 8.71357M7.97743 8.71357L12.0227 6.28643M12.0227 6.28643C12.4599 7.01355 13.2565 7.5 14.1667 7.5C15.5474 7.5 16.6667 6.38071 16.6667 5C16.6667 3.61929 15.5474 2.5 14.1667 2.5C12.786 2.5 11.6667 3.61929 11.6667 5C11.6667 5.47048 11.7967 5.9106 12.0227 6.28643Z"
                                stroke="#F08080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>공유하기</p>
                    </button>
                    <button>
                        <div className="header-profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 27 27"
                                 fill="none">
                                <path
                                    d="M21.2777 23.5C21.2777 19.8181 18.293 16.8333 14.6111 16.8333H12.3888C8.70694 16.8333 5.72217 19.8181 5.72217 23.5M17.9444 7.94444C17.9444 10.399 15.9545 12.3889 13.4999 12.3889C11.0453 12.3889 9.0555 10.399 9.0555 7.94444C9.0555 5.48985 11.0453 3.5 13.4999 3.5C15.9545 3.5 17.9444 5.48985 17.9444 7.94444Z"
                                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p>사용자</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;