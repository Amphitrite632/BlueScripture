var isDropDownShow = false

function onMenuButtonClick() {
    if(isDropDownShow == false){
        document.getElementById("navi-dropdown").style.animationName = "dropdown-show"
        isDropDownShow = true
    } else {
        document.getElementById("navi-dropdown").style.animationName = "dropdown-hide"
        isDropDownShow = false
    }
}