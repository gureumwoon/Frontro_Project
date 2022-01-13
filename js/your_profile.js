const AUTH =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzA2NjU2MiwiaWF0IjoxNjQxODgyNTYyfQ.yPpSVh7MWboADb08_yHIWSoSg-X4tic_LykTRxgSX5w";
const BASE_URL = "http://146.56.183.55:5050";
const ACCOUNT_MYNAME = "hey_binky";
const MYID = "61ca638ab5c6cd18084e447d";
const ACCOUNT_NAME = "halo_halo";
// const ACCOUNT_NAME = "hey_binky";

// - top-bar, 헤더 바
// - 뒤로가기 버튼
// - 더보기 버튼
const btnMore = document.querySelector(".button-more");
// - modal, 모달 관련 함수 및 변수들 -
// up modal, 위로 올라오는 모달
const backgroundUpModal = document.querySelector(".background_up-modal");
const upModal = document.querySelector(".up-modal");
const postItemList = document.querySelectorAll(".item-modal");
const logoutBtn_up = Array.from(postItemList).find(
    (item) => item.innerText === "로그아웃"
);
// popup modal, 띄워지는 모달
const backgroundPopupModal = document.querySelector(".background_popup-modal");
const popupModal = document.querySelector(".popup-modal");
const cancelBtn_popup = document.querySelector(".cancel-button_popup");
const logoutBtn_popup = document.querySelector(".action-button_popup");
// ※ find를 쓰기 위해선 nodeList > Array 변환 이 필요
// - 업 모달창 올리기
btnMore.addEventListener("click", () => {
    backgroundUpModal.style.display = "block";
    upModal.style.bottom = "0";
});
// - 업 모달창 내리기
backgroundUpModal.addEventListener("click", () => {
    backgroundUpModal.style.display = "none";
    upModal.style.bottom = "-20rem";
});
// - 팝업 모달창 띄우기
logoutBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
});
// - 팝업 모달창 내리기
cancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
});
// - 로그 아웃 api 요청하기
logoutBtn_popup.addEventListener("click", () => {});

// - profile-info, 프로필 정보 -
// - 관련 변수
const profileCont = document.querySelector(".cont_profile");
const profileFollowers = document.querySelector(".number_followers");
const profileFollowings = document.querySelector(".number_followings");
const profileImg = document
    .querySelector(".header_profile")
    .querySelector("img");
const profileName = document.querySelector(".name_profile");
const profileAccount = document.querySelector(".account_profile");
const profileIntro = document.querySelector(".explain_profile");
const profileMessageBtn = document.querySelector(".button-message");
const profileFollowBtn = document.querySelector(".S-button");
// - 프로필 데이터 fetch로 가져오기
myFetch(`${BASE_URL}/profile/${ACCOUNT_NAME}`, "get", AUTH)
    .then((res) => {
        return res.json();
    })
    .then((result) => {
        result = result.profile;
        profileFollowers.innerText = result.followerCount;
        profileFollowings.innerText = result.followingCount;
        profileImg.src = result.image;
        profileName.innerText = result.username;
        profileAccount.innerText = `@ ${result.accountname}`;
        profileIntro.innerText = result.intro ? result.intro : "-";
        if (result.follower.includes(MYID)) {
            profileFollowBtn.innerText = "언팔로우";
            profileFollowBtn.classList.replace("S-button", "S-Active-button");
        }
    })
    .catch((error) => console.log(error));
// - 메세지 창으로 이동
profileMessageBtn.addEventListener("click", () => {
    // 페이지 이동하는 코드
});
// - 팔로우 기능
profileFollowBtn.addEventListener("click", () => {
    if (profileFollowBtn.innerText === "언팔로우") {
        myFetch(
            `${BASE_URL}/profile/${ACCOUNT_NAME}/unfollow`,
            "delete",
            AUTH,
            null
        )
            .then((res) => res.json())
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
        profileFollowBtn.innerText = "팔로우";
        profileFollowBtn.classList.replace("S-Active-button", "S-button");
        console.log(profileFollowers.innerText);
        profileFollowers.innerText = `${
            parseInt(profileFollowers.innerText) - 1
        }`;
    } else {
        myFetch(
            `${BASE_URL}/profile/${ACCOUNT_NAME}/follow`,
            "post",
            AUTH,
            null
        )
            .then((res) => res.json())
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
        profileFollowBtn.innerText = "언팔로우";
        profileFollowBtn.classList.replace("S-button", "S-Active-button");
        console.log(profileFollowers.innerText);
        profileFollowers.innerText = `${
            parseInt(profileFollowers.innerText) + 1
        }`;
    }
});

// - cont_on-sale -
// - 관련 변수
const onSaleList = document.querySelector(".ul_on-sale");
const onSaleFragment = document.createDocumentFragment();
// - 유저 판매 상품 데이터를 가져와서 화면에 그려주기
myFetch(`${BASE_URL}/product/${ACCOUNT_NAME}`, "get", AUTH, null)
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        const productList = result.product;

        // - demo data -
        // const productList = [
        //     {
        //         itemImage: "1641184947130.png",
        //         itemName: "꿀맛나는 뀰, 꿀귤",
        //         link: "http://www.paullab.co.kr",
        //         price: 4000,
        //     },
        //     {
        //         itemImage: "1641184947130.png",
        //         itemName: "꿀맛나는 뀰, 꿀귤",
        //         link: "http://www.paullab.co.kr",
        //         price: 4000,
        //     },
        //     {
        //         itemImage: "1641184947130.png",
        //         itemName: "꿀맛나는 뀰, 꿀귤",
        //         link: "http://www.paullab.co.kr",
        //         price: 4000,
        //     },
        //     {
        //         itemImage: "1641184947130.png",
        //         itemName: "꿀맛나는 뀰, 꿀귤",
        //         link: "http://www.paullab.co.kr",
        //         price: 4000,
        //     },
        // ];

        productList.forEach((product) => {
            // 가격에 ','를 달아주는 로직
            const price = makeMoneysComma(`${product.price}`);
            const productItem = document.createElement("li");
            productItem.className += "li_on-sale";
            productItem.innerHTML = `
                <article class="item_on-sale">
                    <img src="${BASE_URL}/${product.itemImage}" alt="판매상품 ${product.itemName}의 이미지">
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
    })
    .catch((error) => console.log(error));

// - cont_contents, 게시물 정보 -
// - view-style 관련 변수
const viewStyleCont = document.querySelector(".cont_view-style");
const styleBtn = viewStyleCont.querySelectorAll("button");
const listStyleBtn = Array.from(styleBtn)[0];
const pictureStyleBtn = Array.from(styleBtn)[1];
// - contents 관련 변수
const contentsCont = document.querySelector(".cont_user-contents");
contentsCont.className += ` list-style`;
const contentsList = document.querySelector(".ul_user-contents");
const contentsFragment = document.createDocumentFragment();

// - view-style change
listStyleBtn.addEventListener("click", () => {
    if (Array.from(listStyleBtn.classList).includes("off")) {
        // contentsCont.classList.replace("")
        listStyleBtn.classList.replace("off", "on");
        pictureStyleBtn.classList.replace("on", "off");
        listStyleBtn.querySelector("img").src =
            "../src/png/icon-post-list-on.png";
        pictureStyleBtn.querySelector("img").src =
            "../src/png/icon-post-album-off.png";
    }
});
pictureStyleBtn.addEventListener("click", () => {
    if (Array.from(pictureStyleBtn.classList).includes("off")) {
        viewStyle = "picture-style";
        listStyleBtn.classList.replace("on", "off");
        pictureStyleBtn.classList.replace("off", "on");
        listStyleBtn.querySelector("img").src =
            "../src/png/icon-post-list-off.png";
        pictureStyleBtn.querySelector("img").src =
            "../src/png/icon-post-album-on.png";
    }
});

// - contents 데이터를 가져와서 화면에 그려주기
// ↓ 아래 요청은 나의 게시물 요청이므로 꼭 바꿔주자 ↓
myFetch(`${BASE_URL}/post/feed?limit=6`, "get", AUTH, null)
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        const contentsListData = result.posts;
        console.log(contentsListData);

        // - demo data -
        // author: {_id: '61ce82540ab9576f8df32dd9', username: '초원범', accountname: 'chowonbeom', intro: '네 접니다.', image: 'http://146.56.183.55:5050/1641864733219.png', …}
        // commentCount: 8
        // comments: (8) ['61ce831d0ab9576f8df32df5', '61ce839f0ab9576f8df32e01', '61dce2903fe886cd1337d1b6', '61dd0c763fe886cd1337e97f', '61dd212d3fe886cd1337fd50', '61dd215f3fe886cd1337fdda', '61dd21673fe886cd1337fde9', '61dd29063fe886cd1338079a']
        // content: "String"
        // createdAt: "2021-12-31T04:09:59.453Z"
        // heartCount: 4
        // hearted: true
        // id: "61ce82970ab9576f8df32de0"
        // image: ""
        // updatedAt: "2022-01-11T06:51:50.230Z"

        contentsListData.forEach((content) => {
            const contentItem = document.createElement("li");
            contentItem.className += "li_user-contents";
            contentItem.innerHTML = `
                <article class="content_user-contents">
                            <div class="cont_content-info">
                                <img src="${content.author.image}" alt="${
                content.author.username
            }님의 프로필 사진" class="img_content-info" />
                                <div class="desc_content-info">
                                    <p class="name_content-info">${
                                        content.author.username
                                    }</p>
                                    <p class="email_content-info">@ ${
                                        content.author.accountname
                                    }</p>
                                    <p class="txt_content-info">${
                                        content.content
                                    }</p>
                                    <img src="${
                                        content.image
                                    }" alt="" class="content-img_content-info">

                                    <div class="cont_buttons">
                                        <button class="button-like button-noneBackground">
                                            <img src="./src/png/${
                                                content.hearted
                                                    ? "icon-heart-active.png"
                                                    : "icon-heart.png"
                                                // ./src/png/icon-heart.png
                                            }" alt="">
                                        </button>
                                        <strong>${content.heartCount}</strong>
                                        <button class="button-comment button-noneBackground">
                                            <img src="./src/png/icon-message-circle.png" alt="">
                                        </button>
                                        <strong>${content.commentCount}</strong>
                                    </div>
                                    <p class="date_content-info">${makeKoreaDate(
                                        content.updatedAt
                                    )}</p>
                                </div>
                            </div>
                        </article>`;
            contentsFragment.appendChild(contentItem);
        });
        console.log(contentsFragment);
        contentsList.appendChild(contentsFragment);
    })
    .catch((error) => console.log(error));

// - 공용으로 쓰이는 코드 -
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
// - fetch를 쉽게 쓸 수 있게 해주는 함수
async function myFetch(url, method, auth = "", data = "") {
    const responseData = await fetch(url, {
        // localStorge에서 token 가져오는 코드 추가 필요_원범님 코드 참고
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth ? `Bearer ${auth}` : "",
        },
        body:
            method === "get" || method === "delete"
                ? null
                : data
                ? JSON.stringify(data)
                : "",
    });
    return responseData;
}
// ※ fetch 참고 자료
// https://gist.github.com/egoing/cac3d6c8481062a7e7de327d3709505f
// https://velog.io/@kirin/fetch-%ED%95%A8%EC%88%98

// ※ 공부할 사항
// - nodeList
// - Array.from()
// - css: none > block으로 바꿔줄 때 transition이 적용안되는 이유
// - ajax, async await, fetch, axios
