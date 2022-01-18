const userNameInput = document.querySelector('#inpName');
const startButton = document.querySelector('.start-btn');
const userIdInput = document.querySelector('#inpId');
const warningTextList = document.querySelectorAll('.warning-text');
// 이메일로 회원가입 폼 부분 선택
const userEmailInput = document.querySelector('#inpEmail');
console.log(userEmailInput);
const userPwInput = document.querySelector('#inputPw');
console.log(userPwInput);
const nextBtn = document.querySelector('.next_btn');
console.log(nextBtn);
// 섹션 선택 
const $emailPw = document.querySelector(".email-pw")
console.log($emailPw);
const $profile = document.querySelector(".profile-set")
console.log($profile);
const $imagePre = document.querySelector("#imagePre")
console.log($imagePre);

const url = "http://146.56.183.55:5050";

// 이메일 중복 체크 함수 
async function checkEmailValid(email) {
    const res = await fetch(`${url}/user/emailvalid`,{
        method:"POST",
        headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify({
            "user":{
                    "email": email
            }
        })
    })
    const json = await res.json()
    return json.message == "사용 가능한 이메일 입니다." ? true : false

    // return 이 이메일이 사용가능하지 체크를 할거에요.
}

// const email = document.querySelector("#inpEmail").value
// const pw = document.querySelector("#inputPw").value
// console.log(email);
// console.log(pw);

// 다음 버튼 눌렀을때 섹션 블록처리 
nextBtn.addEventListener("click",async ()=>{
    const email = document.querySelector("#inpEmail").value
    const pw = document.querySelector("#inputPw").value
    // 이메일 유효성 검사 통과시 화면 전환 통과 못하면 경고 문구 띄우기 
    const emailValid = await checkEmailValid(email)
    if (emailValid) {
        $emailPw.style.display = "none"
        $profile.style.display = "block"
    }else{
        warningTextList[0].classList.remove('invisible');
    }

})

// 비밀번호 6자 이상 유효성 검사 함수 
const validPassword = () => {
    const password = userPwInput.value;
    if (password.length < 6) {
     return false;
  }
  return true;
}

// input에 입력시, 비밀번호 유효성 검사 경고 출력 (6자리 미만인 경우)
userPwInput.addEventListener ('input', () => {
    if(!validPassword()) {
        warningTextList[1].classList.remove('invisible');
        if(userPwInput.value === "") {
            warningTextList[1].classList.add('invisible');
        }
        return;
    }
    warningTextList[1].classList.add('invisible');
})

// 다음 버튼 눌렀을때 join1은 display:none 하고 join2의 displaynone 풀어주기
// 이메일 중복검사랑 비밀번호 통과 못하면 클릭 안먹음
nextBtn.addEventListener ('click', () => {

}) 

// 사용자 이름 2자~10자 유효성 검사
const isUserNameInputValid = () => {
    const userName = userNameInput.value;
    if (userName.length < 2 || 10 < userName.length) {
        return false;
    }
    return true;
}

// 영문, 숫자, ._만 가능한 유효성 검사 
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
// 유효성 검사 통과못하면 버튼 안눌림 
startButton.addEventListener('click', () => {
    if (!isUserNameInputValid()) {
        warningTextList[2].classList.remove('invisible');
        console.log("2~10자 이내여야 합니다.");
        return;
    }
    warningTextList[2].classList.add('invisible');
    if (!isUserIdInputValid()) {
        warningTextList[3].classList.remove('invisible');
        return;
    }
    warningTextList[2].classList.add('invisible');
    window.location.href = "index.html";
})

// imput에 입력시 유효성 검사
// 사용자 이름 유효성 검사
// 계정 ID 유효성 검사 
userNameInput.addEventListener('input', () => {
    if (!isUserNameInputValid()) {
        warningTextList[2].classList.remove('invisible');
        if (userNameInput.value === "") {
            warningTextList[2].classList.add('invisible');
        }
        return;
    }
    warningTextList[2].classList.add('invisible');

    userIdInput.addEventListener('input', () => {
        if (!isUserIdInputValid()) {
            warningTextList[3].classList.remove('invisible');
            if (userIdInput.value === "") {
                warningTextList[3].classList.add('invisible');
            }
            return;
        }
        startButton.classList.add('active');
        warningTextList[3].classList.add('invisible');
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
    startButton.classList.add('active');
}

userNameInput.addEventListener('input', isButtonActive);
userIdInput.addEventListener('input', isButtonActive);

async function join() {
  const email = document.querySelector("#input_box").value;
  const password = document.querySelector("#input_box_pw").value;

  try {
    const res = await fetch("http://146.56.183.55:5050/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user": {
          "email": email,
          "password": password,
          "username": userName,
          "accountname": userId,
          "intro": intro,
          "image": imageUrl,
        }
      })
    })
    console.log(res)
    const json = await res.json()
    const message = json.message
    // if(message=="회원가입 성공"){
    if (res.status == 200) {
      window.location.href = "index.html"
    } else {
      console.log(json)
    }
  } catch (err) {
    alert(err)
  }
}
