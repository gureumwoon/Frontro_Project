// 검색 아이콘 누르면 페이지 이동
const goToSearchPage = document.querySelector('.header > button');

goToSearchPage.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

// 사용자 닉네임 누르면 해당 사용자의 프로필로 이동
// 현재 모두 your_profile로 이동함 
const goOtherProfile = document.querySelectorAll(".tit-post");
for (const userName of goOtherProfile) {
    userName.addEventListener('click', function() {
        window.location.href = "your_profile.html";
    })
}
console.log(goOtherProfile);

// 하트 누르면 빨간 하트로 변경 
const likeButton = document.querySelectorAll(".btn-like");

console.log(likeButton);


// 댓글 아이콘 누르면 해당 게시물 댓글창으로 이동
// 현재는 post.html로 이동 
const goPostPage = document.querySelectorAll(".btn-comment")
for (const comment of goPostPage) {
    comment.addEventListener('click',() => {
        window.location.href = "post.html";
    })
}
console.log(goPostPage);

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
