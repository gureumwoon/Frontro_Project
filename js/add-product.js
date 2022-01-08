const productPriceInput = document.querySelector('#product-price');

productPriceInput.addEventListener('input', () => {
    const productPriceString = productPriceInput.value;
    const productPrice = Number(productPriceString.split(',').join(""));
    const productPriceLocale = productPrice.toLocaleString();
    productPriceInput.value = productPriceLocale;
    if (productPriceLocale === "0") {
        productPriceInput.value = "";
    }
})