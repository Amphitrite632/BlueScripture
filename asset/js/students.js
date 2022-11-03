let outputEle = document.getElementById("students") //生徒一覧ビューの出力先要素を取得
let filtersEle = document.getElementById("filters") //フィルター要素を取得
let filtersEleHeight = 0
let path = "/asset/json/studentslist.json" //生徒一覧のJSONファイルのパスを設定

/**生徒一覧のJSONファイルを取得して関数[jsonToList]に渡す*/
function getJSON() {
    const req = new Request(path)
    fetch(req)
        .then(response => response.json())
        .then(json => {
            jsonToList(json)
        });
}

/**JSONデータを生徒一覧ビューに変換する*/
function jsonToList(jsonData) {
    let output = ""
    for (let i = 0; i < jsonData.length; i++) {
        //output += "<a class=\"student\"  href=\"/students?student=" + jsonData[i].Name + "\" >\n<div class=\"student-container\">\n<div class=\"student-container-top\">\n"
        output += "<a class=\"student\">\n<div class=\"student-container\">\n<div class=\"student-container-top\">\n"
        if (jsonData[i].Role == "SPECIAL") {
            output += "<div class=\"student-special\"></div>\n"
        } else if (jsonData[i].Role == "STRIKER") {
            output += "<div class=\"student-striker\"></div>\n"
        }

        output += "<div class=\"student-icon\" style=\"background-image: url(/asset/images/student_icon/" + jsonData[i].Name + "_icon.png);\"></div>\n"

        output += "<div class=\"student-name-container\">\n<div class=\"student-name-ruby\">" + jsonData[i].Ruby + "</div>\n<div class=\"student-name\">" + jsonData[i].FullName + "</div>\n</div>\n</div>"

        output += "<div class=\"student-container-bottom\">\n"

        if (jsonData[i].Atk == "爆発") {
            output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-red);\">爆発</div>\n"
        } else if (jsonData[i].Atk == "貫通") {
            output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-yellow);\">貫通</div>\n"
        } else if (jsonData[i].Atk == "神秘") {
            output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-blue);\">神秘</div>\n"
        }

        if (jsonData[i].Def == "軽装") {
            output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-red);\">軽装</div>\n"
        } else if (jsonData[i].Def == "重装") {
            output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-yellow);\">重装</div>\n"
        } else if (jsonData[i].Def == "特殊") {
            output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-blue);\">特殊</div>\n"
        }

        output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-gray);\">" + jsonData[i].Position + "</div>\n"

        output += "<div class=\"student-params\" style=\"background-color:var(--color-student-params-gray);\">" + jsonData[i].Class + "</div>\n"

        output += "</div>\n</div>\n</a>"
    }
    outputEle.innerHTML = output
}

/**生徒一覧を名前順にソートする*/
function filterList() {
    const query = {}
    filterEles = Array.prototype.slice.call(document.getElementsByClassName("filter"))
    for (let i = 0; i < filterEles.length; i++) {
        if (filterEles[i].checked == true) {
            const a= query[filterEles[i].dataset.filterKey] = Array.isArray(query[filterEles[i].dataset.filterKey])? query[filterEles[i].dataset.filterKey] : []
            a.push(filterEles[i].value)
        }
    }
    fetch(path)
        .then(response => response.json())
        .then(json => {
            let arr = json.slice() // shallow copy
            for (const [key, value] of Object.entries(query)) {
                arr = arr.filter(elem => value.includes(elem[key]))
            }
            if (document.getElementById("name-ascend").checked) {
                arr.sort(function (a, b) {
                    if (a["Ruby"] < b["Ruby"]) return -1;
                    else if (b["Ruby"] < a["Ruby"]) return 1;
                    else return 0;
                });
            } else if (document.getElementById("name-descend").checked) {
                arr.sort(function (a, b) {
                    if (a["Ruby"] > b["Ruby"]) return -1;
                    else if (b["Ruby"] > a["Ruby"]) return 1;
                    else return 0;
                });
            }
            jsonToList(arr)
        })
}

/**フィルター要素がトグルされたときに要素の高さを切り替える*/
function toggleFilter(isFilterVisible) {
    if (isFilterVisible === true) {
        filtersEle.style.height = filtersEleHeight + 30 + "px"
    } else if (isFilterVisible === false) {
        filtersEle.style.height = "0px"
    }
}

/**フィルターをトグルした時のトランジションのためにフィルター要素の高さの最大値を取得したあと、高さをゼロに設定する*/
function init() {
    filtersEleHeight = filtersEle.offsetHeight
    filtersEle.style.height = "0px"
}

document.addEventListener("DOMContentLoaded", (event) => {
    init()
    getJSON()
})

//表示領域がリサイズされるたびにフィルター要素の高さを設定しなおす
window.addEventListener("resize", (event) => {
    if (document.getElementById("filter-toggle").checked) {
        filtersEle.style.height = "auto"
        filtersEleHeight = filtersEle.offsetHeight
        filtersEle.style.height = filtersEleHeight + 30 + "px"
    } else {
        filtersEle.style.height = "auto"
        filtersEleHeight = filtersEle.offsetHeight
        filtersEle.style.height = "0px"
    }
})