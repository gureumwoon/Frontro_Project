// 검색 아이콘 누르면 페이지 이동
const goToSearchPage = document.querySelector('.header > button');
goToSearchPage.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

// 바탕누르면 업모달창 사라짐
const backgroundUpModal = document.querySelector(".hidden-menu");
const upModal = document.querySelector(".hidden-menu-list");

backgroundUpModal.addEventListener('click', () => {
    backgroundUpModal.style.display = "none";
    upModal.style.bottom = "-20rem";
})

// 팝업모달창 
const backgroundPopupModal = document.querySelector(".alert-modal");
const popupModal = document.querySelector(".alert-modal-wrap");
const cancleBtn = document.querySelector(".cancle-btn");
const doBtn = document.querySelector(".do-btn");
const reportBtn = document.querySelector(".report-post")

reportBtn.addEventListener('click', () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
})

cancleBtn.addEventListener('click', () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
})

doBtn.addEventListener('click', () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
})


// footer 페이지이동
const goToReload = document.querySelector('.icon-item-list > li:first-child');
const goToChat = document.querySelector('.icon-item-list > li:nth-child(2)');
const goUpload = document.querySelector('.icon-item-list > li:nth-child(3)');
const goMyProfile = document.querySelector('.icon-item-list > li:last-child');
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
    // console.log(token)

    const res = await fetch(url+"/post/feed",{
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()
    // console.log(json); //응답에 대한 결과

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
        // 이미지 슬라이더 구현 
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
                <button type="button" data-hearted="${hearted ? 1 : 0}" data-id="${id}" class="btn btn-like btn-nonebackground">
                    <img src="./src/png/icon-heart.png" alt="post-like" class="article-heart__btn">
                </button>
                <span class="count count-heart">${heartCount}</span>
                <button type="button" class="btn btn-comment btn-nonebackground">
                    <img src="./src/svg/message-circle.svg">
                </button>
                <span class="count count-comment">${commentCount}</span>
                </div>
                <p class="date font-gray">${makeKoreaDate(updateDate)}</p>
            </div>
            <div class="div-icon">
                <button type="button" class="btn-icon-more btn-nonebackground">
                    <img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">
                </button>
            </div>
        </article>  
            `
            // 사용자 이름 눌렀을 때 해당하는 your_profile 로 이동 
            const titPost = document.querySelectorAll(".tit-post");
            for (const i of titPost) {
                i.addEventListener('click', () => {
                    window.location.href = `your_profile.html?accountName=${authorAccount}`;
                })
            }

            // 하트 버튼 클릭하면 노란 하트로 변경 
            const yellowHeart = document.querySelectorAll(".article-heart__btn");
            for (const heart of yellowHeart) {
                heart.addEventListener('click', () => {
                    heart.src="./src/png/icon-heart-active.png"
                })
            }

            // 더보기 버튼 클릭시 모달창 뜨기 
            const btnMore = document.querySelectorAll(".btn-icon-more");
            for (const modal of btnMore) {
                modal.addEventListener('click', () => {
                    backgroundUpModal.style.display = "block";
                    upModal.style.bottom = "0";
                })
            }
        });
        // 해당 포스트 상세 게시물 댓글 페이지로 이동
        const goPostPage = document.querySelectorAll(".btn-comment")
        for (const [idx, comment] of goPostPage.entries()) {
            comment.addEventListener('click', () => {
                window.location.href = `post.html?id=${posts[idx].id}`;
            })
        }
    }
}
getFeed()

// - 년일월 날짜 변환 함수
function makeKoreaDate(date) {
    const koreaDate = date.split("-").map((value) => parseInt(value));
    return `${koreaDate[0]}년 ${koreaDate[1]}월 ${koreaDate[2]}일`;
}