(async () => {
    let response = await fetch("/template/header.html");
    if (response.ok){
        let text = await response.text();
        const file_area = document.getElementById("header");
        if (file_area != null) {
            file_area.innerHTML = text;
        }
    }
})();

(async () => {
    let response = await fetch("/template/footer.html");
    if (response.ok){
        let text = await response.text();
        const file_area = document.getElementById("footer");
        if (file_area != null) {
            file_area.innerHTML = text;
        }
    }
})();