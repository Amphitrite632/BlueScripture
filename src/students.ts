let fillterToggleButton = document.getElementById("filter-toggle") as HTMLInputElement
let outputEle = document.getElementById("students") //生徒一覧ビューの出力先要素を取得
let filtersEle = document.getElementById("filters") //フィルター要素を取得
let filtersEleHeight = 0
let path = "/asset/json/studentslist.json" //生徒一覧のJSONファイルのパスを設定

interface StudentInfo {
    URL: string,
    Name: string,
    FullName: string,
    Ruby: string,
    Role: string,
    Weapon: string,
    Position: string,
    Class: string,
    School: string,
    Atk: string,
    Def: string,
    Town_apt: string,
    Outdoor_apt: string,
    Indoor_apt: string,
    Equip1: string,
    Equip2: string,
    Equip3: string,
    Birthday: string
    [key: string]: string;
}

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
function jsonToList(jsonData: [StudentInfo]) {
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
    if (outputEle != null) {
        outputEle.innerHTML = output
    }   
}

/**生徒一覧を名前順にソートする*/
function filterList() {
    const query: string[] = []
    var filterEles = Array.prototype.slice.call(document.getElementsByClassName("filter"))
    for (let i = 0; i < filterEles.length; i++) {
        if (filterEles[i].checked == true) {
            query.push(filterEles[i].value)
        }
    }
    fetch(path)
        .then(response => response.json())
        .then(json => {
            let arr = json.slice()
            console.log(arr)
            for (let i = 0; i < query.length; i++) {
                arr = arr.filter((elem:string[]) => {
                    var value = Object.values(elem)
                    return value.includes(query[i])
                })
                console.log(arr)
            }
            var acsendEle = document.getElementById("name-ascend") as HTMLInputElement
            var decsendEle = document.getElementById("name-descend") as HTMLInputElement
            if (acsendEle!.checked) {
                arr.sort(function (a: StudentInfo, b: StudentInfo) {
                    if (a["Ruby"] < b["Ruby"]) return -1;
                    else if (b["Ruby"] < a["Ruby"]) return 1;
                    else return 0;
                });
            } else if (decsendEle!.checked) {
                arr.sort(function (a: StudentInfo, b: StudentInfo) {
                    if (a["Ruby"] > b["Ruby"]) return -1;
                    else if (b["Ruby"] > a["Ruby"]) return 1;
                    else return 0;
                });
            }
            jsonToList(arr)
        })
}

/**フィルター要素がトグルされたときに要素の高さを切り替える*/
function toggleFilter(isFilterVisible: boolean) {
    if (isFilterVisible === true) {
        filtersEle!.style.height = filtersEleHeight + 30 + "px"
    } else if (isFilterVisible === false) {
        filtersEle!.style.height = "0px"
    }
}

/**フィルターをトグルした時のトランジションのためにフィルター要素の高さの最大値を取得したあと、高さをゼロに設定する*/
function init() {
    filtersEleHeight = filtersEle!.offsetHeight
    filtersEle!.style.height = "0px"
}

document.addEventListener("DOMContentLoaded", (event) => {
    init()
    getJSON()
})

//表示領域がリサイズされるたびにフィルター要素の高さを設定しなおす
window.addEventListener("resize", (event) => {
    if (fillterToggleButton.checked) {
        filtersEle!.style.height = "auto"
        filtersEleHeight = filtersEle!.offsetHeight
        filtersEle!.style.height = filtersEleHeight + 30 + "px"
    } else {
        filtersEle!.style.height = "auto"
        filtersEleHeight = filtersEle!.offsetHeight
        filtersEle!.style.height = "0px"
    }
})