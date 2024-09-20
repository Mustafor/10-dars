let elProducts = document.querySelector(".products")
let elSearchLabel = document.querySelector(".admin-label")
let elSearchInput = document.querySelector(".search-input")
let data = []

function renderList(arr){
    elProducts.innerHTML = null
    arr.map(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[400px] p-3 rounded-md bg-teal-500 text-center"
        elItem.innerHTML = `
            <img class="bg-white rounded-md p-5 h-[220px] object-contain" src=${item.images[0]} width="100%"/>
            <h2 class="font-bold text-[20px] mb-[15px] text-slate-300">${item.title}</h2>
            <p class="text-[18px] text-white mb-[10px]">${item.description}</p>
            <strong class="font-bold text-[25px] text-white mb-[15px]">${item.price}$</strong>
            <button onclick="handleOrderBtnClick(${item.id})" class="bg-green-600 block w-full hover:opacity-[0.7] duration-300 text-white font-semibold text-[20px] py-2 rounded-md">Order</button>
        `
        elProducts.appendChild(elItem)
    })
}

fetch("https://api.escuelajs.co/api/v1/products").then(res => res.json()).then(data => {
        renderList(data)  
        localStorage.setItem("products", JSON.stringify(data))
    })

elSearchInput.addEventListener("input", function (e) {
    const products = JSON.parse(localStorage.getItem("products"))
    const filteredData = products.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    renderList(filteredData)
})

const TOKEN = "7792806725:AAEuZ_BFqp9QnsJlqvQrSxUKX1au9RYfGiM"
const CHAT_ID = "-1002478407008"
const API = `https://api.telegram.org/bot${TOKEN}/sendPhoto`

function handleOrderBtnClick(id) {
    const productsList = JSON.parse(localStorage.getItem("products"))
    const orderedObj = productsList.find(item => item.id == id)
   
    let message = `Products Info\n`
    message += `Name: ${orderedObj.title}\n`
    message += `Description: ${orderedObj.description}\n`
    message += `Price: ${orderedObj.price}$\n`

    fetch(API, {
        method: "POST",
        body: JSON.stringify({
            photo: orderedObj.images[0],
            chat_id: CHAT_ID,
            parse_mode: "html",
            caption: message,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}
