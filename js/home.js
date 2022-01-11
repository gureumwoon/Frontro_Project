const goToSearchPage = document.querySelector('.header > button');
const goToSearchPageBtn = document.querySelector('.main-icon > button');
// footer 페이지이동
const goToReload = document.querySelector('ul > li:first-child');
console.log(goToReload);

const goToChat = document.querySelector('ul > li:nth-child(2)');
console.log(goToChat);

const goUpload = document.querySelector('ul > li:nth-child(3)');
console.log(goUpload);

const goMyProfile = document.querySelector('ul > li:last-child');
console.log(goMyProfile);

// 색 칠해진 아이콘으로 바꾸기 
const toggleHome = document.querySelector('#home > #icon-home');
// console.log(toggleHome);


goToSearchPage.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

goToSearchPageBtn.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

// footer 페이지 이동 기능
goToReload.addEventListener('click', () => {
    window.location.reload();
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


// footer 클릭하면 색이 칠해진 아이콘으로 바뀌는 기능
// toggleHome.addEventListener('click', () => {
//     document.getElementById("ul > li:first-child").src="./src/svg/fill_home.svg";
// })


