const productNameInput = document.querySelector('#product-name');
const saveButton = document.querySelector('.nav > button');
const productPriceInput = document.querySelector('#product-price');
const warningTextList = document.querySelectorAll('.warning-text');

const isProductNameInputValid = () => {
    const productName = productNameInput.value;
    if (productName.length < 2 || 15 < productName.length) {
        return false;
    }
    return true;
}

const isPriceValid = () => {
    const reg1 = /[0-9]/g;
    const isValid = reg1.test(price);
    return isValid; // 숫자일때 true출력
}

// 상품명 유효성 검사

productNameInput.addEventListener('input', () => {
    if (!isProductNameInputValid()) {
        warningTextList[0].classList.remove('invisible');
        if (productNameInput.value === "") {
            warningTextList[0].classList.add('invisible');
        }
        return;
    }

    // 상품 가격 유효성 검사

    warningTextList[0].classList.add('invisible');
    productPriceInput.addEventListener('input', () => {
        const price = productPriceInput.value;
        if (isPriceValid()) {
            const productPrice = Number(price.split(',').join(""));
            const productPriceLocale = productPrice.toLocaleString();
            productPriceInput.value = productPriceLocale;
            warningTextList[1].classList.add('invisible');
        }
        else if (productPriceInput.value === '') {
            warningTextList[1].classList.add('invisible')
        } else {
            stringOut();
        }
        function stringOut() {
            productPriceInput.value = '';
            warningTextList[1].classList.remove('invisible');
        }
        saveButton.classList.add('active');
        warningTextList[0].classList.add('invisible');
    })
})

