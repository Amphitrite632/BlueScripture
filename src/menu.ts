var isDropDownShow = false;
var dropdownNaviEle = document.getElementById("navi-dropdown");

function onMenuButtonClick() {
    if (isDropDownShow == false) {
        if (dropdownNaviEle != null) {
            dropdownNaviEle.style.animationName = "dropdown-show";
        }
        isDropDownShow = true;
    } else {
        if (dropdownNaviEle != null) {
            dropdownNaviEle.style.animationName = "dropdown-hide";
        }
        isDropDownShow = false;
    }
}
