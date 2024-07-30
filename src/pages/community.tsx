import Slidebar from "../component/slidebar.tsx";
import "../styles/community.css";

function Community() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // map함수 시연용 리스트, 나중에 삭제 예정
    const Listitems = list.map((item) => {
        return (
            <div className="card" key={item}>
                <div className="card-image">
                </div>
                <div></div>
                <div className="card-footer">
                    <div className="card-left-footer">
                        <div></div>
                        <p>사용자 {item}</p>
                    </div>
                    <div className="card-right-footer">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                            >
                                <path
                                    d="M4.75736 6.99264L2.25 9.5L4.75736 12.0074C7.1005 14.3505 10.8995 14.3505 13.2426 12.0074L15.75 9.5L13.2426 6.99264C10.8995 4.64949 7.10051 4.64949 4.75736 6.99264Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.5 9.5C10.5 10.3284 9.82843 11 9 11C8.17157 11 7.5 10.3284 7.5 9.5C7.5 8.67157 8.17157 8 9 8C9.82843 8 10.5 8.67157 10.5 9.5Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>{item}</p>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                        >
                            <path
                                d="M12 7.375V10.125C12 10.8844 11.3844 11.5 10.625 11.5H2.375C1.61561 11.5 1 10.8844 1 10.125V7.375M6.5 8.0625L3.75 5.3125M6.5 8.0625L9.25 5.3125M6.5 8.0625V0.5"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="community">
            <Slidebar />
            <div className="community-container">
                <div className="community-head">
                    <p>커뮤니티 보드</p>
                    <p>홈  커뮤니티 보드</p>
                </div>
                <div className="community-option">
                    {Listitems}
                </div>
            </div>
        </div>
    );
}

export default Community;
