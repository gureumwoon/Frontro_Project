// 뒤로가기 아이콘 이전 페이지로 이동
const iconBack = document.querySelector('.box-search > img');
console.log(iconBack);

iconBack.addEventListener('click', () => {
    // window.location.href = "home.html";
    history.back(); //이전페이지로 이동
})

// footer 페이지이동
const goToReload = document.querySelector('ul > li:first-child');
console.log(goToReload);
const goToChat = document.querySelector('ul > li:nth-child(2)');
console.log(goToChat);
const goUpload = document.querySelector('ul > li:nth-child(3)');
console.log(goUpload);
const goMyProfile = document.querySelector('ul > li:last-child');
console.log(goMyProfile);

// footer 페이지 이동 기능
goToReload.addEventListener('click', () => {
    window.location.href = "index.html";
})
goToChat.addEventListener('click', () => {
    window.location.href = "chat_list.html";
})
goUpload.addEventListener('click', () => {
    window.location.href = "upload.html";
})
goMyProfile.addEventListener('click', () => {
    window.location.href = "my_profile.html";
})