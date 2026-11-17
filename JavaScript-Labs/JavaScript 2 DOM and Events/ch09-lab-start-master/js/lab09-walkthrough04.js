/* code goes here */
var btn = document.getElementById("testButton");
var img = document.getElementById("mainImage");

// Bước 3 & 4: Đổi màu ảnh khi di chuột vào/ra
img.addEventListener("mouseover", function (event) {
    img.className = "makeItGray";
});

img.addEventListener("mouseout", function (event) {
    img.className = "makeItNormal";
});

// Bước 6: Ẩn/hiện đoạn văn bản có độ trễ animation
function simpleHandler(event) {
    var content = document.getElementById("content");
    if (btn.innerHTML == "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        setTimeout(function () {
            content.style.display = "none";
        }, 1000);
    } else {
        btn.innerHTML = "Hide";
        content.style.display = "block";
        setTimeout(function () {
            content.className = "makeItNormal";
        }, 500);
    }
}

btn.addEventListener("click", simpleHandler);
