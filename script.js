/*
* @class: WordModel
* @description: Model for a word and text
*/
class WordsModel {
    words = 0;
    text = '';

    getWords() {
        return this.words;
    }

    setWords(value) {
        return this.words = value;
    }

    getText() {
        return this.text;
    }

    setText(value) {
        return this.text = value;
    }
}

/*
* @class: WordsController
* @param {String} view - The word
* @param {String} model - The definition of the word
*/
class WordsController {
    constructor(view, model) {
        this.model = model;
        this.view = view;
    }

    countWords() {
        const text = this.model.getText();
        const counter = text.split(' ');
        this.model.setWords(counter.length);
        this.view.render();
    }

    resetWords() {
        this.model.setWords(0);
        this.model.setText('');
        this.view.render();
    }
}

/*
* @class: WordsController
* @param {String} model - The definition of the word
*/
class WordView {
    constructor(model) {
        this.model = model;
        this.textarea = document.getElementById('text');
        this.counter = document.getElementById('counter');
        this.render();
    }

    setTextArea(event) {
        event.preventDefault();
        const text = event.target.value;
        if (text !== '' && text !== ' ') {
            this.model.setText(text);
        }
    }

    render() {
        this.textarea.value = this.model.getText();
        this.counter.innerHTML = this.model.getWords();
    }
}

const wordModel = new WordsModel();
const wordView = new WordView(wordModel);
const wordController = new WordsController(wordView, wordModel);

document.app = { wordController, wordView };