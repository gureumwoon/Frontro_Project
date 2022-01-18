const profileFixButton = document.querySelector(
    ".profile_footer > button:first-child"
);
const addProductButton = document.querySelector(
    ".profile_footer > button:nth-child(2)"
);

profileFixButton.addEventListener("click", () => {
    window.location.href = "profile_modification.html";
});

addProductButton.addEventListener("click", () => {
    window.location.href = "add_product.html";
});

// - nav bar, 하단 탭 페이지이동 -
const goToHome = document.querySelector(".tap-menu-home");
console.log(goToHome);
const goToChat = document.querySelector(".tap-menu-chat");
console.log(goToChat);
const goUpload = document.querySelector(".tap-menu-upload");
console.log(goUpload);
const goMyProfile = document.querySelector(".tap-menu-user");
console.log(goMyProfile);

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
