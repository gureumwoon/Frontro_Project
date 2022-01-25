// 구현 사항.
// [] 나가기 기능
// [△] 더보기 기능_나가기 기능 붙이기
// [] 채팅 정보 불러오기
// [] 입력이 있으면 전송 버튼 색상 활성화
// [] 전송 버튼 시 api 요청을 통해서 서버에 내용 전송하고 전송된 내용 ui에 반영하기, 기존 input.text 지우기
// [△] 사진 올리기 기능 구현하기, 올리면 올라갈 사진 카카오톡 처럼 띄워주기
// [] 채팅방 하단 고정
// [] 무한 스크롤

// 나중에 추가 구현 사항
// 다중 파일 선택 시스템 만들기
//

// console.log(history.length);

// - top-bar, 헤더 바 -
// - 관련 변수들
const btnBack = document.querySelector(".button-back");
const btnMore = document.querySelector(".button-more");
const backgroundUpModal = document.querySelector(".background_up-modal");
const upModal = document.querySelector(".up-modal");
const ExitBtn_up = document.querySelector(".item-modal");
const backgroundPopupModal = document.querySelector(".background_popup-modal");
const popupModal = document.querySelector(".popup-modal");
const cancelBtn_popup = document.querySelector(".cancel-button_popup");
const logoutBtn_popup = document.querySelector(".action-button_popup");

// - 뒤로가기 버튼
btnBack.addEventListener("click", () => {
    history.back();
});

// - 더보기 버튼 & up modal, 위로 올라오는 모달
btnMore.addEventListener("click", () => {
    backgroundUpModal.style.display = "block";
    upModal.style.bottom = "0";
});
backgroundUpModal.addEventListener("click", () => {
    backgroundUpModal.style.display = "none";
    upModal.style.bottom = "-20rem";
});

// - popup modal, 띄워지는 모달
ExitBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
});
cancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
});

// - 채팅방 이름 넣어주기
const params = new URLSearchParams(location.search);
console.log(params);
const roomName = params.get("name");

const headerTitle = document.createElement("p");
headerTitle.classList.add("bar-title");
headerTitle.innerText = roomName;
btnBack.after(headerTitle);

// - cont-chat, 채팅방 내용 -
// - 관련 변수
const chatCont = document.querySelector(".cont_chat");
// - scorll to bottom
// - 채팅방 입장 시 스크롤 제일 밑에 부분 보여주기
chatCont.scrollTop = chatCont.scrollHeight;

// - cont_chat-input -
// - 관련 변수
// const chatInputCont = document.querySelector(".cont_chat-input");
const inputFile = document.querySelector("#file");
const inputImageBtn = document.querySelector(".button_chat-image-input");
const inputText = document.querySelector("#text_input");
const chatSubmitBtn = document.querySelector(".submit-button_input");

// - upload image
inputImageBtn.addEventListener("click", () => {
    inputFile.click();
});

// make active submit-button_스로틀이나 드리븐 적절한 것 찾아서 적용해보기
function changeBtnColor(event) {
    console.log(inputText.value);
    if (inputText.value) {
        chatSubmitBtn.style.color = "#ffc022";
    } else {
        chatSubmitBtn.style.color = "#c4c4c4";
    }
}
inputText.addEventListener("keyup", changeBtnColor);

// - submit text & image

// - 공용으로 쓰이는 코드 -
// - fetch를 쉽게 쓸 수 있게 해주는 함수
async function myFetch(url, method, auth = "", data = "") {
    const responseData = await fetch(url, {
        // localStorge에서 token 가져오는 코드 추가 필요_원범님 코드 참고        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth ? `Bearer ${auth}` : "",
        },
        body:
            method === "get" || method === "delete"
                ? null
                : data
                ? JSON.stringify(data)
                : "",
    });
    return responseData;
}
