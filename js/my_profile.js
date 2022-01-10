const profileFixButton = document.querySelector('.profile_footer > button:first-child');
const addProductButton = document.querySelector('.profile_footer > button:nth-child(2)');

profileFixButton.addEventListener('click', () => {
    window.location.href = 'profile_modification.html';
})

addProductButton.addEventListener('click', () => {
    window.location.href = 'add_product.html';
})