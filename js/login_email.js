function getInput() {
  const userEmailInput = document.querySelector('#inpEmail');
  console.log(userEmailInput);
  const userPwInput = document.querySelector('#inputPw');
  console.log(userPwInput);
  const loginBtn = document.querySelector('.login_btn');
  console.log(loginBtn);
}

// 통과못하면 경고문구 띄우기 
loginBtn.addEventListener("click",async ()=>{
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

// input에 입력시, 유효성 검사 경고 출력
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













// 비동기로 동하는것을 명시해줘야 await을 할 수 있다!
async function login() {

  const email = document.querySelector("#input-box-id").value
  const pw = document.querySelector("#input-box-pw").value
  const url = "http://146.56.183.55:5050"
  const loginData = {
    "user": {
      "email": email,
      "password": pw
    }
  }

  const res = await fetch(url + '/user/login', {
    //메소드 구분
    method: "POST",
    //헤더
    headers: {
      "Content-type": "application/json"
    },
    //이건 오브잭트를 문자열로 바꿔주는 부분
    body: JSON.stringify(loginData)
  })
  const json = await res.json()//외않됌? 포인트 res.json()도 비동기. await을 해줘야한다.
  localStorage.setItem("Token", json.user.token);
  localStorage.setItem("accountName", json.user.accountname);
  localStorage.setItem("user-profile", json.user.image);
  localStorage.setItem('userId', json.user.id);
  location.href = "./index.html"

}
const $loginBtn = document.querySelector('#login_btn')
$loginBtn.addEventListener("click", login)
