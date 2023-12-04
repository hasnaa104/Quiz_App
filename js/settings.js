import { Quiz } from "./quiz.js";


export class Setting {
    constructor() {
        this.category = document.getElementById('category')
        this.difficulty = document.getElementsByName('difficulty')
        this.numberOfQuestions = document.getElementById('numberOfQuestions')
        document.getElementById('startBtn').addEventListener('click', this.startQuiz.bind(this))
    }

    async startQuiz() {
        let category = this.category.value
        let difficulty = Array.from(this.difficulty).find(element => element.checked).value
        let numberOfQuestions = this.numberOfQuestions.value

        const API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let questions = await this.fetchData(API)
        if (questions.length > 0) {
            $("#setting").fadeOut(500)
            $("#quiz").fadeIn(500)
            let quiz = new Quiz(questions)
        }
    }

    async fetchData(API) {
        let response = await fetch(API)
        response = await response.json()
        return response.results

    }
}