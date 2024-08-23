export default function FlowShareModal () {
    const lists = ['방장','편집자','편집자','보기 전용']
    return <div className="profile-modal-background">
        <div className="profile-modal">
            <     div className="profile-modal-first-content">
                <div>
                    <h3>아이디어 보드 공유하기</h3>
                    <span className="close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                         fill="none">
                                        <path d="M4.16675 4.16669L15.8334 15.8334M15.8334 4.16669L4.16675 15.8334"
                                              stroke="#686B6E" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                    </svg>
                                </span>
                </div>
                <p>보드를 다른 사용자와 함께 사용보세요!</p>
            </div>
            <div className="profile-modal-second-content">
                <div className="profile-modal-second-content-left">
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" rx="12" fill="white"/>
                            </svg>
                            <p>사용자 1</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                 viewBox="0 0 8 8"
                                 fill="none">
                                <path
                                    d="M1.66675 1.66669L6.33341 6.33335M6.33341 1.66669L1.66675 6.33335"
                                    stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" rx="12" fill="white"/>
                            </svg>
                            <p>사용자 2</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                 viewBox="0 0 8 8"
                                 fill="none">
                                <path
                                    d="M1.66675 1.66669L6.33341 6.33335M6.33341 1.66669L1.66675 6.33335"
                                    stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div className="profile-modal-second-content-left-Trailtext">
                        <p>편집자</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                             viewBox="0 0 12 12"
                             fill="none">
                            <path
                                d="M9 5L6.35355 7.64645C6.15829 7.84171 5.84171 7.84171 5.64645 7.64645L3 5"
                                stroke="#F08080" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <button className="profile-modal-second-content-right">
                    <p>Invite</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none">
                        <path
                            d="M9.73084 14.2692L19.2337 4.76642M5.48664 7.99807L17.1349 4.11532C18.8344 3.54883 20.4512 5.16564 19.8847 6.8651L16.0019 18.5134C15.3895 20.3507 12.8613 20.5304 11.9952 18.7981L10.0548 14.9174C9.84447 14.4967 9.50334 14.1555 9.08263 13.9452L5.20188 12.0048C3.46962 11.1387 3.64929 8.61052 5.48664 7.99807Z"
                            stroke="#0C1132" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className="profile-modal-third-content">
                {lists.map((item) => {
                    return (
                        <div className="profile-modal-third-content-list">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                     viewBox="0 0 48 48"
                                     fill="none">
                                    <rect width="48" height="48" rx="20" fill="white"/>
                                </svg>
                                <div>
                                    <p>사용자 1</p>
                                    <p>24sunrin103@sunrint.hs.kr</p>
                                </div>
                            </div>
                            <div>
                                <p>{item}</p>
                            </div>
                        </div>
                    )
                })}
                <button className="profile-modal-third-content-more">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                         fill="none">
                        <path
                            d="M8 5.33333V8M8 8V10.6667M8 8H10.6667M8 8H5.33333M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                            stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>더보기</p>
                </button>
            </div>
            <div className="profile-modal-forth-content">
                <div className="profile-modal-forth-content-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none">
                        <path
                            d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
                            stroke="#F08080" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>링크 공유하기</p>
                </div>
                <div
                    style={
                        {
                            width: "1px",
                            height: "88px",
                            background: "#1A1D21"
                        }
                    }
                ></div>
                <button className="profile-modal-forth-content-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                         fill="none">
                        <path
                            d="M6 10L10 6.00004M9.54475 11.4847L8.48409 12.5454V12.5454C7.31252 13.717 5.41302 13.717 4.24145 12.5454L3.63604 11.94C2.46447 10.7684 2.46447 8.86891 3.63604 7.69734V7.69734L4.6967 6.63668M11.6661 9.36341L12.7267 8.30275V8.30275C13.8983 7.13117 13.8983 5.23168 12.7267 4.06011L12.1213 3.45469C10.9497 2.28312 9.05025 2.28312 7.87868 3.45469V3.45469L6.81802 4.51535"
                            stroke="#9B9C9E" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                    <p>링크 복사하기</p>
                </button>
            </div>
        </div>
    </div>
}