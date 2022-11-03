let outputEle = document.getElementById("student")
let path = "/asset/json/studentslist.json"

function getJSON() {
    const req = new Request(path)
    fetch(req)
        .then(response => response.json())
        .then(json => {
            info = json.find(elem => elem.Name == new URLSearchParams(window.location.search).get("student"))
            if (info == undefined) {
                window.location.replace("/students/?student=ユウカ")
                alert("リクエストされたキャラクターはデータに存在しません。ページを移動します")
            }
            jsonToPage(info)
        });
}

function jsonToPage(info) {
    document.getElementById("portrait").src = (`/asset/images/student_portrait/${info["Name"]}_Portrait.webp`)

    let output = document.createElement("div")

    outputEle.appendChild(output)
}

document.addEventListener("DOMContentLoaded", (event) => {
    getJSON()
})