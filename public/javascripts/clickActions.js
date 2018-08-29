function addProduct() {
    window.location.href = '/product/add';
}

function cancelProductAdd() {
    window.location.href = '/product/manager';
}

function registerCustomer() {
    window.location.href = '/user/create';
}

function signinToCheckOut() {
    window.location.href = '/cart/signin';
}

function checkOut() {
    window.location.href = '/cart/checkout';
}

function addToCart(id) {
    let quantity = document.getElementById(id).value;    
    window.location.href = `/cart/add/${id}/qty/${quantity}`;
}

function exportByName() {
    let productName = $('#prodnameXML').val();
    if (document.getElementById('optByNameXML').checked) {
        window.location.href = `/product/export/xml/${productName}`;
    } else {
        window.location.href = `/product/export/json/${productName}`;
    }
}

function exportByRange() {
    let start = document.getElementById('startRange').value;
    let end = document.getElementById('endRange').value;
    if (document.getElementById('optByRangeXML').checked) {
        window.location.href = `/product/export/xml/start/${start}/end/${end}`;
    } else {
        window.location.href = `/product/export/json/start/${start}/end/${end}`;
    }
}

function search() {
    let searchText = document.getElementById('searchtext').value;
    window.location.href = `/product/search/${searchText}`;
}

function upload() {
    let inputFile = document.getElementById('uploadImage');
    let file = inputFile.files[0];

    const formData = new FormData();

    formData.append('files[]', file);

    let url = '/product/uploadimage'
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        document.getElementById('imagePath').value = '/public/images/products/' + file.name;
    });
}

function validateQuantity(input) {
    let inputValue = Number(input.value);
    let isValid = true;
    if (!Number.isInteger(inputValue)) {
        alert(`Decimals not allowed`);
        isValid = false;
    }

    if (isValid && (inputValue < Number(input.min) || inputValue > Number(input.max))) {
        alert(`Quantity must be in between ${input.min} and ${input.max}`);
        input.value = input.min;
        isValid = false;
    }
    if (!isValid){
        input.value = input.min;
        return false;
    }
}