(async () => {
    response = await fetch("/template/header.html");
    if (response.ok){
        text = await response.text();
        const file_area = document.getElementById("header");
        file_area.innerHTML = text;
    }
})();

(async () => {
    response = await fetch("/template/footer.html");
    if (response.ok){
        text = await response.text();
        const file_area = document.getElementById("footer");
        file_area.innerHTML = text;
    }
})();