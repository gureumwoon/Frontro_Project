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
// 사용자 닉네임 누르면 해당 사용자의 프로필로 이동
// 현재 모두 your_profile로 이동함 
// API 받아서 각 사용자의 profile로 이동하게 만들기
// const goOtherProfile = document.querySelectorAll(".tit-post");
// console.log(goOtherProfile);
// for (const userName of goOtherProfile) {
//     userName.addEventListener('click', function () {
//         window.location.href = "your_profile.html";
//     })
// }
// console.log(goOtherProfile);

// API 받아서 
// 하트 누르면 빨간 하트로 변경 
// const likeButton = document.querySelectorAll(".btn-like");

// console.log(likeButton);

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
// console.log(localStorage.getItem("Token")) //브라우저 저장된 토큰 
if (localStorage.getItem("Token")) {
    getFeed()
}
else {
    location.href = './login.html'
}
// console.log(localStorage.getItem("Token"))  //요거는 로컬스토리지에 값잘 있나 확인.

async function getFeed() {
    const url = "http://146.56.183.55:5050"
    const token = localStorage.getItem("Token")
    // console.log(token)

    const res = await fetch(url + "/post/feed", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }
    })
    const json = await res.json()
    // console.log(json);

    //forEach문으로 받아온 데이터 전부 살펴보면서 그려주는 부분

    // const authorImage = post.author.image
    // const authorAccount = post.author.accountname
    // const authorName = post.author.username
    // const commentCount = post.commentCount
    // const content = post.content
    // const heartCount = post.heartCount
    // const hearted = post.hearted
    // const contentImage = post.image

    // 이미지 3장일 때 이미지 리스트
    //  글만 있는 이미지 있는 경우

    const posts = json.posts

    const btnHeartList = [];

    // 팔로우가 없는 경우 
    if (posts.length == 0) {
        container.innerHTML += `
                <div class="main-icon">
                    <img src="./src/svg/logo-Grey.svg" alt="" class="img-slime">
                    <p class="p-intro">유저를 검색해 팔로우 해보세요!</p>
                    <button class="btn-search">검색하기</button>
                </div>
        `
    } else {
        posts.forEach(post => {
            // console.log('post');
            const authorImage = post.author.image;
            const id = post.author._id;
            const authorAccount = post.author.accountname;
            const authorName = post.author.username;
            const commentCount = post.commentCount;
            const content = post.content;
            // const heartCount = post.heartCount;
            // const hearted = post.hearted;
            const updateDate = "" + post.updatedAt;
            const contentImage = post.image.split(',');

            // 이미지 슬라이더 구현 
            let imageHTML = '';
            if (contentImage.length === 1 && contentImage[0]) {
                imageHTML = `<img src="${contentImage[0]}" alt="post-image" class="article-post__img">`
            } else if (contentImage.length > 1) {
                const arr = [];
                contentImage.forEach(image => {
                    arr.push(`<img src="${image}" alt="post-image" class="article-post__img--slide">`)
                });
                imageHTML = `<ul class="article-post__img-list">${arr.join('')}</ul>`;
            }

            // 좋아요 버튼 생성하기 
            const btnHeartHTML = document.createElement("button");
            // console.log(btnHeartHTML)
            btnHeartHTML.className += 'button-like btn-nonebackground'
            btnHeartHTML.innerHTML = `
                <img src="./src/png/${
                    post.hearted ? "icon-heart-active.png" : "icon-heart.png"
                }" alt="">
                <strong class="count-heart">${post.heartCount}</strong>
                `;
                btnHeartHTML.addEventListener("click", () => {
                    const token = localStorage.getItem("Token");

                    if(post.hearted) {
                        post.hearted = false;
                        post.heartCount -= 1;
                        post.image = "./src/png/icon-heart.png";
                        postHeartReq(
                            "delete",
                            "unheart",
                            btnHeartHTML,
                            post.id,
                            post.heartCount,
                            post.image
                        );
                    } else {
                        post.hearted = true;
                        post.heartCount += 1;
                        post.image = "./src/png/icon-heart-active.png";
                        postHeartReq(
                            "post",
                            "heart",
                            btnHeartHTML,
                            post.id,
                            post.heartCount,
                            post.image
                        );
                    }
                });
                
            btnHeartList.push(btnHeartHTML);
            
            document.querySelector(".main").innerHTML += `
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
                                    <div class="icon-box-heart">

                                    </div>
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

            // 더보기 버튼 클릭시 모달창 뜨기 
            const btnMore = document.querySelectorAll(".btn-icon-more");
            for (const modal of btnMore) {
                modal.addEventListener('click', () => {
                    backgroundUpModal.style.display = "block";
                    upModal.style.bottom = "0";
                })
            };
        });

        // forEach문 바깥 부분 

        // 해당 포스트 상세 게시물 댓글 페이지로 이동
        const goPostPage = document.querySelectorAll(".btn-comment")
        for (const [idx, comment] of goPostPage.entries()) {
            comment.addEventListener('click', () => {
                window.location.href = `post.html?id=${posts[idx].id}`;
            })
        }

        const goPostPage2 = document.querySelectorAll(".article-post__img")
        console.log(goPostPage2)
        for (const [idx, comment] of goPostPage2.entries()) {
            comment.addEventListener('click', () => {
                window.location.href = `post.html?id=${posts[idx].id}`;
            })
        }

        // 3. forEach문 밖에서 getFeed() 함수 안에 리스트에 담아둔 버튼들을 DOM에 연결시켜주기
        // innerhtml에 icon-box 만들어서 넣어주는거임 
        const contentBtnContList = document.querySelectorAll(".icon-box-heart");
        // console.log(contentBtnContList);
        Array.from(contentBtnContList).forEach((contentBtnCont, index) => {
            contentBtnCont.appendChild(btnHeartList[index]);
        });
    }
}
// 년일월 날짜 변환 함수
function makeKoreaDate(date) {
    const koreaDate = date.split("-").map((value) => parseInt(value));
    return `${koreaDate[0]}년 ${koreaDate[1]}월 ${koreaDate[2]}일`;
}

// heart api 요청을 해주는 함수
async function postHeartReq(method, postType, dom, id, count, img) {
    const heartCountDom = dom.querySelector("strong");
    const heartImgDom = dom.querySelector("img");
    const token = localStorage.getItem("Token");
    const url = "http://146.56.183.55:5050"

    const res = await fetch(url + "/post/" + id + "/" + postType, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
    });
    const json = await res.json();

    if (res.ok) {
        heartCountDom.innerText = count;
        heartImgDom.src = img;
    } else {
        window.alert("요청에 실패했습니다.");
    }
}
