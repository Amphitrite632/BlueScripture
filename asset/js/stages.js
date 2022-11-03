let areasEle = document.getElementById("areas")
let path = "/asset/json/stagelist.json"

function getJSON() {
    const req = new Request(path)
    fetch(req)
        .then(response => response.json())
        .then(json => {
            json = Object.entries(json)
            console.log(json[0][1][0])
            jsonToList(json)
        });
}

function jsonToList(json) {
    for (let i = 0; i < json.length; i++) {
        const areaEle = document.createElement("div")
        areaEle.classList.add("area")
        const areaNameEle = document.createElement("h2")
        areaNameEle.classList.add("area-name")
        areaNameEle.innerText = json[i][0]
        areaEle.appendChild(areaNameEle)

        const stagesEle = document.createElement("div")
        stagesEle.classList.add("stages")

        for (let x = 0; x < json[i][1].length;x++){
            const stageEle = document.createElement("div")
            stageEle.classList.add("stage")

            const stageIDEle = document.createElement("h3")
            stageIDEle.classList.add("stage-id")
            stageIDEle.innerText = json[i][1][x].StageID
            if (json[i][1][x].Difficulty === "Normal") {
                stageIDEle.dataset.difficulty = "normal"
            } else if (json[i][1][x].Difficulty === "Hard") {
                stageIDEle.dataset.difficulty = "hard"
            }
            stageEle.appendChild(stageIDEle)

            const stageNameEle = document.createElement("p")
            stageNameEle.classList.add("stage-name")
            stageNameEle.innerText = json[i][1][x].StageName
            stageEle.appendChild(stageNameEle)

            const recommendedLevelEle = document.createElement("p")
            recommendedLevelEle.classList.add("recommended-level")
            recommendedLevelEle.innerText = (`推奨Lv:${json[i][1][x].RecommendedLevel}`)
            stageEle.appendChild(recommendedLevelEle)

            const landscapeEle = document.createElement("p")
            landscapeEle.classList.add("landscape")
            if (json[i][1][x].Landscape === "Town") {
                landscapeEle.innerText = "市街地"
            } else if (json[i][1][x].Landscape === "Outdoor") {
                landscapeEle.innerText = "屋外"
            } else if (json[i][1][x].Landscape === "Indoor") {
                landscapeEle.innerText = "屋内"
            }
            stageEle.appendChild(landscapeEle)

            const dropItemEle = document.createElement("p")
            dropItemEle.classList.add("drop-item")
            dropItemEle.innerText = (`ドロップするアイテム:${json[i][1][x].DropItem}`)
            stageEle.appendChild(dropItemEle)
            
            stagesEle.appendChild(stageEle)
            areaEle.appendChild(stagesEle)
        }

        areasEle.appendChild(areaEle)
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    getJSON()
})