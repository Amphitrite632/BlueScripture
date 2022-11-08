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

async function search(query: string) {
    const regex = new RegExp(query)
    const articleTitles:string[] = await (await fetch("/asset/json/articlelist.json")).json() as string[]
    const articles = await Promise.all(
        articleTitles.map(async (date: string) => {
            const article = await fetch(`/news/${date}/index.txt`)
            const text = await article.text()
            return { date, text }
        })
    )

    const searchResult: ArticleDescription[] = articles.filter(({ text }) => regex.test(text))

    return searchResult
}

async function getArticleInfo(date: string): Promise<ArticleInfo> {
    const resp = await fetch(`/news/${date}/index.json`)
    const articleInfo = await resp.json()
    if (validateArticleInfo(articleInfo)) {
        return articleInfo
    } else {
        throw new Error("Invalid ArticleInfo")
    }
}

function validateArticleInfo(obj: unknown): obj is ArticleInfo {
    if (typeof obj !== "object" || obj === null) return false
    const articleInfo = obj as Record<keyof ArticleInfo, unknown>;

    if (typeof articleInfo.category !== "string") return false
    if (typeof articleInfo.date !== "string") return false
    if (typeof articleInfo.thumbnail !== "string") return false
    if (typeof articleInfo.title !== "string") return false
    if (typeof articleInfo.url !== "string") return false
    return true;
}

/** 検索結果のカードを生成 */
function createResultCard(title: string, category: string, date: string, url: string, thumbnail: string) {
    const card = document.createElement("a")
    card.classList.add("card")
    card.setAttribute("href", url)

    const img = document.createElement("img")
    img.src = thumbnail

    const descriptionEle = document.createElement("div")
    descriptionEle.classList.add("card-description")

    const titleEle = document.createElement("div")
    titleEle.classList.add("card-title")
    titleEle.innerText = title

    const categoryEle = document.createElement("div")
    categoryEle.classList.add("card-category")
    categoryEle.dataset.category = category
    if (category == "mainstory") {
        categoryEle.innerHTML = "メインストーリー"
    } else if (category == "campaign") {
        categoryEle.innerHTML = "キャンペーン"
    } else if (category == "pickup") {
        categoryEle.innerHTML = "ピックアップ募集"
    } else if (category == "notice") {
        categoryEle.innerHTML = "お知らせ"
    } else if (category == "guide") {
        categoryEle.innerHTML = "攻略情報"
    } else if (category == "goods") {
        categoryEle.innerHTML = "グッズ情報"
    } else if (category == "other") {
        categoryEle.innerHTML = "ゲーム全般"
    }

    const dateEle = document.createElement("div")
    dateEle.classList.add("card-date")
    dateEle.innerText = date

    card.appendChild(img)
    card.appendChild(descriptionEle)
    descriptionEle.appendChild(categoryEle)
    descriptionEle.appendChild(titleEle)
    descriptionEle.appendChild(dateEle)

    return card
}

/** URLに検索クエリがあった場合searchを呼び出す */
async function searchQuery() {
    const queryString = new URLSearchParams(window.location.search)
    if (queryString.has("keyword")) {
        const query = queryString.get("keyword")
        if (query === null) {
            return
        }
        const searchResult = await search(query)
        let resultArticlesInfo: ArticleInfo
        let cardElements: HTMLElement
        for (let i = 0; i < searchResult.length; i++) {
            resultArticlesInfo = await getArticleInfo(searchResult[i].date)
            cardElements = createResultCard(resultArticlesInfo.title, resultArticlesInfo.category, resultArticlesInfo.date, resultArticlesInfo.url, resultArticlesInfo.thumbnail)
            const resultsEle = document.getElementById("searchResult")
            resultsEle!.appendChild(cardElements)
        }
    }
}
// window が読みこまれたときに発火
void searchQuery()