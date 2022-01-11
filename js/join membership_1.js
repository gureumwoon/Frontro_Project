// 이메일 유효하지 않을 시

document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.querySelector('#input-box');
  const inputAlert = document.querySelector('.input_alert');
  const isEmail = (value) => {
    // 골뱅이가 있고 골뱅이 뒤에 점이 있다면 
    return (value.indexOf('@') > 1) &&
      (value.split('@')[1].indexOf('.') > 1)
  }

  inputBox.addEventListener('keyup', (event) => {
    const value = event.currentTarget.value
    if (isEmail(value)) {
      inputAlert.style.color = "green"
      inputAlert.textContent = ``
    } else {
      inputAlert.style.color = 'red'
      inputAlert.textContent = `*이미 가입된 이메일 주소입니다.`
    }
  })
})

// 비밀번호 글자수 초과 시

