const iconBack = document.querySelector('.box-search > img');
console.log(iconBack);

iconBack.addEventListener('click', () => {
    // window.location.href = "home.html";
    history.back(); //이전페이지로 이동
})
