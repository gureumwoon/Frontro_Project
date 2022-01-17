// 검색 아이콘 누르면 페이지 이동
const goToSearchPage = document.querySelector('.header > button');
goToSearchPage.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

// 사용자 닉네임 누르면 해당 사용자의 프로필로 이동
// 현재 모두 your_profile로 이동함 
// API 받아서 각 사용자의 profile로 이동하게 만들기
const goOtherProfile = document.querySelectorAll(".tit-post");
// console.log(goOtherProfile);
for (const userName of goOtherProfile) {
    userName.addEventListener('click', function() {
        window.location.href = "your_profile.html";
    })
}

// API 받아서 
// 하트 누르면 빨간 하트로 변경 
// const likeButton = document.querySelectorAll(".btn-like");

// console.log(likeButton);

// API 받아서 댓글 아이콘 누르면 해당 게시물 댓글창으로 이동
// 현재는 post.html로 이동 
const goPostPage = document.querySelectorAll(".btn-comment")
for (const comment of goPostPage) {
    comment.addEventListener('click',() => {
        window.location.href = "post.html";
    })
}
// console.log(goPostPage);

// footer 페이지이동
const goToReload = document.querySelector('.icon-item-list > li:first-child');
console.log(goToReload);
const goToChat = document.querySelector('.icon-item-list > li:nth-child(2)');
console.log(goToChat);
const goUpload = document.querySelector('.icon-item-list > li:nth-child(3)');
console.log(goUpload);
const goMyProfile = document.querySelector('.icon-item-list > li:last-child');
console.log(goMyProfile);

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

// 원범님 코드 
const container = document.querySelector('.main');
// console.log(container);
console.log(localStorage.getItem("Token")) //브라우저 저장된 토큰 
if(localStorage.getItem("Token")){
    getFeed()
}
else{
    location.href = './login.html'
}
console.log(localStorage.getItem("Token"))  //요거는 로컬스토리지에 값잘 있나 확인.

async function getFeed() {
    const url = "http://146.56.183.55:5050"
    const token = localStorage.getItem("Token")
    console.log(token)

    // 임시로 토큰 복붙해서 가져옴 
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGZiMDRjY2I0YjMzMTZkYzI2ODYxNCIsImV4cCI6MTY0NzQyNTE0OSwiaWF0IjoxNjQyMjQxMTQ5fQ.jM2G-i8kaRwU4tuyB3qtBlWMxhd9hhLjYW9VsXGREVA"
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzMyMDQ3OSwiaWF0IjoxNjQyMTM2NDc5fQ.3ytVLwSAXEBRIxEl-y-4HX0KVo3fDV3cNGryBYALTEU"

    const res = await fetch(url+"/post/feed",{
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()
    console.log(json); //응답에 대한 결과

    const posts = json.posts

    // 팔로우가 없는 경우 
    if (posts.length == 0) {
        container.innerHTML +=`
        <div class="main-icon">
        <img src="./src/svg/logo-Grey.svg" alt="" class="img-slime">
        <p class="p-intro">유저를 검색해 팔로우 해보세요!</p>
        <button class="btn-search">검색하기</button>
        </div>
        `
    }else {
    posts.forEach(post => {
        // console.log(post);
        const authorImage = post.author.image;
        const id = post.author._id;
        const authorAccount = post.author.accountname;
        const authorName = post.author.username;
        const commentCount = post.commentCount;
        const content = post.content;
        const heartCount = post.heartCount;
        const hearted = post.hearted;
        const updateDate = "" + post.updatedAt;
        const contentImage = post.image.split(',');

        let imageHTML = '';
        if(contentImage.length === 1 && contentImage[0]) {
            imageHTML = `<img src="${contentImage[0]}" alt="post-image" class="article-post__img">`
        } else if (contentImage.length>1) {
            const arr = [];
            contentImage.forEach(image => {
                arr.push(`<img src="${image}" alt="post-image" class="article-post__img--slide">`)
            });
            imageHTML = `<ul class="article-post__img-list">${arr.join('')}</ul>`;
        }

        document.querySelector(".main").innerHTML+=`
        <article class="post">
        <img src="${authorImage}" alt="${authorName}님의 프로필 사진" class="profile-pic" >
        <div class="cont-following">
            <div class="profile">
                <p class="tit-post">${authorName}</p>
                <p class="id font-gray">${authorAccount}</p>
            </div>
            <p class="desc">${content}</p>
            ${imageHTML}
            <div class="icon-box font-gray">
                <button type="button" class="btn btn-like btn-nonebackground">
                    <img src="./src/png/${
                        hearted
                            ? "icon-heart-active.png"
                            : "icon-heart.png"
                    }" alt="">
                </button>
                <span class="count count-heart">${heartCount}</span>


                <button type="button" class="btn btn-comment btn-nonebackground">
                    <img src="./src/svg/message-circle.svg">
                </button>
                <span class="count count-comment">${commentCount}</span>
                </div>
                <p class="date font-gray">${makeKoreaDate(post.updatedAt)}</p>
            </div>
            <div class="div-icon">
                <button type="button" class="btn-icon-more btn-nonebackground">
                    <img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">
                </button>
            </div>
        </article>  
            `
        });
    }
}
getFeed()

// - 년일월 날짜 변환 함수
function makeKoreaDate(date) {
    const koreaDate = date.split("-").map((value) => parseInt(value));
    return `${koreaDate[0]}년 ${koreaDate[1]}월 ${koreaDate[2]}일`;
}
