// 이메일 유효하지 않을 시

// document.addEventListener('DOMContentLoaded', () => {
//   const inputBox = document.querySelector('#input_box');
//   const inputAlert = document.querySelector('.input_alert');
//   const isEmail = (value) => {
//     // 골뱅이가 있고 골뱅이 뒤에 점이 있다면 
//     return (value.indexOf('@') > 1) &&
//       (value.split('@')[1].indexOf('.') > 1)
//   }

//   inputBox.addEventListener('keyup', (event) => {
//     const value = event.currentTarget.value
//     if (isEmail(value)) {
//       inputAlert.style.color = "green"
//       inputAlert.textContent = ``
//     } else {
//       inputAlert.style.color = 'red'
//       inputAlert.textContent = `*이미 가입된 이메일 주소입니다.`
//     }
//   })
// })

// 비밀번호 글자수 초과 시
// ?

//API 연결

const $emailPw = document.querySelector(".container")
//이메일 중복체크하는 함수
async function checkEmailValid(email) {
  const res = await fetch('http://146.56.183.55:5050/user/emailvalid', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "email": email
      }
    })
  })
  const json = await res.json()
  return json.message == "사용 가능한 이메일 입니다." ? true : false

  // return 이 이메일이 사용가능하지 체크를 할거에요.
}

document.querySelector(".next_btn").addEventListener("click", async () => {
  const email = document.querySelector("#input_box").value
  const pw = document.querySelector("#input_box_pw").value
  // 이메일 패스워드 유효성?? 검사?? 몰?루
  if (pw.length > 5) {
    const emailValid = await checkEmailValid(email)
    if (emailValid) {
      $emailPw.style.display = "none"
      // $profile.style.display = "block"
    } else {
      alert("중복된 이메일입니다.")
      return
    }
    location.href = "join membership_2.html"
  } else {
    alert("비밀번호를 똑바로 하세요좀")
  }
}) 

// async function join() {
//   const email = document.querySelector("#input_box").value;
//   const password = document.querySelector("#input_box_pw").value;

//   try {
//     // const res = await fetch("http://146.56.183.55:5050/user", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     "user": {
//     //       "email": email,
//     //       "password": password,
//     //       "username": userName,
//     //       "accountname": userId,
//     //       "intro": intro,
//     //       "image": imageUrl,
//     //     }
//     //   })
//     // })
//     console.log(res)
//     const json = await res.json()
//     const message = json.message
//     // if(message=="회원가입 성공"){
//     if (res.status == 200) {
//       // location.href = "join membership_2.html"
//     } else {
//       console.log(json)
//     }
//   } catch (err) {
//     alert(err)
//   }
// }
