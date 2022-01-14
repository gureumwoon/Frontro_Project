const userNameInput = document.querySelector('#inpName');
const startButton = document.querySelector('form > button');
const userIdInput = document.querySelector('#inpId');
const warningTextList = document.querySelectorAll('.warning-text');

// 사용자 이름 2자~10자 유효성 검사
const isUserNameInputValid = () => {
    const userName = userNameInput.value;
    if (userName.length < 2 || 10 < userName.length) {
        return false;
    }
    return true;
}

// 영문, 숫자, ._만 가능한 유효성 검ㅏ 
const isUserIdInputValid = () => {
    const userId = userIdInput.value;
    const reg1 = /[A-Z]/g;
    const reg2 = /[a-z]/g;
    const reg3 = /[0-9]/g;
    const reg4 = /[._]/g;
    const isValid = reg1.test(userId) || reg2.test(userId) || reg3.test(userId) || reg4.test(userId);
    return isValid;
}

// 버튼 클릭했을 때  유효성 검사
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
    window.location.href = "index.html";
})

// imput에 입력시 유효성 검사

userNameInput.addEventListener('input', () => {
    if (!isUserNameInputValid()) {
        warningTextList[0].classList.remove('invisible');
        if (userNameInput.value === "") {
            warningTextList[0].classList.add('invisible');
        }
        return;
    }
    warningTextList[0].classList.add('invisible');
    userIdInput.addEventListener('input', () => {
        if (!isUserIdInputValid()) {
            warningTextList[1].classList.remove('invisible');
            if (userIdInput.value === "") {
                warningTextList[1].classList.add('invisible');
            }
            return;
        }
        startButton.classList.add('active');
        warningTextList[1].classList.add('invisible');
    })
})


// 버튼 활성화 
const isButtonActive = () => {
    if (!isUserNameInputValid()) {
        startButton.classList.remove('active');
        return;
    }
    if (!isUserIdInputValid()) {
        startButton.classList.remove('active');
        return;
    }
    // 버튼 활성화
    startButton.classList.add('active');
}


userNameInput.addEventListener('input', isButtonActive);
userIdInput.addEventListener('input', isButtonActive);

