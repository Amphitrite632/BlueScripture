package main

import (
	"encoding/json"
	"io/ioutil"
	"math"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"text/template"
)

type info struct {
	Title     string `json:"title"`
	Category  string `json:"category"`
	Date      string `json:"date"`
	Thumbnail string `json:"thumbnail"`
}

func topPageHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		notFoundHandler(w, r, http.StatusNotFound)
		return
	}
	http.ServeFile(w, r, "static/index.html")
}

func notFoundHandler(w http.ResponseWriter, r *http.Request, status int) {
	w.WriteHeader(status)
	http.ServeFile(w, r, "static/404.html")
}

func aboutRequestHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/about/index.html")
}

func studentsRequestHandler(w http.ResponseWriter, r *http.Request) {
	var studentName = r.URL.Query().Get("student")
	if studentName == "" {
		http.ServeFile(w, r, "static/students/index.html")
	} else {
		template := template.Must(template.ParseFiles("static/students/student.html"))
		article := map[string]string{
			"studentName": string(studentName),
		}
		template.ExecuteTemplate(w, "student.html", article)
	}
}

func newsRequestHandler(w http.ResponseWriter, r *http.Request) {
	if !regexp.MustCompile(`^/news/\d{4}-\d{2}-\d{2}-\d{2}/$`).MatchString(r.URL.Path) {
		var path string = strings.Replace(r.URL.Path, "/news/", "static/news/", 1)
		http.ServeFile(w, r, path)
		return
	} else {

		text, _ := ioutil.ReadFile("static/" + r.URL.Path + "index.txt")
		jsonData, _ := ioutil.ReadFile("static/" + r.URL.Path + "index.json")

		var articleinfo info
		json.Unmarshal(jsonData, &articleinfo)

		template := template.Must(template.ParseFiles("template/news-template.html"))

		article := map[string]string{
			"ogp_image": "<meta property=\"og:image\" content=\"https://bluescripture.net" + articleinfo.Thumbnail + "\">",
			"ogp_title": "<meta property=\"og:title\" content=\"" + articleinfo.Title + "｜Blue Scripture\" />",
			"title":     articleinfo.Title + "｜Blue Scripture",
			"body":      string(text),
			"link":      "https://twitter.com/intent/tweet?text=" + articleinfo.Title + "｜Blue Scripture\n https://bluescripture.net" + r.URL.Path,
		}

		template.ExecuteTemplate(w, "news-template.html", article)
	}
}

func newsIndexRequestHandler(w http.ResponseWriter, r *http.Request) {
	template := template.Must(template.ParseFiles("static/news-index/index.html"))

	var paths []string
	jsonData, _ := ioutil.ReadFile("./asset/json/articlelist.json")
	json.Unmarshal(jsonData, &paths)

	maxPageNumber := math.Ceil(float64(len(paths)) / 5.0)
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))

	if page > int(maxPageNumber) || page < 1 {
		page = 1
	}

	var text string
	for i := page*5 - 5; i < (page-1)*5+5; i++ {
		if i < len(paths) {
			jsonData, _ := ioutil.ReadFile("static/news/" + paths[i] + "/index.json")
			var articleinfo info
			var categoryTag string
			json.Unmarshal(jsonData, &articleinfo)
			switch articleinfo.Category {
			case "notice":
				categoryTag = "<div class=\"card-category\" data-category=\"notice\">お知らせ</div>"
			}
			text += "<a class=\"card\" href=\"/news/" + paths[i] + "/\"><img class=\"card-thumbnail\" src=\"" + articleinfo.Thumbnail + "\"><div class=\"card-description\">\n" + categoryTag + "<div class=\"card-title\">" + articleinfo.Title + "</div><div class=\"card-date\">" + articleinfo.Date + "</div></div></a>"
		}
	}

	var navi string

	article := map[string]string{
		"cards": string(text),
		"navi":  navi,
	}

	template.ExecuteTemplate(w, "index.html", article)
}

func searchRequestHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/search/index.html")
}

func stagesRequestHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/stages/index.html")
}

func main() {
	http.Handle("/asset/", http.StripPrefix("/asset/", http.FileServer(http.Dir("asset/"))))
	http.Handle("/template/", http.StripPrefix("/template/", http.FileServer(http.Dir("template/"))))
	http.HandleFunc("/news/", newsRequestHandler)
	http.HandleFunc("/news-index/", newsIndexRequestHandler)
	http.HandleFunc("/search/", searchRequestHandler)
	http.HandleFunc("/about/", aboutRequestHandler)
	http.HandleFunc("/students/", studentsRequestHandler)
	http.HandleFunc("/stages/", stagesRequestHandler)
	http.HandleFunc("/", topPageHandler)
	http.ListenAndServe(":8501", nil)
}
