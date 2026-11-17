/* code goes here */
// Bước 1: Tạo thẻ <p> mới và chèn vào #first
var first = document.getElementById("first");
var text = document.createTextNode("this is programmatically created");
var p = document.createElement("p");
p.appendChild(text);
first.appendChild(p);

// Bước 3: Xóa phần tử có id="deleteThisOne"
var icons = document.getElementById("iconList");
icons.removeChild(document.getElementById("deleteThisOne"));