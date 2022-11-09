const fillterToggleButton = document.getElementById("filter-toggle") as HTMLInputElement
const outputEle = document.getElementById("students") //生徒一覧ビューの出力先要素を取得
const filtersEle = document.getElementById("filters") //フィルター要素を取得
let filtersEleHeight = 0
const path = "/asset/json/studentslist.json" //生徒一覧のJSONファイルのパスを設定

type StudentInfo = {
    URL: string
    Name: string
    FullName: string
    Ruby: string
    Role: Role
    Weapon: string
    Position: Position
    Class: Class
    School: School
    Atk: Atk
    Def: Def
    Town_apt: string
    Outdoor_apt: string
    Indoor_apt: string
    Equip1: string
    Equip2: string
    Equip3: string
    Birthday: string
}

const ROLE_TYPES = ["STRIKER", "SPECIAL"] as const
type Role = typeof ROLE_TYPES[number]

const ATK_TYPES = ["爆発", "貫通", "神秘"] as const
type Atk = typeof ATK_TYPES[number]

const DEF_TYPES = ["重装", "軽装", "特殊"] as const
type Def = typeof DEF_TYPES[number]

const POSITION_TYPES = ["FRONT", "MIDDLE", "BACK"] as const
type Position = typeof POSITION_TYPES[number]

const CLASS_TYPES = ["タンク", "アタッカー", "ヒーラー", "サポーター", "T.S"] as const
type Class = typeof CLASS_TYPES[number]

const SCHOOL_TYPES = ["アビドス", "アリウス", "ゲヘナ", "百鬼夜行", "ミレニアム", "レッドウィンター", "山海経", "SRT特殊学園", "トリニティ", "ヴァルキューレ", "その他"] as const
type School = typeof SCHOOL_TYPES[number]

type StudentQuery = { key: "Role"; values: Role[] } | { key: "Atk"; values: Atk[] } | { key: "Def"; values: Def[] } | { key: "Position"; values: Position[] } | { key: "Class"; values: Class[] } | { key: "School"; values: School[] }

type Query = {
    Role?: Role[]
    Atk?: Atk[]
    Def?: Def[]
    Position?: Position[]
    Class?: Class[]
    School?: School[] 
}

function checkQueryValues<T extends string>(selections: readonly T[], value: string): value is T {
    return selections.includes(value as T)
}

/**クエリをもとに条件に合う生徒をフィルターする */
function filterWithQueries(students: StudentInfo[], queries: StudentQuery[]): StudentInfo[] {
    const filter: Query = {}
    for (const query of queries){
        switch(query.key){
        case "Role":
            filter.Role = query.values
            break
        case "Atk":
            filter.Atk = query.values
            break
        case "Def":
            filter.Def = query.values
            break
        case "Position":
            filter.Position = query.values
            break
        case "School":
            filter.School = query.values
            break
        }
    }
    return students.filter((student) => {
        const isRoleMatched = typeof filter.Role === "undefined" || filter.Role.includes(student.Role)
        const isAtkMatched = typeof filter.Atk === "undefined" || filter.Atk.includes(student.Atk)
        const isDefMatched = typeof filter.Def === "undefined" || filter.Def.includes(student.Def)
        const isPositionMatched = typeof filter.Position === "undefined" || filter.Position.includes(student.Position)
        const isSchoolMatched = typeof filter.School === "undefined" || filter.School.includes(student.School)
        return isRoleMatched && isAtkMatched && isDefMatched && isPositionMatched && isSchoolMatched
    })
}

/**生徒一覧のJSONファイルを取得して関数[jsonToList]に渡す*/
function getJSON() {
    const req = new Request(path)
    void fetch(req)
        .then((response) => response.json())
        .then((json: StudentInfo[]) => {
            jsonToList(json)
        })
}

/**JSONデータを生徒一覧ビューに変換する*/
function jsonToList(jsonData: StudentInfo[]) {
    let output = ""
    for (const student of jsonData) {
        //output += "<a class=\"student\"  href=\"/students?student=" + student.Name + "\" >\n<div class=\"student-container\">\n<div class=\"student-container-top\">\n"
        output += '<a class="student">\n<div class="student-container">\n<div class="student-container-top">\n'
        if (student.Role == "SPECIAL") {
            output += '<div class="student-special"></div>\n'
        } else if (student.Role == "STRIKER") {
            output += '<div class="student-striker"></div>\n'
        }

        output += '<div class="student-icon" style="background-image: url(/asset/images/student_icon/' + student.Name + '_icon.png);"></div>\n'

        output += '<div class="student-name-container">\n<div class="student-name-ruby">' + student.Ruby + '</div>\n<div class="student-name">' + student.FullName + "</div>\n</div>\n</div>"

        output += '<div class="student-container-bottom">\n'

        if (student.Atk == "爆発") {
            output += '<div class="student-params" style="background-color:var(--color-student-params-red);">爆発</div>\n'
        } else if (student.Atk == "貫通") {
            output += '<div class="student-params" style="background-color:var(--color-student-params-yellow);">貫通</div>\n'
        } else if (student.Atk == "神秘") {
            output += '<div class="student-params" style="background-color:var(--color-student-params-blue);">神秘</div>\n'
        }

        if (student.Def == "軽装") {
            output += '<div class="student-params" style="background-color:var(--color-student-params-red);">軽装</div>\n'
        } else if (student.Def == "重装") {
            output += '<div class="student-params" style="background-color:var(--color-student-params-yellow);">重装</div>\n'
        } else if (student.Def == "特殊") {
            output += '<div class="student-params" style="background-color:var(--color-student-params-blue);">特殊</div>\n'
        }

        output += '<div class="student-params" style="background-color:var(--color-student-params-gray);">' + student.Position + "</div>\n"

        output += '<div class="student-params" style="background-color:var(--color-student-params-gray);">' + student.Class + "</div>\n"

        output += "</div>\n</div>\n</a>"
    }
    if (outputEle != null) {
        outputEle.innerHTML = output
    }
}

/**フィルター用のクエリを生成する */
function queryGenerator(): StudentQuery[] {
    const queries: StudentQuery[] = []

    const checkedRoleValues = Array.from(document.querySelectorAll<HTMLInputElement>("input.filter[data-filter-key=Role]:checked"))
        .map((e) => e.value)
        .filter((x): x is Role => checkQueryValues<Role>(ROLE_TYPES, x))
    if (checkedRoleValues.length !== 0) queries.push({ key: "Role", values: checkedRoleValues })

    const checkedAtkValues = Array.from(document.querySelectorAll<HTMLInputElement>("input.filter[data-filter-key=Atk]:checked"))
        .map((e) => e.value)
        .filter((x): x is Atk => checkQueryValues<Atk>(ATK_TYPES, x))
    if (checkedAtkValues.length !== 0) queries.push({ key: "Atk", values: checkedAtkValues })

    const checkedDefValues = Array.from(document.querySelectorAll<HTMLInputElement>("input.filter[data-filter-key=Def]:checked"))
        .map((e) => e.value)
        .filter((x): x is Def => checkQueryValues<Def>(DEF_TYPES, x))
    if (checkedDefValues.length !== 0) queries.push({ key: "Def", values: checkedDefValues })

    const checkedPositionValues = Array.from(document.querySelectorAll<HTMLInputElement>("input.filter[data-filter-key=Position]:checked"))
        .map((e) => e.value)
        .filter((x): x is Position => checkQueryValues<Position>(POSITION_TYPES, x))
    if (checkedPositionValues.length !== 0) queries.push({ key: "Position", values: checkedPositionValues })

    const checkedClassValues = Array.from(document.querySelectorAll<HTMLInputElement>("input.filter[data-filter-key=Class]:checked"))
        .map((e) => e.value)
        .filter((x): x is Class => checkQueryValues<Class>(CLASS_TYPES, x))
    if (checkedClassValues.length !== 0) queries.push({ key: "Class", values: checkedClassValues })

    const checkedSchoolValues = Array.from(document.querySelectorAll<HTMLInputElement>("input.filter[data-filter-key=School]:checked"))
        .map((e) => e.value)
        .filter((x): x is School => checkQueryValues<School>(SCHOOL_TYPES, x))
    if (checkedSchoolValues.length !== 0) queries.push({ key: "School", values: checkedSchoolValues })
    return queries
}

/**生徒一覧を名前順にソートする*/
function filterList() {
    const queries = queryGenerator()
    void fetch(path)
        .then((response) => response.json())
        .then((json: StudentInfo[]) => {
            let arr: StudentInfo[] = []
            if (queries.length !== 0) {
                arr = filterWithQueries(json, queries)
            } else {
                arr = json
            }
            const acsendEle = document.getElementById("name-ascend") as HTMLInputElement
            const decsendEle = document.getElementById("name-descend") as HTMLInputElement
            if (acsendEle.checked) {
                arr.sort(function (a: StudentInfo, b: StudentInfo) {
                    if (a["Ruby"] < b["Ruby"]) return -1
                    else if (b["Ruby"] < a["Ruby"]) return 1
                    else return 0
                })
            } else if (decsendEle.checked) {
                arr.sort(function (a: StudentInfo, b: StudentInfo) {
                    if (a["Ruby"] > b["Ruby"]) return -1
                    else if (b["Ruby"] > a["Ruby"]) return 1
                    else return 0
                })
            }
            jsonToList(arr)
        })
}

/**フィルター要素がトグルされたときに要素の高さを切り替える*/
function toggleFilter(isFilterVisible: boolean) {
    if (isFilterVisible === true) {
        filtersEle!.style.height = (filtersEleHeight + 30).toString() + "px"
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
        filtersEle!.style.height = (filtersEleHeight + 30).toString() + "px"
    } else {
        filtersEle!.style.height = "auto"
        filtersEleHeight = filtersEle!.offsetHeight
        filtersEle!.style.height = "0px"
    }
})
