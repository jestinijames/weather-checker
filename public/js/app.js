const weatherForm  = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
e.preventDefault();

const searchText  = document.querySelector('input');
const search = searchText.value;

messageOne.textContent = "Searching...";
messageTwo.textContent = "";

fetch('http://localhost:3000/weather?address='+search).then((response)=>{
response.json().then((data)=>{
if(data.error) {
messageOne.textContent = data.error;
}
else {
messageOne.textContent = data.location;
messageTwo.textContent = data.forecast;
}
});
});
});