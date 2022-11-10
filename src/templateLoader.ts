void (async () => {
    const response = await fetch("/template/header.html")
    if (response.ok) {
        const text = await response.text()
        const fileArea = document.getElementById("header")
        if (fileArea != null) {
            fileArea.innerHTML = text
            const event:Event = new Event("headerLoaded")
            window.dispatchEvent(event)
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
            const event:Event = new Event("footerLoaded")
            window.dispatchEvent(event)
        }
    }
})()