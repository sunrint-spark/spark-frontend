import Slidebar from "../component/slidebar";
import "../styles/home.css";

function HomePage() {
    return (
        <div className="home">
            <Slidebar />
            <div className="home-container">
                <section className="community-board">
                    <div className="board-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="34"
                            viewBox="0 0 36 34"
                            fill="none"
                            aria-label="Explore Community Board"
                        >
                            <path
                                d="M33.4375 17.0156C33.4375 25.8436 26.2811 33 17.4531 33C8.6252 33 1.46875 25.8436 1.46875 17.0156C1.46875 8.1877 8.6252 1.03125 17.4531 1.03125C26.2811 1.03125 33.4375 8.1877 33.4375 17.0156Z"
                                stroke="#F08080"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.237 23.2318L13.901 13.4635L23.6693 10.7995L21.0052 20.5677L11.237 23.2318Z"
                                stroke="#F08080"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div>커뮤니티 보드 탐색하기</div>
                    </div>
                    <div className="board-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            aria-label="Create New Board"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM23.5314 13.9314C24.1562 13.3065 24.1562 12.2935 23.5314 11.6686C22.9065 11.0438 21.8935 11.0438 21.2686 11.6686L14.4 18.5373L10.7314 14.8686C10.1065 14.2438 9.09347 14.2438 8.46863 14.8686C7.84379 15.4935 7.84379 16.5065 8.46863 17.1314L12.1373 20.8C13.3869 22.0497 15.4131 22.0497 16.6627 20.8L23.5314 13.9314Z"
                                fill="#F08080"
                            />
                        </svg>
                        <div>새로운 보드 생성하기</div>
                    </div>
                </section>
                <section className="detail">
                    <div>
                        <p>최근에 본 프로젝트</p>
                    </div>
                    <div>
                        <p>공유된 프로젝트</p>
                    </div>
                </section>
                <section className="option">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="option-card"></div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default HomePage;