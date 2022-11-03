async function search(query) {
    const regex = new RegExp(query);

    const articleTitles = await (await fetch("/asset/json/articlelist.json")).json();
    const articles = await Promise.all(
        articleTitles.map(async (date) => {
        const article = await fetch(`/news/${date}/index.txt`);
        const text = await article.text();
        return { date, text };
        })
    );

    const searchResult = articles.filter(({ text }) => regex.test(text));

    return searchResult;
}

async function getArticleInfo(date) {
    const info = await (await fetch(`/news/${date}/index.json`)).json();
    console.log(info)
    return info
}

function createCardElement({title, text}) {
    const titleElement = document.createElement("h2");
    titleElement.appendChild(document.createTextNode(title));
    const textElement = document.createElement("p");
    textElement.appendChild(document.createTextNode(text));
    
    const cardElement = document.createElement("section");
    cardElement.appendChild(titleElement);
    cardElement.appendChild(textElement);
    return cardElement;
}

/** 検索結果のカードを生成 */
function createResultCard(title, category, date, url,  thumbnail) {
    const card = document.createElement("a");
    card.classList.add("card");
    card.setAttribute("href", url);

    const img = document.createElement("img");
    img.src = thumbnail;

    const descriptionEle = document.createElement("div");
    descriptionEle.classList.add("card-description");

    const titleEle = document.createElement("div")
    titleEle.classList.add("card-title")
    titleEle.innerText = title;

    const categoryEle = document.createElement("div");
    categoryEle.classList.add("card-category")
    categoryEle.dataset.category = category;
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

    const dateEle = document.createElement("div");
    dateEle.classList.add("card-date");
    dateEle.innerText = date

    card.appendChild(img);
    card.appendChild(descriptionEle);
    descriptionEle.appendChild(categoryEle);
    descriptionEle.appendChild(titleEle);
    descriptionEle.appendChild(dateEle);

    return card;
}

/** URLに検索クエリがあった場合searchを呼び出す */
async function searchQuery() {
    const queryString = new URLSearchParams(window.location.search);
    if (queryString.has("keyword")) {
        const query = queryString.get("keyword");

        const searchResult = await search(query)
        let resultArticlesInfo = {};
        let cardElements = ""
        for (let i = 0; i < searchResult.length; i++) {
            resultArticlesInfo = await getArticleInfo(searchResult[i].date)
            cardElements = createResultCard(resultArticlesInfo.title, resultArticlesInfo.category, resultArticlesInfo.date, resultArticlesInfo.url, resultArticlesInfo.thumbnail);
            const resultsEle = document.getElementById("searchResult");
            resultsEle.appendChild(cardElements); 
        }
    }
}
// window が読みこまれたときに発火
window.addEventListener("DOMContentLoaded", searchQuery);