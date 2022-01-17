// - top-bar, 헤더 바 -
// - 관련 변수들
const btnBack = document.querySelector(".button-back");

// - 뒤로가기 버튼
btnBack.addEventListener("click", () => {
    history.back();
});

// - followers list, 팔로워 목록-
const followersList = document.querySelector(".list-followers");
const followersFragment = document.createDocumentFragment();

// 콘텐츠의 데이터를 가져와서 그려주는 함수
// async function getFollowers() {
//     // const token = localStorage.getItem("Token");
//     const token = AUTH;

//     // ↓ 아래 요청은 나의 게시물 요청이므로 꼭 바꿔주자 ↓
//     const res = await myFetch(
//         `${BASE_URL}/post/feed?limit=6`,
//         "get",
//         token,
//         null
//     );
//     const result = await res.json();
//     const followersListData = result.posts;

//     // const demoData = [
//     //     {
//     //         // _id: String,
//     //         username: "할로할로",
//     //         accountname: "halo_halo",
//     //         intro: "정성을 다해 농사짓는 한라봉",
//     //         image: "../src/svg/Ellipse 4.svg",
//     //         following: [],
//     //         follower: ["접속한 사용자의 id"],
//     //         followerCount: 1,
//     //         followingCount: 0,
//     //     },
//     // ];

//     // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??
//     for (let follower of followersListData) {
//         // console.log(content);
//         const authorImage = await validateImage(
//             follower.author.image,
//             "profile"
//         );

//         // list형 content 보여주기
//         const followerItem = document.createElement("li");
//         followerItem.className += "user-follow";
//         followerItem.innerHTML = `
//             <img src=${authorImage} alt="oo님의 프로필 사진" class="follow_profile-image" />
//             <div class="follow_text-info">
//                 <p class="follow_user-name">애월읍 위니브 감귤농장</p>
//                 <p class="follow_user-introduce">정성을 다해 농사짓는 한라봉</p>
//             </div>
//             <button type="button" class="S-button Sbutton-font">팔로우</button>`;
//         followersFragment.appendChild(followerItem);
//     }
//     followersList.appendChild(followersFragment);
// }

// 이미지가 유효한 지 검사하는 함수
// async function validateImage(image, imageType) {
//     const token = AUTH;
//     // const token = localStorage.getItem("Token");

//     const imageArray = await image.split(",");
//     const newArray = [];
//     for (let image of imageArray) {
//         newArray.push(
//             await myFetch(
//                 image ? `${image}` : "notfoundimage",
//                 "get",
//                 token,
//                 null
//             ).then((res) => {
//                 if (res === "error") {
//                     if (imageType == "profile") {
//                         return "../src/svg/Ellipse 4.svg";
//                     } else {
//                         // 이미지가 없을 경우.. 어떻게 처리할 것인가..
//                         return "";
//                     }
//                 } else {
//                     return image;
//                 }
//             })
//         );
//     }
//     return newArray;

//     // 잘못된 코드 > 맨 아래의 promise 참고 사이트를 보고 추가 공부하기
//     // const imageArray = await image.split(",").map(function (value) {
//     //     const imageContent = await myFetch(
//     //         value ? `${value}` : "notfoundimage",
//     //         "get",
//     //         token,
//     //         null
//     //     ).then((res) => {
//     //         if (res === "error") {
//     //             if (imageType == "profile") {
//     //                 return "../src/svg/Ellipse 4.svg";
//     //             } else {
//     //                 // 이미지가 없을 경우.. 어떻게 처리할 것인가..
//     //                 // return "";
//     //             }
//     //         } else {
//     //             return value;
//     //         }
//     //     });
//     //     return imageContent;
//     // });
//     // console.log(imageArray);
//     // return imageArray;
// }

// - 페이지 이동 -
// - 관련 변수
const followersLinkList = document.querySelectorAll(".user-follow");
Array.from(followersLinkList).forEach((follower) => {
    console.log(follower);
    const profileName = follower.querySelector(".follow_user-name").innerText;
    follower.addEventListener("click", () => {
        location.href = `/your_profile.html?name=${profileName}`;
    });
});

// - 팔로우 버튼 기능
const FollowBtn = document.querySelectorAll(".Sbutton-font");
Array.from(FollowBtn).forEach((button) => {
    button.addEventListener("click", () => {
        if (button.innerText === "취소") {
            // myFetch(
            //     `${BASE_URL}/profile/${ACCOUNT_NAME}/unfollow`,
            //     "delete",
            //     AUTH,
            //     null
            // )
            //     .then((res) => res.json())
            //     .then((result) => console.log(result))
            //     .catch((error) => console.log(error));
            button.innerText = "팔로우";
            button.classList.replace("S-Active-button", "S-button");
            console.log(button.innerText);
        } else {
            // myFetch(
            //     `${BASE_URL}/profile/${ACCOUNT_NAME}/follow`,
            //     "post",
            //     AUTH,
            //     null
            // )
            //     .then((res) => res.json())
            //     .then((result) => console.log(result))
            //     .catch((error) => console.log(error));
            button.innerText = "취소";
            button.classList.replace("S-button", "S-Active-button");
            console.log(button.innerText);
        }
    });
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
