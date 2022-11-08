interface ArticleInfo {
    category: string
    date: string
    thumbnail: string
    title: string
    url: string
}

interface ArticleDescription {
    date: string,
    text: string,
}

async function search(query: string): Promise<ArticleDescription[]> {
    const resp = await fetch("/asset/json/articlelist.json")
    const articleTitles: unknown = await resp.json()
    if (!validateArticleList(articleTitles)) throw new Error("Invalid article list")
    
    const regex = new RegExp(query)
    const articles = (await Promise.all(
        articleTitles.map(async (date: string) => {
            const article = await fetch(`/news/${date}/index.txt`)
            const text = await article.text()
            return regex.test(text) ? [{ date, text }] : []
        })
    )).flat()

    return articles
}

function validateArticleList(obj: unknown): obj is string[] {
    if (!Array.isArray(obj)) return false
    return obj.every((e) => typeof e === "string" && /\d{4}-\d{2}-\d{2}-\d{2}/.test(e))
}

async function getArticleInfo(date: string): Promise<ArticleInfo> {
    const resp = await fetch(`/news/${date}/index.json`)
    const articleInfo: unknown = await resp.json()
    
    if (!validateArticleInfo(articleInfo)) throw new Error("Invalid ArticleInfo")
    return articleInfo
}

function validateArticleInfo(obj: unknown): obj is ArticleInfo {
    if (typeof obj !== "object" || obj === null) return false
    const articleInfo = obj as Record<keyof ArticleInfo, unknown>

    if (typeof articleInfo.category !== "string") return false
    if (typeof articleInfo.date !== "string") return false
    if (typeof articleInfo.thumbnail !== "string") return false
    if (typeof articleInfo.title !== "string") return false
    if (typeof articleInfo.url !== "string") return false
    return true
}

/** 検索結果のカードを生成 */
function createResultCard(articleInfo: ArticleInfo): HTMLElement {
    const card = document.createElement("a")
    card.classList.add("card")
    card.setAttribute("href", articleInfo.url)

    const img = document.createElement("img")
    img.src = articleInfo.thumbnail

    const descriptionEle = document.createElement("div")
    descriptionEle.classList.add("card-description")

    const titleEle = document.createElement("div")
    titleEle.classList.add("card-title")
    titleEle.innerText = articleInfo.title

    const categoryEle = document.createElement("div")
    categoryEle.classList.add("card-category")
    categoryEle.dataset.category = articleInfo.category
    switch (articleInfo.category) {
    case "mainstory":
        categoryEle.innerHTML = "メインストーリー"
        break
    case "campaign":
        categoryEle.innerHTML = "キャンペーン"
        break
    case "pickup":
        categoryEle.innerHTML = "ピックアップ募集"
        break
    case "notice":
        categoryEle.innerHTML = "お知らせ"
        break
    case "guide":
        categoryEle.innerHTML = "攻略情報"
        break
    case "goods":
        categoryEle.innerHTML = "グッズ情報"
        break
    case "other":
        categoryEle.innerHTML = "ゲーム全般"
        break
    }

    const dateEle = document.createElement("div")
    dateEle.classList.add("card-date")
    dateEle.innerText = articleInfo.date

    card.appendChild(img)
    card.appendChild(descriptionEle)
    descriptionEle.appendChild(categoryEle)
    descriptionEle.appendChild(titleEle)
    descriptionEle.appendChild(dateEle)

    return card
}

/** URLに検索クエリがあった場合searchを呼び出す */
async function searchQuery() {
    const searchResultsElement = document.querySelector("#searchResult")
    if (!searchResultsElement) throw new Error("Malformed DOM detected")

    const queryString = new URLSearchParams(window.location.search)
    const queryKeyword = queryString.get("keyword")
    if (!queryKeyword) return

    const searchResult = await search(queryKeyword)
    for (const articleDescription of searchResult) {
        const articleInfo = await getArticleInfo(articleDescription.date)
        searchResultsElement.appendChild(createResultCard(articleInfo))
    }
}

// window が読みこまれたときに発火
void searchQuery()