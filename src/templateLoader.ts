void (async () => {
    const response = await fetch("/template/header.html")
    if (response.ok) {
        const text = await response.text()
        const fileArea = document.getElementById("header")
        if (fileArea != null) {
            fileArea.innerHTML = text
        }
    }
})()

void (async () => {
    const response = await fetch("/template/footer.html")
    if (response.ok) {
        const text = await response.text()
        const fileArea = document.getElementById("footer")
        if (fileArea != null) {
            fileArea.innerHTML = text
        }
    }
})()
