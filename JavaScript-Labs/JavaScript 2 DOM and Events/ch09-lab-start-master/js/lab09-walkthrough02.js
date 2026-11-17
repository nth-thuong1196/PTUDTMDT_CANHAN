/* code goes here */
var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
    console.log("child " + i + " = " + stories.childNodes[i] + " nodeType=" + stories.childNodes[i].nodeType);
    // Bước 7: Kiểm tra nodeType == 1 (Element Node) để đổi màu nền
    if (stories.childNodes[i].nodeType == 1) {
        stories.childNodes[i].style.backgroundColor = "green";
    }
}