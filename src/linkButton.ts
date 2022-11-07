async function onLinkButtonClick() {
    await navigator.clipboard.writeText(location.href)
    alert("リンクがコピーされました")
}