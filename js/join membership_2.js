const userNameInput = document.querySelector('#inpName');
const startButton = document.querySelector('form > button');
const userIdInput = document.querySelector('#inpId');
const warningTextList = document.querySelectorAll('.warning-text');
console.log(warningTextList);

const isUserNameInputValid = () => {
    const userName = userNameInput.value;
    if (userName.length < 2 || 10 < userName.length) {
        return false;
    }
    return true;
}

const isUserIdInputValid = () => {
    const userId = userIdInput.value;
    const reg1 = /[A-Z]/g;
    const reg2 = /[a-z]/g;
    const reg3 = /[0-9]/g;
    const reg4 = /[._]/g;
    const isValid = reg1.test(userId) || reg2.test(userId) || reg3.test(userId) || reg4.test(userId);
    return isValid;
}

startButton.addEventListener('click', () => {
    if (!isUserNameInputValid()) {
        warningTextList[0].classList.remove('invisible');
        console.log("2~10자 이내여야 합니다.");
        return;
    }
    warningTextList[0].classList.add('invisible');
    if (!isUserIdInputValid()) {
        warningTextList[1].classList.remove('invisible');
        return;
    }
    warningTextList[1].classList.add('invisible');
    window.location.href = "home.html";
})

// const isButtonActive = () => {
//     if (!isUserNameInputValid()) {
//         startButton.classList.remove('active');
//         return;
//     }
//     if (!isUserIdInputValid()) {
//         startButton.classList.remove('active');
//         return;
//     }
//     // 버튼 활성화
//     startButton.classList.add('active');
// }


// userNameInput.addEventListener('input', isButtonActive);
// userIdInput.addEventListener('input', isButtonActive);

