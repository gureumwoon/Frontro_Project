// 검색 아이콘 누르면 페이지 이동
const goToSearchPage = document.querySelector('.header > button');

goToSearchPage.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

// 사용자 닉네임 누르면 해당 사용자의 프로필로 이동
// 현재 모두 your_profile로 이동함 
// API 받아서 각 사용자의 profile로 이동하게 만들기
const goOtherProfile = document.querySelectorAll(".tit-post");
for (const userName of goOtherProfile) {
    userName.addEventListener('click', function() {
        window.location.href = "your_profile.html";
    })
}
console.log(goOtherProfile);

// API 받아서 
// 하트 누르면 빨간 하트로 변경 
const likeButton = document.querySelectorAll(".btn-like");

console.log(likeButton);

// API 받아서 
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
// 피드에 게시글 받아오기 
    // 1. 컨테이너 화면그려주기(데이터가 필요없는것만)
    // 2. 데이터를 받아온다 (피드데이터)
    // 3. 받아온 데이터를 이쁘게 그려준다.
const container = document.querySelector('.main');
console.log(container);
console.log(localStorage.getItem("Token")) //브라우저 저장된 토큰 
if(localStorage.getItem("Token")){
    getFeed()
}
else{
    // location.href = './login.html'
}
console.log(localStorage.getItem("Token"))  //요거는 로컬스토리지에 값잘 있나 확인.

async function getFeed() {
    const url = "http://146.56.183.55:5050"
    // const token = localStorage.getItem("Token")
    // 임시로 토큰 복붙해서 가져옴 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzMyMDQ3OSwiaWF0IjoxNjQyMTM2NDc5fQ.3ytVLwSAXEBRIxEl-y-4HX0KVo3fDV3cNGryBYALTEU"

    const res = await fetch(url+"/post/feed",{
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()
    const posts = json.posts
    //forEach문으로 받아온 데이터 전부 살펴보면서 그려주는 부분
    posts.forEach(post => {
        console.log(post);
        const authorImage = post.author.image
        const authorAccount = post.author.accountname
        const authorName = post.author.username
        const commentCount = post.commentCount
        const content = post.content
        const heartCount = post.heartCount
        const hearted = post.hearted
        const contentImage = post.image 

        // 이미지 3장일 때 이미지 리스트 
        //  글만 있는 이미지 있는 경우 

        document.querySelector(".main").innerHTML+=`
    <article class="post">
    <img class="profile-pic" src="${authorImage}" alt="${authorName}님의 프로필 사진">

    <div class="cont-following">
        <div class="profile">
            <p class="tit-post">${authorName}</p>
            <p class="id font-gray">${authorAccount}</p>
        </div>
        <p class="desc">
            ${content}
        </p>

        <img class="picture" src="${contentImage}" alt="" >


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
            <p class="date font-gray">${post.createdAt.slice(0,10)}</p>
        </div>
        <!-- 마크업 구조상 더보기 버튼 아래에 위치 -->
        <div class="div-icon">
            <button type="button" class="btn-icon-more btn-nonebackground">
                <img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">
            </button>
        </div>
</article>  
          
        `
    });
}
getFeed()