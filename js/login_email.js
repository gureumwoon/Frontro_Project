// function getInput() {
//     console.log(document.querySelector("#input-box-id").value);
//     console.log(document.querySelector("#input-box-pw").value);
// }
// // 비동기로 동하는것을 명시해줘야 await을 할 수 있다!
// async function login() {

//   const email = document.querySelector("#input-box-id").value
//   const pw = document.querySelector("#input-box-pw").value
//   const warningTextList = document.querySelectorAll('.warning-text');

//   const url = "http://146.56.183.55:5050"
//   const loginData = {
//     "user": {
//       "email": email,
//       "password": pw
//     }
//   }

//   const res = await fetch(url + '/user/login', {
//     //메소드 구분
//     method: "POST",
//     //헤더
//     headers: {
//       "Content-type": "application/json"
//     },
//     //이건 오브잭트를 문자열로 바꿔주는 부분
//     body: JSON.stringify(loginData)
//   })
//   const json = await res.json()//외않됌? 포인트 res.json()도 비동기. await을 해줘야한다.
//   localStorage.setItem("Token", json.user.token);
//   localStorage.setItem("accountName", json.user.accountname);
//   localStorage.setItem("user-profile", json.user.image);
//   localStorage.setItem('userId', json.user._id);
//   location.href = "./index.html"
// }

// // input에 입력시, 비밀번호 유효성 검사 경고 출력
// pw.addEventListener('input', () => {
//   if (!validPassword()) {
//       warningTextList[1].classList.remove('invisible');
//       if (pw.value === "") {
//           warningTextList[1].classList.add('invisible');
//       }
//       return;
//   }
//   warningTextList[1].classList.add('invisible');
// })

// // input에 입력시 경고 띄워주기
// pw.addEventListener('input', () => {
//   if (!isUserNameInputValid()) {
//       warningTextList[2].classList.remove('invisible');
//       if (userNameInput.value === "") {
//           warningTextList[2].classList.add('invisible');
//       }
//       return;
//   }
//   warningTextList[2].classList.add('invisible');

//   userIdInput.addEventListener('input', () => {
//       if (!isUserIdInputValid()) {
//           warningTextList[3].classList.remove('invisible');
//           if (userIdInput.value === "") {
//               warningTextList[3].classList.add('invisible');
//           }
//           return;
//       }
//       startButton.classList.add('active');
//       warningTextList[3].classList.add('invisible');
//   })
// })

// const $loginBtn = document.querySelector('#login_btn')
// $loginBtn.addEventListener("click", login)


const join = document.querySelector('#email_signIn')
const error = document.querySelector('.inp-error')

function getInput() {
  console.log(document.querySelector("#input-box-id").value)
  console.log(document.querySelector("input-box-pw").value)
}

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
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },

    body: JSON.stringify(loginData)
  })
  const json = await res.json()
  if (json.status === 422) {
    error.innerHTML = `*${json.message}`
  }
  localStorage.setItem("Token", json.user.token);
  localStorage.setItem("accountName", json.user.accountname);
  localStorage.setItem("user-profile", json.user.image);
  localStorage.setItem('userId', json.user._id);
  location.href = "./index.html"
}
const $loginBtn = document.querySelector('.login_btn')
$loginBtn.addEventListener("click", login)

join.addEventListener('click', function () {
  location.href = "./join.html"
})
