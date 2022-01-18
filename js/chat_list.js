const AUTH =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzUwNzQ5MSwiaWF0IjoxNjQyMzIzNDkxfQ.IpERmWzo8--G6k-6pBBj5FUtxRJD1UqY_CNFIGc35zQ";
const BASE_URL = "http://146.56.183.55:5050";
const ACCOUNT_MYNAME = "hey_binky";
const MYID = "61ca638ab5c6cd18084e447d";
const ACCOUNT_NAME = "halo_halo";

// - top-bar, 헤더 바 -
// - 관련 변수들
const btnBack = document.querySelector(".button-back");
const btnMore = document.querySelector(".button-more");
const backgroundUpModal = document.querySelector(".background_up-modal");
const upModal = document.querySelector(".up-modal");
const postItemList = document.querySelectorAll(".item-modal");
const logoutBtn_up = Array.from(postItemList).find(
    (item) => item.innerText === "로그아웃"
); // ※ find를 쓰기 위해선 nodeList > Array 변환 이 필요
const backgroundPopupModal = document.querySelector(".background_popup-modal");
const popupModal = document.querySelector(".popup-modal");
const cancelBtn_popup = document.querySelector(".cancel-button_popup");
const logoutBtn_popup = document.querySelector(".action-button_popup");

// - 뒤로가기 버튼
btnBack.addEventListener("click", () => {
    // 채팅방 뒤로가기 작성하고 작성팀원분들과 얘기하고 작성하기
    // location.href("");
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
logoutBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
});
cancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
});

// - chat_list, 채팅방 리스트 -
// - 관련 변수
const chatRoomItem = document.querySelectorAll(".item_chat-room");

Array.from(chatRoomItem).forEach((room) => {
    const roomName = room.querySelector(".user-name_chat-room").innerText;
    room.addEventListener("click", () => {
        location.href = `./chat_room.html?name=${roomName}`;
    });
});

// - nav bar, 하단 탭 페이지이동 -
const goToHome = document.querySelector(".tap-menu-home");
console.log(goToHome);
const goToChat = document.querySelector(".tap-menu-chat");
console.log(goToChat);
const goUpload = document.querySelector(".tap-menu-upload");
console.log(goUpload);
const goMyProfile = document.querySelector(".tap-menu-user");
console.log(goMyProfile);

goToHome.addEventListener("click", () => {
    window.location.href = "index.html";
});
goToChat.addEventListener("click", () => {
    window.location.href = "chat_list.html";
});
goUpload.addEventListener("click", () => {
    window.location.href = "upload.html";
});
goMyProfile.addEventListener("click", () => {
    window.location.href = "my_profile.html";
});

// chatRoomItem.addEventListener("click", () => {
//     location.href = `/chat_room.html?name=할로할로`;
// });
