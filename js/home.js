const goToSearchPage = document.querySelector('.header > button');
const goToSearchPageBtn = document.querySelector('.main-icon > button');
const goToreload = document.querySelector('#home');
const goToChat = document.querySelector('#chat-list');
const goToAddProduct = document.querySelector('#edit');


goToSearchPage.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

goToSearchPageBtn.addEventListener('click', () => {
    window.location.href = "search_2.html";
})

goToreload.addEventListener('click', () => {
    window.location.reload();
})

goToChat.addEventListener('click', () => {
    window.location.href = "chat_list.html";
})

goToAddProduct.addEventListener('click', () => {
    window.location.href = "add_product.html";
})