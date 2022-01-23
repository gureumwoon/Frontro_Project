const BASE_URL = "http://146.56.183.55:5050";

checkLoginUser();

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
logoutBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
});
cancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
});

// - 로그 아웃 기능
logoutBtn_popup.addEventListener("click", () => {
    localStorage.removeItem("Token");
    // localStorage.removeItem("account");
    // localStorage.removeItem("user-profile");
    location.href = "login.html";
});

// - profile-info, 프로필 정보 -

// - 관련 변수
const profileCont = document.querySelector(".cont_profile");

const profileFollowers = document.querySelector(".number_followers");
const profileFollowings = document.querySelector(".number_followings");
const profileFollowersBtn = document.querySelector(".followers_profile");
const profileFollowingsBtn = document.querySelector(".followings_profile");
const profileImg = document
    .querySelector(".header_profile")
    .querySelector("img");
const profileName = document.querySelector(".name_profile");
const profileAccount = document.querySelector(".account_profile");
const profileIntro = document.querySelector(".explain_profile");
const profileMessageBtn = document.querySelector(".button-message");
const profileFollowBtn = document.querySelector(".S-button");

// - 프로필 데이터 fetch로 가져오기
getProfileData();

// - followers, followings 버튼 페이지 이동
profileFollowersBtn.addEventListener("click", () => {
    const accountName = getQueryValue("accountName");
    location.href = `follow.html?accountName=${accountName}&follow=follower`;
});
profileFollowingsBtn.addEventListener("click", () => {
    const accountName = getQueryValue("accountName");
    location.href = `follow.html?accountName=${accountName}&follow=following`;
});

// - 메세지 창으로 이동_얘는 수정 필요
profileMessageBtn.addEventListener("click", () => {
    // 추후 백엔드 개발 시
    // const accountname =
    // location.href = `chat_room.html?name=할로할로&accountname=halo_halo`;
    // const username = getQueryValue("name");
    location.href = `chat_room.html?name=할로할로`;
});

// - 팔로우 기능
profileFollowBtn.addEventListener("click", () => {
    if (profileFollowBtn.innerText === "언팔로우") {
        postUnfollowReq();
    } else {
        postFollowReq();
    }
});

// 프로필 데이터 가져오기
async function getProfileData() {
    try {
        // const myAccountName = localStorage.getItem("account");
        const accountName = getQueryValue("accountName");
        const myAccountName = localStorage.getItem("accountName");

        console.log(accountName);
        const token = localStorage.getItem("Token");

        const followingList = await getFollowingList(myAccountName);
        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}`,
            "get",
            token
        );
        let result = await res.json();
        result = result.profile;

        profileFollowers.innerText = result.followerCount;
        profileFollowings.innerText = result.followingCount;
        profileImg.src = result.image;
        profileName.innerText = result.username;
        profileAccount.innerText = `@ ${result.accountname}`;
        profileIntro.innerText = result.intro ? result.intro : "-";
        followingList.forEach((followingUser) => {
            console.log(followingUser["accountname"]);
            if (followingUser["accountname"] === accountName) {
                profileFollowBtn.innerText = "언팔로우";
                profileFollowBtn.classList.replace(
                    "S-button",
                    "S-Active-button"
                );
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// - 내가 follow 하는 사람 리스트 가져오기
async function getFollowingList(accountName) {
    try {
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/following?limit=300`,
            "get",
            token,
            null
        );
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// - 나를 follow 하는 사람 리스트 가져오기
async function getFollowerList(accountName) {
    try {
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/follower?limit=300`,
            "get",
            token,
            null
        );
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// - 팔로우하기
async function postFollowReq() {
    try {
        const accountName = getQueryValue("accountName");
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/follow`,
            "post",
            token,
            null
        );
        const result = await res.json();
        console.log(result);
        console.log(res.ok);
        if (res.ok) {
            profileFollowBtn.innerText = "언팔로우";
            profileFollowBtn.classList.replace("S-button", "S-Active-button");
            console.log(profileFollowers.innerText);
            profileFollowers.innerText = `${
                parseInt(profileFollowers.innerText) + 1
            }`;
        }
    } catch (error) {
        console.log(error);
    }
}

// - 언팔로우하기
async function postUnfollowReq() {
    try {
        const accountName = getQueryValue("accountName");

        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/unfollow`,
            "delete",
            token,
            null
        );
        const result = await res.json();
        console.log(result);
        console.log(res.ok);
        if (res.ok) {
            profileFollowBtn.innerText = "팔로우";
            profileFollowBtn.classList.replace("S-Active-button", "S-button");
            console.log(profileFollowers.innerText);
            profileFollowers.innerText = `${
                parseInt(profileFollowers.innerText) - 1
            }`;
        }
    } catch (error) {
        console.log(error);
    }
}

// - cont_on-sale -

// - 관련 변수
const onSaleList = document.querySelector(".ul_on-sale");
const onSaleFragment = document.createDocumentFragment();
createAndDrawOnSale();

async function createAndDrawOnSale() {
    const productList = await getOnSaleData();
    console.log(productList);

    // 등록된 게시물이 있을 경우만 리스트 보여주기
    if (productList.length > 0) {
        onSaleCont.style.display = "block";
    } else {
        return;
    }

    productList.forEach((product) => {
        // 가격에 ','를 달아주는 로직
        const price = makeMoneysComma(`${product.price}`);
        const productItem = document.createElement("li");
        productItem.className += "li_on-sale";
        productItem.addEventListener("click", () => {
            location.href = "#";
        });
        productItem.innerHTML = `
                    <article class="item_on-sale">
                        <img src="${product.itemImage}" alt="판매상품 ${product.itemName}의 이미지">
                        <p class="tit_item">
                            ${product.itemName}
                        </p>
                        <p class="price_item">
                            <strong>
                                ${price}
                            </strong>원
                        </p>
                    </article>`;
        onSaleFragment.appendChild(productItem);

        // 상품 노드 이벤트 등록
        productItem.addEventListener("click", () => {
            window.open(product.link);
        });
    });

    onSaleList.appendChild(onSaleFragment);
}

// - 유저 판매 상품 데이터를 가져와서 화면에 그려주기
async function getOnSaleData() {
    try {
        // const accountName = localStorage.getItem("accountName");
        const accountName = getQueryValue("accountName");
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/product/${accountName}`,
            "get",
            token,
            null
        );
        const result = await res.json();
        const productList = result.product;

        return productList;
    } catch (error) {
        console.log(error);
    }
}

// - cont_contents, 게시물 정보 -
// - 관련 변수
const contentsCont = document.querySelector(".cont_contents");
// - view-style 관련 변수
const viewStyleCont = document.querySelector(".cont_view-style");
const styleBtn = viewStyleCont.querySelectorAll("button");
const listStyleBtn = Array.from(styleBtn)[0];
const pictureStyleBtn = Array.from(styleBtn)[1];

// - contents 관련 변수
const userContentsCont = document.querySelector(".cont_user-contents");
const contentsList = document.querySelector(".ul_user-contents");
const contentsFragment = document.createDocumentFragment();
const pictureContentList = document.querySelector(".ul-picture_user-contents");
const pictureContentsFragment = document.createDocumentFragment();
// - content up modal 관련 변수
const contentUpModal = document.querySelector(".content");
const contentBtnList = document.querySelectorAll(".content .item-modal");
const contentReportBtn_up = contentBtnList[0];
// // - content popup modal 관련 변수
const contentPopupModal = document.querySelector(".popup-modal+.content");
const contentCancelBtn_popup = contentPopupModal.querySelector(
    ".cancel-button_popup"
);
const contentReportBtn_popup = contentPopupModal.querySelector(
    ".action-button_popup"
);
// - content.id를 담는 변수
let contentId;

// 삭제 버튼 클릭 시 삭제 모달 띄우기
contentReportBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    contentPopupModal.style.display = "block";
});
// 취소 버튼 클릭 시 모달관련 화면 다 안보임 처리
contentCancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    contentPopupModal.style.display = "none";
});

// - view-style change
// 이벤트 처리하는 경우와 ui처리에 관해서 생각해보지 않으니 일을 두번하게 된다..
listStyleBtn.addEventListener("click", () => {
    if (Array.from(listStyleBtn.classList).includes("off")) {
        if (Array.from(contentsCont.classList).includes("picture-style")) {
            contentsCont.classList.remove("picture-style");
            contentsList.style.display = "block";
            pictureContentList.style.display = "none";

            // list button 활성화
            listStyleBtn.classList.replace("off", "on");
            listStyleBtn.querySelector("img").src =
                "../src/png/icon-post-list-on.png";

            // picture button 비활성화
            pictureStyleBtn.classList.replace("on", "off");
            pictureStyleBtn.querySelector("img").src =
                "../src/png/icon-post-album-off.png";
        }
    }
});
pictureStyleBtn.addEventListener("click", () => {
    if (Array.from(pictureStyleBtn.classList).includes("off")) {
        contentsCont.classList.add("picture-style");
        contentsList.style.display = "none";
        pictureContentList.style.display = "flex";

        // list button 비활성화
        listStyleBtn.classList.replace("on", "off");
        listStyleBtn.querySelector("img").src =
            "../src/png/icon-post-list-off.png";

        // picture button 활성화
        pictureStyleBtn.classList.replace("off", "on");
        pictureStyleBtn.querySelector("img").src =
            "../src/png/icon-post-album-on.png";
    }
});

// - content DOM 요소 생성 및 화면 그리기
createAndDrawContent();

// - content DOM 요소 생성 및 화면 그리기
async function createAndDrawContent() {
    const contentsListData = await getContents();

    // 등록된 게시글이 없으면 게시글란 안보이게 처리하기
    if (contentsListData.length > 0) {
        contentsCont.style.display = "block";
    } else {
        return;
    }

    // DOM에 붙여줄 버튼들을 리스트로 관리 > filter나 find로 미리 작성할 수 있다? 뭐가 더 좋을까
    const btnMoreList = [];
    const btnHeartList = [];
    const btnCommentList = [];

    // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??, class나 생성자 함수로 각 게시물들을 바꿔주면 더 좋을 것 같다.
    for (let content of contentsListData) {
        const authorImage = await validateImage(
            content.author.image,
            "profile"
        );
        // const contentImage = await validateImage(content.image, "content");

        const imageArray = content.image.split(",");
        console.log(imageArray);
        let imageHTML = "";
        if (imageArray.length === 1 && imageArray[0]) {
            imageHTML = `<img src="${imageArray[0]}" alt="post-image" class="content-img_content-info">`;
        } else if (imageArray.length > 1) {
            const arr = [];
            imageArray.forEach((image) => {
                if (image) {
                    arr.push(
                        `<li><img src="${image}" alt="post-image" class="content-img_slide-item"></li>`
                    );
                }
            });
            imageHTML = `<ul class="content-img_slide">${arr.join("")}</ul>`;
        }

        // list형 content 보여주기
        const contentItem = document.createElement("li");
        contentItem.className += "li_user-contents";
        contentItem.innerHTML = `
        <article class="content_user-contents">
            <div class="content-header_user-contents">
                <img src="${authorImage}" alt="${
            content.author.username
        }님의 프로필 사진" class="img_content-info" />
                <p class="name_content-info">${content.author.username}</p>
                <p class="email_content-info">@ ${
                    content.author.accountname
                }</p>
            </div>
            <div class="desc_content-info">
                <p class="txt_content-info">${content.content}</p>
                ${
                    imageHTML
                        ? `<div class="cont_slide">
                    ${imageHTML}
                </div>`
                        : ""
                }
                <div class="cont_buttons">
                </div>
                <p class="date_content-info">${makeKoreaDate(
                    content.updatedAt
                )}</p>
            </div>
        </article>`;

        // picture-content 노드 생성
        if (imageArray.length >= 1) {
            imageArray.forEach((image) => {
                if (image) {
                    const pictureContentItem = document.createElement("img");
                    pictureContentItem.className += "content-img_content-info";
                    pictureContentItem.src = image;
                    pictureContentItem.alt = "post-image";
                    pictureContentsFragment.appendChild(pictureContentItem);
                }
            });
        }

        // forEach문 돌 때 마다 더보기, 좋아요, 댓글 버튼 생성
        // 더보기 버튼 노드 생성
        const btnMoreHTML = document.createElement("button");
        btnMoreHTML.className += "btn-more_content button-noneBackground";
        btnMoreHTML.innerHTML = `<img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">`;
        btnMoreHTML.addEventListener("click", () => {
            backgroundUpModal.style.display = "block";
            contentUpModal.style.bottom = "0";
            // 일회성 이벤트 등록(여러개의 콘텐츠가 하나의 업모달을 공유해서 이벤트를 달기 때문에 일회성 이벤트를 사용)
            // 상품 삭제 이벤트 등록
            contentReportBtn_popup.addEventListener("click", reportFuncWrapper);
        });

        // 좋아요 버튼 생성
        const btnHeartHTML = document.createElement("button");
        btnHeartHTML.className += "button-like button-noneBackground";
        btnHeartHTML.innerHTML = `
            <img src="./src/png/${
                content.hearted ? "icon-heart-active.png" : "icon-heart.png"
            }" alt="">
            <strong class="count-heart">${content.heartCount}</strong>
            `;
        btnHeartHTML.addEventListener("click", () => {
            const token = localStorage.getItem("Token");

            // 하트 활성화에 따라 처리를 다르게
            // case 1. 하트 활성화
            // - hearted true값 false 값으로 바꾸기
            // - countHeart값 -1
            // - img 변경
            // - 해당 게시물의 id로 post 요청

            // case 2. 하트 비활성화
            // - hearted false값 true 값으로 바꾸기
            // - countHeart값 +1
            // - img 변경
            // - 해당 게시물의 id로 post 요청

            if (content.hearted) {
                content.hearted = false;
                content.heartCount -= 1;
                content.image = "./src/png/icon-heart.png";
                postHeartReq(
                    "delete",
                    "unheart",
                    btnHeartHTML,
                    content.id,
                    content.heartCount,
                    content.image
                );
            } else {
                content.hearted = true;
                content.heartCount += 1;
                content.image = "./src/png/icon-heart-active.png";
                postHeartReq(
                    "post",
                    "heart",
                    btnHeartHTML,
                    content.id,
                    content.heartCount,
                    content.image
                );
            }
        });

        // 댓글 버튼 생성
        const btnCommentHTML = document.createElement("button");
        btnCommentHTML.className += "button-comment button-noneBackground";
        btnCommentHTML.innerHTML = `<img src="./src/png/icon-message-circle.png" alt="">
              <strong class="count-comment">${content.commentCount}</strong>`;

        btnCommentHTML.addEventListener("click", () => {
            location.href = `post.html?id=${content.id}`;
        });

        // 생성한 버튼들 리스트에 넣어서 관리
        btnMoreList.push(btnMoreHTML);
        btnHeartList.push(btnHeartHTML);
        btnCommentList.push(btnCommentHTML);
        contentsFragment.appendChild(contentItem);
    }
    contentsList.appendChild(contentsFragment);
    pictureContentList.appendChild(pictureContentsFragment);

    // - 리스트로 관리했던 버튼들 DOM에 붙여주기
    // 더보기 버튼
    const descContentInfoList = document.querySelectorAll(".desc_content-info");
    Array.from(descContentInfoList).forEach((descContentInfo, index) => {
        descContentInfo.after(btnMoreList[index]);
    });
    // 좋아요 & 댓글 버튼
    const contentBtnContList = document.querySelectorAll(".cont_buttons");
    console.log(contentBtnContList);
    Array.from(contentBtnContList).forEach((contentBtnCont, index) => {
        contentBtnCont.appendChild(btnHeartList[index]);
        contentBtnCont.appendChild(btnCommentList[index]);
    });

    backgroundUpModal.addEventListener("click", () => {
        contentUpModal.style.bottom = "-20rem";
        contentReportBtn_popup.removeEventListener("click", reportFuncWrapper);
    });
}
// - contents 이벤트 함수
//  신고 이벤트
async function reportFuncWrapper() {
    console.log("신고! 신고!");
    reportItem(contentId);
}
async function reportItem(itemId) {
    const token = localStorage.getItem("Token");
    // 팝업, 업 모달 다 내려주기
    backgroundPopupModal.style.display = "none";
    backgroundUpModal.style.display = "none";
    contentPopupModal.style.display = "none";
    contentUpModal.style.bottom = "-20rem";

    // 게시글 삭제 로직...
    const res = await myFetch(
        `${BASE_URL}/post/${itemId}/report`,
        "post",
        token,
        null
    );
    console.log(res);

    const response = await res.json();

    if (res.ok) {
        window.alert("신고 접수 되었습니다.");
    } else {
        window.alert("신고에 실패하였습니다.");
    }
}
// async function reportItem(itemId) {
//     console.log(itemId);
//     const token = localStorage.getItem("Token");

//     // 팝업, 업 모달 다 내려주기
//     backgroundPopupModal.style.display = "none";
//     backgroundUpModal.style.display = "none";
//     contentPopupModal.style.display = "none";
//     contentUpModal.style.bottom = "-20rem";

//     // 게시글 신고 로직...
//     const res = await myFetch(
//         `${BASE_URL}/post/${itemId}/report`,
//         "post",
//         token,
//         null
//     );

//     const response = await res.json();

//     // 게시글 삭제 완료여부 알려주기
//     if (res.ok) {
//         window.alert(`response.report.post 게시물을 신고하였습니다.`);
//     } else {
//         window.alert("신고 실패하였습니다!");
//     }
// }

// 콘텐츠의 데이터를 가져와서 그려주는 함수
async function getContents() {
    const token = localStorage.getItem("Token");
    const accountName = getQueryValue("accountName");
    // const token = AUTH;

    // ↓ 아래 요청은 나의 게시물 요청이므로 꼭 바꿔주자 ↓
    const res = await myFetch(
        `${BASE_URL}/post/${accountName}/userpost/?limit=6`,
        "get",
        token,
        null
    );
    const result = await res.json();
    const contentsListData = result.post;
    console.log(result);
    console.log(contentsListData);

    return contentsListData;
}

// - 이미지가 유효한 지 검사하는 함수
async function validateImage(image, imageType) {
    const token = localStorage.getItem("Token");
    // const token = AUTH;

    const imageArray = await image.split(",");
    const newArray = [];
    for (let image of imageArray) {
        newArray.push(
            await myFetch(
                image ? `${image}` : "notfoundimage",
                "get",
                token,
                null
            ).then((res) => {
                if (res === "error") {
                    if (imageType === "profile") {
                        return "../src/svg/basic-profile-img.svg";
                    } else {
                        // 이미지가 없을 경우.. 어떻게 처리할 것인가..
                        return "";
                    }
                } else {
                    return image;
                }
            })
        );
    }
    return newArray;

    // 잘못된 코드 > 맨 아래의 promise 참고 사이트를 보고 추가 공부하기
    // const imageArray = await image.split(",").map(function (value) {
    //     const imageContent = await myFetch(
    //         value ? `${value}` : "notfoundimage",
    //         "get",
    //         token,
    //         null
    //     ).then((res) => {
    //         if (res === "error") {
    //             if (imageType == "profile") {
    //                 return "../src/svg/Ellipse 4.svg";
    //             } else {
    //                 // 이미지가 없을 경우.. 어떻게 처리할 것인가..
    //                 // return "";
    //             }
    //         } else {
    //             return value;
    //         }
    //     });
    //     return imageContent;
    // });
    // console.log(imageArray);
    // return imageArray;
}

async function postHeartReq(method, postType, dom, id, count, img) {
    const heartCountDom = dom.querySelector("strong");
    const heartImgDom = dom.querySelector("img");
    const token = localStorage.getItem("Token");

    const res = await myFetch(
        `${BASE_URL}/post/${id}/${postType}`,
        method,
        token,
        null
    );
    if (res.ok) {
        heartCountDom.innerText = count;
        heartImgDom.src = img;
    } else {
        window.alert("요청에 실패했습니다.");
    }
}

// - nav bar, 하단 탭 페이지이동 -

// - 관련 변수
const goToHome = document.querySelector(".tap-menu-home");
const goToChat = document.querySelector(".tap-menu-chat");
const goUpload = document.querySelector(".tap-menu-upload");
const goMyProfile = document.querySelector(".tap-menu-user");

// - 페이지 이동
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

// - 공용으로 쓰이는 코드 -

// - fetch를 쉽게 쓸 수 있게 해주는 함수
async function myFetch(url, method, auth = "", data = "") {
    const responseData = await fetch(url, {
        method,
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth ? `Bearer ${auth}` : "",
        },
        body:
            method === "get" || method === "delete"
                ? null
                : data
                ? JSON.stringify(data)
                : "",
    })
        .then((res) => {
            if (res.ok) {
                return res;
            } else {
                return "error";
            }
        })
        .catch((err) => {
            return err;
        });

    return responseData;
}
// - 페이지 들어올 때 토큰 있는 지 확인
async function checkLoginUser() {
    // 토큰 검사하는 api 사용해서 수정하기
    // if (localStorage.getItem("Token") || localStorage.getItem("RefreshToken")) { }

    const token = localStorage.getItem("Token");
    if (!token) {
        location.href = "login.html";
    }
    // 이 부분은 토큰이 만료됐다 싶을 때 다시 테스트 해보기
    const res = await myFetch(
        `${BASE_URL}/user/checktoken`,
        "get",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTdjNzdiOGJkMTU3NGYwYzkzYWE0MSIsImV4cCI6MTY0Nzc2Mzg0MywiaWF0IjoxNjQyNTc5ODQzfQ.t3ynPiH6o9L-3k1z7iy3GtvUO2r_zCjWHgMR7TnLWQE"
    );
    const result = await res.json();
    if (!result.isValid) {
        location.href = "login.html";
    } else {
        console.log("만료되지 않았습니다.");
    }
}

// - url에서 원하는 쿼리 값 받아오기
function getQueryValue(key) {
    const params = new URLSearchParams(location.search);
    const value = params.get(key);
    return value;
}

// - 년일월 날짜 변환 함수
function makeKoreaDate(date) {
    // "2022-01-10T09:08:38.035Z"
    const koreaDate = date.split("-").map((value) => parseInt(value));
    return `${koreaDate[0]}년 ${koreaDate[1]}월 ${koreaDate[2]}일`;
}
// - 돈에 ','을 붙여주는 함수
function makeMoneysComma(money) {
    let result = "";
    if (money.length < 4) {
        result = money;
        return result;
    }
    result = "," + money.slice(-3);
    return makeMoneysComma(money.slice(0, -3)) + result;
}
// ※ fetch 참고 자료
// https://gist.github.com/egoing/cac3d6c8481062a7e7de327d3709505f
// https://velog.io/@kirin/fetch-%ED%95%A8%EC%88%98

// ※ 공부할 사항
// - nodeList
// - Array.from()
// - css: none > block으로 바꿔줄 때 transition이 적용안되는 이유
// - ajax, async await, fetch, axios

// res.json() 오류날 경우 해답
// -> text값을 json으로 변환하려해서 생기는 문젠
// https://iborymagic.tistory.com/78

// fetch에서 에러처리.. 예외상황
// https://velog.io/@mingtorr/Error-Handling-With-Fetch

// map안에서 async await을 사용하면 promise를 반환하는 문제.. > promise.all? promise.resole?? 간단하게는 for of..
// https://velog.io/@minsangk/2019-09-06-0209-%EC%9E%91%EC%84%B1%EB%90%A8-eik06xy8mm

// display: none으로 view-style을 구현하는게 좋을 지.. remove()나 removeChild()가 괜찮을지 생각해보기

// location.href 와 history를 각각 어떤 경우에 쓰는 것이 유용할까

// 클래스, 생성자 함수 언제 사용해야할까?
// 컨텐츠나 프로필 같이 반복적으로 사용되는 것은 클래스나 생성자 함수를 사용해서 구현해보기
