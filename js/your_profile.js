// 구현할 사항.
// [] 코드 fetch 함수 및 기능별로 이쁘게 정리하기
// [] 무한 스크롤

// 나중에 추가 구현 사항
// [] 다중 파일 선택 시스템 만들기

const AUTH =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzUwNzQ5MSwiaWF0IjoxNjQyMzIzNDkxfQ.IpERmWzo8--G6k-6pBBj5FUtxRJD1UqY_CNFIGc35zQ";
const BASE_URL = "http://146.56.183.55:5050";
const ACCOUNT_MYNAME = "hey_binky";
const MYID = "61ca638ab5c6cd18084e447d";
const ACCOUNT_NAME = "halo_halo";
// const ACCOUNT_NAME = "hey_binky";

// - top-bar, 헤더 바
// - 관련 변수들 -
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
    // location.href("");
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
    console.log("click");
    // history.pushState(
    //     { username: "할로할로" },
    //     "채팅방 유저 이름",
    //     "chat_room.html"
    // );

    // location.reload();
    // location.href = `chat_room.html?username=${}`;
    location.href = `chat_room.html?username=할로할로&accountname=halo_halo`;
});
// - 팔로우 기능
// 팔로우 요청이 성공했을 때 버튼 그림을 바꿔주는 것으로 수정
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
const contentsList = document.querySelector(".ul_user-contents");
const contentsFragment = document.createDocumentFragment();
const contentImagesFragment = document.createDocumentFragment();

// - contents 데이터 가져오기
getContents();

// - view-style change
// 이벤트 처리하는 경우와 ui처리에 관해서 생각해보지 않으니 일을 두번하게 된다..
listStyleBtn.addEventListener("click", () => {
    if (Array.from(listStyleBtn.classList).includes("off")) {
        if (Array.from(contentsCont.classList).includes("picture-style")) {
            contentsCont.classList.remove("picture-style");
        }

        // list button 활성화
        listStyleBtn.classList.replace("off", "on");
        listStyleBtn.querySelector("img").src =
            "../src/png/icon-post-list-on.png";

        // picture button 비활성화
        pictureStyleBtn.classList.replace("on", "off");
        pictureStyleBtn.querySelector("img").src =
            "../src/png/icon-post-album-off.png";
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
    // const token = localStorage.getItem("Token");
    const token = AUTH;

    // ↓ 아래 요청은 나의 게시물 요청이므로 꼭 바꿔주자 ↓
    const res = await myFetch(
        `${BASE_URL}/post/feed?limit=6`,
        "get",
        token,
        null
    );
    const result = await res.json();
    const contentsListData = result.posts;

    // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??
    for (let content of contentsListData) {
        // console.log(content);
        const authorImage = await validateImage(
            content.author.image,
            "profile"
        );

        // image가 여러개 들어왔을 때를 대비해서 처리하는 것_개발 예정..
        // const contentImage = await validateImage(content.image, "content");
        // const imageContainer = document.querySelector(".cont_content-image");
        // if (contentImage.length > 1) {
        //     for (let image of contentImage) {
        //         if (image) {
        //             imageContainer.innerHTML = `<img src=${image}> alt ="">`;
        //             contentImagesFragment.appendChild();
        //         }
        //     }
        // } else {
        //     imageContainer.innerHTML += `<img src=${image}>`;
        // }

        // list형 content 보여주기
        const contentItem = document.createElement("li");
        contentItem.className += "li_user-contents";
        contentItem.innerHTML = `
                    <article class="content_user-contents">
                                    <img src="${authorImage}" alt="${
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

                                        <div class="cont_content-image"></div>
                                        <img src=${
                                            content.image
                                        } alt="" class="content-img_content-info">

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
                            </article>`;
        contentsFragment.appendChild(contentItem);
    }
    contentsList.appendChild(contentsFragment);
}

// 이미지가 유효한 지 검사하는 함수
async function validateImage(image, imageType) {
    const token = AUTH;
    // const token = localStorage.getItem("Token");

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
                    if (imageType == "profile") {
                        return "../src/svg/Ellipse 4.svg";
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
