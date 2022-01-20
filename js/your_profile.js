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

profileFollowersBtn.addEventListener("click", () => {
    const accountName = getQueryValue("accountname");
    location.href = `follow.html?accountName=${accountName}&follow=follower`;
});
profileFollowingsBtn.addEventListener("click", () => {
    const accountName = getQueryValue("accountname");
    location.href = `follow.html?accountName=${accountName}&follow=following`;
});

// - 메세지 창으로 이동
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
        const accountName = getQueryValue("accountname");
        const myAccountName = "asdasd";
        // const accountName = "hey_binky";
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
        const accountName = getQueryValue("accountname");
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
        const accountName = getQueryValue("accountname");

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
getOnSaleData();

// - 유저 판매 상품 데이터를 가져와서 화면에 그려주기
async function getOnSaleData() {
    try {
        // const accountName = getQueryValue("accountname");
        const accountName = "hey_binky";
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/product/${accountName}`,
            "get",
            token,
            null
        );
        const result = await res.json();
        const productList = result.product;

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
        });

        onSaleList.appendChild(onSaleFragment);
    } catch (error) {
        console.log(error);
    }
}

// - cont_contents, 게시물 정보 -

// - view-style 관련 변수
const viewStyleCont = document.querySelector(".cont_view-style");
const styleBtn = viewStyleCont.querySelectorAll("button");
const listStyleBtn = Array.from(styleBtn)[0];
const pictureStyleBtn = Array.from(styleBtn)[1];

// - contents 관련 변수
const contentsCont = document.querySelector(".cont_user-contents");
const contentsList = document.querySelector(".ul_user-contents");
const contentsFragment = document.createDocumentFragment();
const contentImagesFragment = document.createDocumentFragment();
const contentUpModal = document.querySelector(".up-modal + .content");

// - contents 데이터 가져오기
getContents();

// - view-style change
// 이벤트 처리하는 경우와 ui처리에 관해서 생각해보지 않으니 일을 두번하게 된다..
listStyleBtn.addEventListener("click", () => {
    if (Array.from(listStyleBtn.classList).includes("off")) {
        if (Array.from(contentsCont.classList).includes("picture-style")) {
            contentsCont.classList.remove("picture-style");

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

// 콘텐츠의 데이터를 가져와서 그려주는 함수
async function getContents() {
    const token = localStorage.getItem("Token");
    const accountName = "hey_binky";
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

    // 등록된 게시글이 없으면 게시글란 안보이게 처리하기
    if (contentsListData.length > 0) {
        contentsCont.style.display = "block";
    } else {
        return;
    }

    // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??
    for (let content of contentsListData) {
        const authorImage = await validateImage(
            content.author.image,
            "profile"
        );
        const contentImage = await validateImage(content.image, "content");
        let imageHTML = "";
        if (contentImage.length === 1 && contentImage[0]) {
            imageHTML = `<img src="${contentImage[0]}" alt="post-image" class="content-img_content-info">`;
        } else if (contentImage.length > 1) {
            const arr = [];
            contentImage.forEach((image) => {
                if (image) {
                    arr.push(
                        `<img src="${image}" alt="post-image" class="content-img_slide-item">`
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
        <img src="${authorImage}" alt="${
            content.author.username
        }님의 프로필 사진" class="img_content-info" />
        <div class="desc_content-info">
        <p class="name_content-info">${content.author.username}</p>
                                        <p class="email_content-info">@ ${
                                            content.author.accountname
                                        }</p>
                                        <p class="txt_content-info">${
                                            content.content
                                        }</p>
                                        <div class="cont_content-image"></div>
                                        
                                        ${imageHTML}

                                        <div class="cont_buttons">
                                            <button class="button-like button-noneBackground">
                                                <img src="./src/png/${
                                                    content.hearted
                                                        ? "icon-heart-active.png"
                                                        : "icon-heart.png"
                                                    // ./src/png/icon-heart.png
                                                }" alt="">
                                            </button>
                                            <strong>${
                                                content.heartCount
                                            }</strong>
                                            <button class="button-comment button-noneBackground">
                                                <img src="./src/png/icon-message-circle.png" alt="">
                                            </button>
                                            <strong>${
                                                content.commentCount
                                            }</strong>
                                        </div>
                                        <p class="date_content-info">${makeKoreaDate(
                                            content.updatedAt
                                        )}</p>
                                    </div>
                                    <button type="button" class="btn-more_content button-noneBackground">
                                        <img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">
                                    </button>
                            </article>`;

        contentsFragment.appendChild(contentItem);
    }
    contentsList.appendChild(contentsFragment);

    // - 더보기 업 모달 생성
    const contentBtnList = document.querySelectorAll(".btn-more_content");
    Array.from(contentBtnList).forEach((button) => {
        button.addEventListener("click", () => {
            backgroundUpModal.style.display = "block";
            contentUpModal.style.bottom = "0";
        });
        backgroundUpModal.addEventListener("click", () => {
            contentUpModal.style.bottom = "-20rem";
        });
    });
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
function checkLoginUser() {
    // if (localStorage.getItem("Token") || localStorage.getItem("RefreshToken")) { }

    if (!localStorage.getItem("Token")) {
        location.href = "login.html";
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
