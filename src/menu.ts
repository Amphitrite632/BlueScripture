let isDropDownShow = false
let dropdownNaviEle:HTMLElement | null

function onMenuButtonClick() {
    if (isDropDownShow == false) {
        if (dropdownNaviEle != null) {
            dropdownNaviEle.style.animationName = "dropdown-show"
        }
        isDropDownShow = true
    } else {
        if (dropdownNaviEle != null) {
            dropdownNaviEle.style.animationName = "dropdown-hide"
        }
        isDropDownShow = false
    }
}

window.addEventListener("headerLoaded",(e) => {
    dropdownNaviEle = document.getElementById("navi-dropdown")
})
