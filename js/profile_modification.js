const userNameInput = document.querySelector('#user-name');
const saveButton = document.querySelector('.nav > button');
const userIdInput = document.querySelector('#user-id');
const warningTextList = document.querySelectorAll('.warning-text');
const backBtn = document.querySelector('.btn-back');

// 뒤로가기(my_profile)
backBtn.addEventListener('click', () => {
    window.location.href = 'my_profile.html'
})


// 이름 2~10자 이내 유효성 검사
const isUserNameInputValid = () => {
    const userName = userNameInput.value;
    if (userName.length < 2 || 10 < userName.length) {
        return false;
    }
    return true;
}

// 영문, 숫자, ._ 만 가능한 유효성 검사
const isUserIdInputValid = () => {
    const userId = userIdInput.value;
    const reg1 = /[A-Z]/g;
    const reg2 = /[a-z]/g;
    const reg3 = /[0-9]/g;
    const reg4 = /[._]/g;
    const isValid = reg1.test(userId) || reg2.test(userId) || reg3.test(userId) || reg4.test(userId);
    return isValid;
}


// 버튼 클릭 했을때 유효성 검사 (유효성 검사 실패시 저장버튼 안 눌림)

saveButton.addEventListener('click', () => {
    if (!isUserNameInputValid()) {
        warningTextList[0].classList.remove('invisible');
        return;
    }
    warningTextList[0].classList.add('invisible');
    if (!isUserIdInputValid()) {
        warningTextList[1].classList.remove('invisible');
        return;
    }
    warningTextList[1].classList.add('invisible');
    window.location.href = "my_profile.html";
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
        saveButton.classList.add('active');
        warningTextList[1].classList.add('invisible');
    })
})


// 버튼 활성화 (이름과 ID 입력시 버튼 활성화)

const isButtonActive = () => {
    if (!isUserNameInputValid()) {
        saveButton.classList.remove('active');
        return;
    }
    if (!isUserIdInputValid()) {
        saveButton.classList.remove('active');
        return;
    }
    // 버튼 활성화
    saveButton.classList.add('active');
}


userNameInput.addEventListener('input', isButtonActive);
userIdInput.addEventListener('input', isButtonActive);

