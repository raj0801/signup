let input = document.querySelector("input");
let imageArr = [];
getData();
displayImages();
let uname = JSON.parse(localStorage.getItem("uname"))

input.addEventListener("change", (event) => {
  const files = event.target.files;
  for (var i = 0, f; (f = files[i]); i++) {
    let convertMB = (files[i].size / (1024 * 1024)).toFixed(2);
    var reader = new FileReader();
    reader.onload = function (e) {
      var imgObj = {uname:uname[0].uname,imgUrl:e.target.result}
      if (convertMB <= 2) {
        imageArr.push(imgObj);
        displayImages();
        setData();
      }
    };
    reader.readAsDataURL(f);
  }
});

function displayImages() {
  let images = "";
  // console.log(uname)
  imageArr.forEach((image, index) => {
    images += `<div class="container">
        <span>${image.uname}</span>
        <img class="image" src="${image.imgUrl}">
        <span class="delete" onclick="deleteImages(${index})">&times;</span>
        <button onclick="countInc()" class=emoji>&#x1F44D;</button> 
        <input type="text" id="inc" value="0"></input>
        </div>`;
  });
  document.getElementById("list").innerHTML = images;
}
function setData() {
  localStorage.setItem("images", JSON.stringify(imageArr));
}
function getData() {
  let Data = localStorage.getItem("images");
  if (Data) {
    imageArr = JSON.parse(Data);
  } else {
    setData();
  }
}
function deleteImages(index) {
  imageArr.splice(index, 1);
  setData();
  displayImages();
}
var i=0;
function countInc(){
  document.getElementById('inc').value = ++i;
}

