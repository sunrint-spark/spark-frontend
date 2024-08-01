import Header from "@/components/header.tsx";
import "../styles/ideaboard.css"
import {useModal} from "../modal/ModalContext.tsx";

function Ideaboard(){
    const { isModalOpen1, closeModal1, isModalOpen2, closeModal2 } = useModal();

    console.log('isModalOpen1:', isModalOpen1);
    console.log('isModalOpen2:', isModalOpen2);

    return(
        <div className="ideaboard">
            {Header()}
            <div className="ideaboard-footer">
                    <div className="ideaboard-footer-container">
                        <div className="ideaboard-first-content">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M7.44719 12.5529L18.1379 1.86222M2.67246 5.49783L15.7768 1.12973C17.6887 0.492434 19.5076 2.31134 18.8703 4.22323L14.5022 17.3275C13.8132 19.3946 10.969 19.5967 9.9946 17.6479L7.81168 13.282C7.57503 12.8087 7.19126 12.425 6.71796 12.1883L2.35212 10.0054C0.403321 9.031 0.605451 6.18684 2.67246 5.49783Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                                        stroke="#F08080" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="ideaboard-second-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 192 74"
                                 fill="none">
                                <mask id="path-1-inside-1_195_3175" fill="white">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M4.57046 13.1529C1.81926 13.3903 -0.218586 15.813 0.0188043 18.5642L4.80214 74H163.389L157.434 4.98147C157.197 2.23027 154.774 0.192425 152.023 0.429815L4.57046 13.1529Z"/>
                                </mask>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M4.57046 13.1529C1.81926 13.3903 -0.218586 15.813 0.0188043 18.5642L4.80214 74H163.389L157.434 4.98147C157.197 2.23027 154.774 0.192425 152.023 0.429815L4.57046 13.1529Z"
                                      fill="#F08080"/>
                                <path
                                    d="M0.0188043 18.5642L1.0151 18.4782L0.0188043 18.5642ZM4.57046 13.1529L4.65643 14.1492L4.57046 13.1529ZM4.80214 74L3.80584 74.0859L3.88471 75H4.80214V74ZM163.389 74V75H164.479L164.386 73.914L163.389 74ZM157.434 4.98147L158.43 4.8955V4.8955L157.434 4.98147ZM152.023 0.429815L151.937 -0.566483L152.023 0.429815ZM1.0151 18.4782C0.82519 16.2773 2.45547 14.3391 4.65643 14.1492L4.48449 12.1566C1.18305 12.4415 -1.26236 15.3487 -0.977494 18.6502L1.0151 18.4782ZM5.79844 73.914L1.0151 18.4782L-0.977494 18.6502L3.80584 74.0859L5.79844 73.914ZM4.80214 75H163.389V73H4.80214V75ZM156.438 5.06744L162.393 74.0859L164.386 73.914L158.43 4.8955L156.438 5.06744ZM152.109 1.42611C154.309 1.2362 156.248 2.86648 156.438 5.06744L158.43 4.8955C158.145 1.59406 155.238 -0.851351 151.937 -0.566483L152.109 1.42611ZM4.65643 14.1492L152.109 1.42611L151.937 -0.566483L4.48449 12.1566L4.65643 14.1492Z"
                                    fill="black" mask="url(#path-1-inside-1_195_3175)"/>
                                <mask id="path-3-inside-2_195_3175" fill="white">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M64.9534 20.7767C62.2636 20.1517 59.5765 21.8255 58.9514 24.5153L47.4529 73.9999H187.076L191.422 55.297C192.047 52.6073 190.373 49.9201 187.684 49.2951L64.9534 20.7767Z"/>
                                </mask>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M64.9534 20.7767C62.2636 20.1517 59.5765 21.8255 58.9514 24.5153L47.4529 73.9999H187.076L191.422 55.297C192.047 52.6073 190.373 49.9201 187.684 49.2951L64.9534 20.7767Z"
                                      fill="#F08080"/>
                                <path
                                    d="M58.9514 24.5153L57.9774 24.289L58.9514 24.5153ZM64.9534 20.7767L65.1797 19.8027L64.9534 20.7767ZM47.4529 73.9999L46.4788 73.7736L46.1939 74.9999H47.4529V73.9999ZM187.076 73.9999V74.9999H187.87L188.05 74.2263L187.076 73.9999ZM191.422 55.297L190.448 55.0707L191.422 55.297ZM187.684 49.2951L187.91 48.3211L187.684 49.2951ZM59.9255 24.7416C60.4255 22.5898 62.5752 21.2508 64.727 21.7508L65.1797 19.8027C61.952 19.0527 58.7274 21.0613 57.9774 24.289L59.9255 24.7416ZM48.4269 74.2263L59.9255 24.7416L57.9774 24.289L46.4788 73.7736L48.4269 74.2263ZM47.4529 74.9999H187.076V72.9999H47.4529V74.9999ZM190.448 55.0707L186.102 73.7736L188.05 74.2263L192.396 55.5234L190.448 55.0707ZM187.457 50.2692C189.609 50.7692 190.948 52.9189 190.448 55.0707L192.396 55.5234C193.146 52.2957 191.138 49.0711 187.91 48.3211L187.457 50.2692ZM64.727 21.7508L187.457 50.2692L187.91 48.3211L65.1797 19.8027L64.727 21.7508Z"
                                    fill="black" mask="url(#path-3-inside-2_195_3175)"/>
                            </svg>
                        </div>
                        <div className="ideaboard-third-content">
                            <div>
                                <input></input>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 17 16"
                                     fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M1.88635 8.00004C1.88635 4.31814 4.87112 1.33337 8.55302 1.33337C12.2349 1.33337 15.2197 4.31814 15.2197 8.00004C15.2197 11.6819 12.2349 14.6667 8.55302 14.6667C4.87112 14.6667 1.88635 11.6819 1.88635 8.00004ZM8.55302 4.66671C8.18483 4.66671 7.88635 4.96518 7.88635 5.33337C7.88635 5.70156 8.18483 6.00004 8.55302 6.00004H8.55969C8.92788 6.00004 9.22635 5.70156 9.22635 5.33337C9.22635 4.96518 8.92788 4.66671 8.55969 4.66671H8.55302ZM9.21969 8.00004C9.21969 7.63185 8.92121 7.33337 8.55302 7.33337C8.18483 7.33337 7.88635 7.63185 7.88635 8.00004V10.6667C7.88635 11.0349 8.18483 11.3334 8.55302 11.3334C8.92121 11.3334 9.21969 11.0349 9.21969 10.6667V8.00004Z"
                                          fill="#686B6E"/>
                                </svg>
                                <p>AI 질문 만들기</p>
                            </div>
                        </div>
                        <div className="ideaboard-forth-content">
                            <div className="ideaboard-forth-item1" id="텍스트 정리 해주는 api아이디">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 17 20"
                                     fill="none">
                                    <path
                                        d="M10.553 1H3.55298C2.44841 1 1.55298 1.89543 1.55298 3V17C1.55298 18.1046 2.44841 19 3.55298 19H13.553C14.6575 19 15.553 18.1046 15.553 17V6M10.553 1L15.553 6M10.553 1V5C10.553 5.55228 11.0007 6 11.553 6H15.553"
                                        stroke="#F08080" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <p>텍스트</p>
                                <p>정리</p>
                            </div>
                            <div className="ideaboard-forth-item2" id="문서 정리 해주는 api아이디">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 21 21"
                                     fill="none">
                                    <path
                                        d="M17.553 6H11.2029C10.8077 6 10.4495 5.76727 10.289 5.40614L9.44187 3.5M17.553 6V6C18.6575 6 19.553 6.89543 19.553 8V17.5C19.553 18.6046 18.6575 19.5 17.553 19.5H3.55298C2.44841 19.5 1.55298 18.6046 1.55298 17.5V3.5C1.55298 2.39543 2.44841 1.5 3.55298 1.5H7.90311C8.29829 1.5 8.65642 1.73273 8.81692 2.09386L9.44187 3.5M17.553 6V4.5C17.553 3.94772 17.1053 3.5 16.553 3.5H9.44187"
                                        stroke="#F08080" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <p>문서</p>
                                <p>정리</p>
                            </div>
                            <div className="ideaboard-forth-item3" id="이미지 목사 해주는 api아이디">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 19 19"
                                     fill="none">
                                    <path
                                        d="M17.553 11.5V15.5C17.553 16.6046 16.6575 17.5 15.553 17.5H3.55298C2.44841 17.5 1.55298 16.6046 1.55298 15.5V11.5M9.55298 12.5L5.55298 8.5M9.55298 12.5L13.553 8.5M9.55298 12.5V1.5"
                                        stroke="#F08080" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <p>이미지</p>
                                <p>복사</p>
                            </div>
                        </div>
                    </div>
                </div>
            {isModalOpen1 && (
                <div className="idea-modal">
                    <div className="modal-content">
                        <div className="idea-modal-first-content">
                            <span className="close" onClick={closeModal1}>&times;</span>
                            <h3>아이디어 보드 공유하기</h3>
                            <p>보드를 다른 사용자와 함께 사용보세요!!</p>
                        </div>
                        <div className="idea-modal-second-content">
                        </div>
                        <div className="idea-modal-third-content"></div>
                        <div className="idea-modal-forth-content"></div>
                        <div className="idea-modal-fifth-content"></div>
                    </div>
                </div>
            )}
            {/* 두 번째 모달 */}
            {isModalOpen2 && (
                <div className="profile-modal">
                    <div className="profile-modal-content">
                        <div className="profile-modal-first-content">
                            <span className="close" onClick={closeModal2}>&times;</span>
                            <h3>아이디어 보드 공유하기</h3>
                            <p>보드를 다른 사용자와 함께 사용보세요!</p>
                        </div>
                        <div className="profile-modal-second-content">
                        </div>
                        <div className="profile-modal-third-content"></div>
                        <div className="profile-modal-forth-content"></div>
                        <div className="profile-modal-fifth-content"></div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Ideaboard;