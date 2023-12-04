export class Quiz {
    constructor(questions) {
        this.questions = questions
        this.currentQuestion = 0
        this.totalNumberOfQuestions = questions.length
        this.score = 0
        document.getElementById("next").addEventListener('click', this.nextQuestion.bind(this))
        document.getElementById('tryBtn').addEventListener('click', this.tryAgain)
        this.showQuestions()
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    showQuestions() {
        document.getElementById('currentQuestion').innerHTML = this.currentQuestion + 1
        document.getElementById('totalNumberOfQuestions').innerHTML = this.totalNumberOfQuestions
        document.getElementById('question').innerHTML = this.questions[this.currentQuestion].question

        let answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers]
        console.log(answers)
        this.shuffle(answers)

        let answersContainer = ``
        for (let i = 0; i < answers.length; i++) {
            answersContainer += `<label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
            ${answers[i]}
            </label>
        <br/>`
        }
        document.getElementById('rowAnswer').innerHTML = answersContainer
    }

    nextQuestion() {
        if (Array.from(document.getElementsByName('answer')).find((element => element.checked)) != undefined) {
            $("#alert").fadeOut(100)
            let correctAnswer = this.questions[this.currentQuestion].correct_answer

            let userAnswer = Array.from(document.getElementsByName('answer')).find((element => element.checked)).value
            this.checkUserAnswer(userAnswer, correctAnswer)
            this.currentQuestion++
            if (this.currentQuestion < this.totalNumberOfQuestions) {
                this.showQuestions()
            } else {
                $("#quiz").fadeOut(500)
                $("#finish").fadeIn(500)
                document.getElementById('score').innerHTML = this.score
            }
        } else {
            $("#alert").fadeIn(500)
        }
    }

    checkUserAnswer(userAnswer, correctAnswer) {
        if (userAnswer == correctAnswer) {
            $("#Correct").fadeIn(500).fadeOut(500)
            this.score++

        } else {
            $("#inCorrect").fadeIn(500).fadeOut(500)

        }
    }
    tryAgain() {
        $("#finish").fadeOut(500)
        $("#setting").fadeIn(500)
    }
}