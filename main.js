let modal = document.getElementById('my-modal');
let editModal = document.getElementById('edit-modal');
let orderModal = document.getElementById('order-modal');
let customersModal = document.getElementById('customers-modal');
let btn = document.getElementById("create-btn");
let createBtnOrders = document.getElementById("create-btn-orders");
let createBtnCustomers = document.getElementById("customer-create-btn");
let closeModal = document.getElementById("close");
let closeEditModal = document.getElementById("edit-close");
let closeCustomersModal = document.getElementById("customers-modal-close");
let closeOrderModal = document.getElementById("order-modal-close");

const addBtn = document.getElementById('modal-btn');
const editBtn = document.getElementById('edit-modal-btn')
const addBtnCustomers = document.getElementById('customers-add-btn')
// const addBtnOrders = document.getElementById('orders-add-btn')
const submitBtn = document.getElementById('submit-btn')

const stockTable = document.getElementById('stock-table');
const formCount = document.getElementById('form-count');
const formPrice = document.getElementById('form-price');
const formType = document.getElementById('form-type');
const stockPrice = document.getElementById('stock-price')
const dailySale = document.getElementById('daily-sale')
const newPetType = document.getElementById('pets-type')
const newPin = document.getElementById('order-modal-pin')

const customerFullName = document.getElementById('customer-name')
const customerPhone = document.getElementById('customer-phone')
const customerPin = document.getElementById('customer-pin')


const orderCount = document.getElementById('order-count')

// const orderName = document.getElementById('order-name')
// const orderSurname = document.getElementById('order-surname')
// const orderPhone = document.getElementById('order-phone')
const customersData = document.getElementById('customers-data')
const ordersData = document.getElementById('orders-data')

const editFormId = document.getElementById('edit-form-id')
const editFormCount = document.getElementById('edit-form-count')
const editFormPrice = document.getElementById('edit-form-price')
const editFormType = document.getElementById('edit-form-type')

// const ordersDatabase = document.getElementById('orders-database')



// MODAL OPENING
btn.addEventListener('click', function () {
    modal.style.display = "flex";
    // orderCleaner()
})

createBtnCustomers.addEventListener('click', function () {
    customersModal.style.display = "flex"
})

createBtnOrders.addEventListener('click', function () {
    orderModal.style.display = "flex";
    // orderCleaner()
})


// MODAL CLOSING

// stock modal
closeModal.onclick = function () {
    modal.style.display = "none";
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        modal.style.display = "none";
    }
})

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } if (event.target == editModal) {
        editModal.style.display = "none"
    } if (event.target == customersModal) {
        customersModal.style.display = "none"
    }
}


// edit modal
closeEditModal.onclick = function () {
    editModal.style.display = "none";
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        editModal.style.display = "none";
    }
})


// customers modal
closeCustomersModal.onclick = function () {
    customersModal.style.display = "none";
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        customersModal.style.display = "none";
    }
})

// order modal
closeOrderModal.onclick = function () {
    orderModal.style.display = "none";
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        orderModal.style.display = "none";
    }
})


// //////////   EDIT MODAL   ///////////////////////////////////////////////////////////////////////////////////
function editFunction(givenId) {
    // orderCleaner()
    editModal.style.display = "flex";

    let selectedItem;

    newArr.forEach((item) => {
        if (item.id === givenId) {
            selectedItem = item;
        }
    });

    document.getElementById('edit-form-id').value = selectedItem.id
    document.getElementById('edit-form-count').value = selectedItem.count
    document.getElementById('edit-form-price').value = selectedItem.price
    document.getElementById('edit-form-type').value = selectedItem.type
}

editBtn.addEventListener('click', function () {

    const newObj = {
        count: '',
        price: '',
        type: ''
    };

    newObj.count = editFormCount.value;
    newObj.price = editFormPrice.value;
    newObj.type = editFormType.value;
    const newValueArr = Object.values(newObj);

    if (newValueArr.includes('')) {
        alert('Please fill all inputs')
        return
    }

    newArr.forEach((item) => {
        if (item.id == editFormId.value) {
            item.count = editFormCount.value
            item.price = editFormPrice.value
            item.type = editFormType.value
        }
        editModal.style.display = "none"

    });

    stockPriceCalc()
    newData()
})

function deleteFunction(givenId) {
    if (confirm('Do you want to delete stock data?')) {
        newArr.forEach((item, index) => {
            if (item.id === givenId) {
                newArr.splice(index, 1);
            }
        })

        stockPriceCalc()
        typeRender()
        newData()
    }
}

function stockPriceCalc() {
    let stockPriceUpdate = 0
    for (let i = 0; i < newArr.length; i++) {
        stockPriceUpdate += newArr[i].count * newArr[i].price
    }

    stockPrice.innerText = stockPriceUpdate + ' ' + 'USD'
}

                            
let newArr = []
let idd = 1;

addBtn.addEventListener('click', function () {
    const newObj = {
        id: '',
        count: '',
        price: '',
        type: ''
    };

    newObj.id = idd++;
    newObj.count = formCount.value;
    newObj.price = formPrice.value;
    newObj.type = formType.options[formType.selectedIndex].text;
    const newValueArr = Object.values(newObj);


    let arrType = []

    newArr.forEach(element => {
        arrType.push(element.type)
    });

    if (newValueArr.includes('') || formType.value == 'add-pet') {
        alert('Please fill all inputs')
        newObj.id = idd--;
        return
    } else if (!arrType.includes(newObj.type)) {
        newArr.push(newObj);
        modal.style.display = "none";
        formCount.value = '';
        formPrice.value = '';
        formType.value = 'add-pet';
        newData();
    } else {
        for (let i = 0; i < newArr.length; i++) {
            const newType = newArr[i]
            if (newType.type == newObj.type) {
                newType.count = parseInt(newType.count) + parseInt(newObj.count)
                newObj.id = idd--;
                modal.style.display = "none";
                formCount.value = '';
                formPrice.value = '';
                formType.value = 'add-pet';
                newData();
            }
        }
    }

    stockPriceCalc()
    typeRender()
});

function newData() {
    let html = `     
    <tr class="pet-shop__stock__table-heading">
    <th id="stock__tbl__id">Id</th>
    <th id="stock__tbl__count">Count</th>
    <th id="stock__tbl__price">Price (USD)</th>
    <th id="stock__tbl__type">Type</th>
    <th id="stock__tbl__action">Action</th>
    </tr>`;

    for (let i = 0; i < newArr.length; i++) {
        const modalData = newArr[i];

        html += `  <tr class="pet-shop__stock__table-data">
        <td id="stock-data-id">${modalData.id}</td>
        <td id="stock-data-count">${modalData.count}</td>
        <td id="stock-data-price">${modalData.price}</td>
        <td id="stock-data-type">${modalData.type}</td>
        <td id="stock-data-action"> 
            <button class="stock-bt edit-button" id="edit-btn" onclick="editFunction(${modalData.id})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          </button>
            <button class="stock-bt delete-button" id="delete-btn" onclick="deleteFunction(${modalData.id})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          </button>
        </td>
    </tr>
        `;
    }

    stockTable.innerHTML = html;
}

/////////////    CUSTOMERS    /////////////////////////////////////////////////////////////////////////////////////////////
let customersArr = []
let customersId = 1;
addBtnCustomers.addEventListener('click', function () {
    const newObj = {
        // id: '',
        // fullName: '',
        // phone: '',
        // totalAmount: '',
        // count: ''
    }

    newObj.id = customersId++;
    newObj.fullName = customerFullName.value;
    newObj.phone = customerPhone.value
    newObj.pin = customerPin.value.toUpperCase()
    newObj.totalAmount = 0;
    newObj.count = 0;

    const newValueArrCustomers = Object.values(newObj);

    let customersPin = []

    customersArr.forEach(element => {
        customersPin.push(element.pin)
    });


    if (newValueArrCustomers.includes('')) {
        alert('Please fill all inputs')
        newObj.id = customersId--;
        return
    } else if (customersPin.includes(newObj.pin)) {
        alert('Customer with this PIN exists in the database')
        newObj.id = customersId--;
        return
    } else {
        customersArr.push(newObj);
        customersModal.style.display = "none";
        customerFullName.value = '';
        customerPhone.value = '';
        customerPin.value = '';
        // newData();
        newCustomer()
    }

    pinRender()
})

function newCustomer() {
    let html = `<tr class="pet-shop__customers__heading pet-shop__stoc__table-heading">
                    <th id="customers__tbl__id">Id</th>
                    <th id="customers__tbl__name">Full name</th>
                    <th id="customers__tbl__phone">Phone</th>
                    <th id="customers__tbl__pin">PIN</th>
                    <th id="customers__tbl__phone">Total amount</th>
                    <th id="customers__tbl__count">Count</th>
                </tr>`
    for (let i = 0; i < customersArr.length; i++) {
        const newCustomerData = customersArr[i]

        html += `
        <tr class="pet-shop__customers__table-data">
            <td id="customers-data-id">${newCustomerData.id}</td>
            <td id="customers-data-fullname">${newCustomerData.fullName}</td>
            <td id="customers-data-phone">${newCustomerData.phone}</td>
            <td id="customers-data-pin">${newCustomerData.pin}</td>
            <td id="customers-data-amount">${newCustomerData.totalAmount}</td>
            <td id="customers-data-count">${newCustomerData.count}</td>
         </tr>`;
    }

    customersData.innerHTML = html
}


/////////   ORDERS  ////////////////////////////////////////////////////////////
let ordersArr = []
let ordersId = 1;
let saleCalc = 0

submitBtn.addEventListener('click', function() {
    const newObj = {
        id: '',
        pin: '',
        type: '',
        price: '',
        count: '',
        totalPrice: ''
    }
    
    newObj.id = ordersId++;
    newObj.pin = newPin.options[newPin.selectedIndex].text;
    newObj.type = newPetType.options[newPetType.selectedIndex].text;
    newObj.count = orderCount.value;
    
    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].type == newObj.type) {
            newObj.price = newArr[i].price
            newObj.totalPrice = newObj.price * newObj.count;
        }
    }
    
    const newValueArrOrders = Object.values(newObj);
        
    
    if (newValueArrOrders.includes('')) {
        alert('Please fill all inputs')
        newObj.id = ordersId--;
        return
    } 

    for (let i = 0; i < newArr.length; i++) {
        const submitInfo = newArr[i]
    
        if (submitInfo.type == newObj.type && submitInfo.count - newObj.count < 0) {
            alert(`NOT ENOUGH STOCK! available count: ${submitInfo.count}`);
            newObj.id = ordersId--;
            return;
        } else if (submitInfo.type == newObj.type) {
            ordersArr.push(newObj)
            orderModal.style.display = "none";
            orderCount.value = '';
            newPetType.value = 'order-choose-type'
            newPin.value = 'order-modal-add-pin';
        
            submitInfo.count -= newObj.count
            saleCalc += newObj.count * submitInfo.price
    
            dailySale.innerText = saleCalc + ' ' + 'USD'
    
        }
    }

    for (let i = 0; i < customersArr.length; i++) {
        if (newObj.pin == customersArr[i].pin) {
            customersArr[i].totalAmount += newObj.totalPrice;
            customersArr[i].count += 1
        }
    }

    newData();
    newCustomer();
    newOrder();
    stockPriceCalc()
})


function newOrder() {
    let html = `  <tr class="pet-shop__orders__heading">
                    <th id="orders__tbl__id">Id</th>
                    <th id="orders__tbl__pin">PIN</th>
                    <th id="orders__tbl__type">Type</th>
                    <th id="orders__tbl__price">Price</th>
                    <th id="orders__tbl__count">Count</th>
                    <th id="orders__tbl__total-price">Total price</th>
                </tr>`
    for (let i = 0; i < ordersArr.length; i++) {
        const newOrderData = ordersArr[i]

        html += `
        <tr class="pet-shop__orders__table-data">
            <td id="orders-data-id">${newOrderData.id}</td>
            <td id="orders-data-pin">${newOrderData.pin}</td>
            <td id="orders-data-type">${newOrderData.type}</td>
            <td id="orders-data-price">${newOrderData.price}</td>
            <td id="orders-data-count">${newOrderData.count}</td>
            <td id="orders-data-total-price">${newOrderData.totalPrice}</td>
         </tr>`;
    }

    ordersData.innerHTML = html
}


function typeRender() {
    let html = `
        <option value="order-choose-type"></option>
     `;

    for (let i = 0; i < newArr.length; i++) {

        const typeData = newArr[i];

        html += `  
        <option value="">${typeData.type}</option>
        `;
    }

    newPetType.innerHTML = html;
}
function pinRender() {
    let html = `
        <option value="order-modal-add-pin"></option>
     `;

    for (let i = 0; i < customersArr.length; i++) {

        const typeData = customersArr[i];

        html += `  
        <option value="">${typeData.pin}</option>
        `;
    }

    newPin.innerHTML = html;
}