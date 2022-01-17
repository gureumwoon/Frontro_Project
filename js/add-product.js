const productNameInput = document.querySelector('#product-name');
const saveButton = document.querySelector('.nav > button');
const productPriceInput = document.querySelector('#product-price');
const warningTextList = document.querySelectorAll('.warning-text');
const productUrlInp = document.querySelector('#product-link')

// 상품명 유효성 검사

productNameInput.addEventListener('input', () => {
    const isProductNameInputValid = () => {
        const productName = productNameInput.value;
        if (productName.length < 2 || 15 < productName.length) {
            return false;
        }
        return true;
    }

    if (!isProductNameInputValid()) {
        warningTextList[0].classList.remove('invisible');
        if (productNameInput.value === "") {
            warningTextList[0].classList.add('invisible');
        }
    } else {
        warningTextList[0].classList.add('invisible');

    }
    uploadBtnCheck()
})

// 상품 가격 유효성 검사

productPriceInput.addEventListener('input', () => {

    const price = productPriceInput.value;

    const isPriceValid = () => {
        const reg1 = /[0-9]/g;
        const isValid = reg1.test(price);
        console.log(isValid); // 숫자일때 true출력
        return isValid;
    }

    if (isPriceValid()) {
        const productPrice = Number(price.split(',').join(""));
        const productPriceLocale = productPrice.toLocaleString();
        productPriceInput.value = productPriceLocale;
        warningTextList[1].classList.add('invisible');
    } else if (productPriceInput.value === '') {
        warningTextList[1].classList.add('invisible')
    } else {
        warningTextList[1].classList.remove('invisible');
    }
    uploadBtnCheck()
})

productUrlInp.addEventListener('input', () => {
    uploadBtnCheck()
})

// 버튼 활성화

function uploadBtnCheck() {
    if (productNameInput.value && productPriceInput.value && productUrlInp.value) {
        saveButton.disabled = false;
        saveButton.classList.add('active')
    } else {
        saveButton.disabled = true;
        saveButton.classList.remove('active')
    }
}




