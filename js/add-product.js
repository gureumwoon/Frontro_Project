const productNameInput = document.querySelector('#product-name');
const saveButton = document.querySelector('.nav > button');
const productPriceInput = document.querySelector('#product-price');
const warningTextList = document.querySelectorAll('.warning-text');
const productUrlInp = document.querySelector('#product-link')
const inpImage = document.querySelector("#real-input");
const backBtn = document.querySelector('.btn-back');

// 뒤로가기 버튼
backBtn.addEventListener('click', () => {
    history.back();
});


// 업로드 할 상품 이미지 미리보기

function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewImage = document.querySelector('.img-box');
            previewImage.setAttribute('width', '322px')
            previewImage.setAttribute('height', '204px')
            previewImage.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('real-input').addEventListener('change', (e) => {
    readImage(e.target);
})

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

// api 상품 업로드 

// console.log(localStorage.getItem("Token"))
// if (localStorage.getItem("Token")) {
//     postData()
// }


async function imageUpload(files, index) {
    let formData = new FormData();
    formData.append('image', files[index]);
    const res = await fetch("http://146.56.183.55:5050/image/uploadfile", {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    const productImgName = data["filename"];
    return productImgName;
}

async function postData(e) {
    const itemName = productNameInput.value;
    const itemPrice = Number(productPriceInput.value.replaceAll(",", ""), 10); //number로 변환
    const itemLink = productUrlInp.value;
    const imageUrls = []
    const files = inpImage.files
    const token = localStorage.getItem('Token');
    try {
        for (let index = 0; index < files.length; index++) {
            const imgurl = await imageUpload(files, index)
            //완성된 url을 만들어서 넣어준다.
            imageUrls.push("http://146.56.183.55:5050" + "/" + imgurl)
        }
        const res = await fetch(`http://146.56.183.55:5050/product`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                product: {
                    "itemName": itemName,
                    "price": itemPrice,
                    "link": itemLink,
                    "itemImage": imageUrls + '',
                },
            }),
        });
        const json = await res.json();
        if (res.status == 200) {
            location.href = 'your_profile.html';
        } else {
            console.log(json);
        }
    } catch (err) {
        alert(err);
    }
}

saveButton.addEventListener('click', e => {
    postData()
});



