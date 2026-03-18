let food = document.querySelector(".food");

let indian = document.querySelector("#indian");
let canadian = document.querySelector("#canadian");
let american = document.querySelector("#american");
let thai = document.querySelector("#thai");
let british = document.querySelector("#british");
let russian = document.querySelector("#russian");

let search = document.querySelector("#search")

let reciepe;

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${search.value}`)
.then(res => res.json())
.then((data)=>{
    console.log(data)
})