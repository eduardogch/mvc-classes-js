/*
*   @class: Model
*   @description: Handle the data of the application
*/
class Model {
    data = ''
    test = 0
    constructor() {}

    get data() { return this._data; }

    set data(value) { this._data = value; }

    get test() { return this._test; }

    set test(value) { return this._text = value; }
}

/*
*   @class: View
*   @description: Handle the view of the application
*/
class View {
    constructor(model) {
        this.model = model;
        this.input = document.getElementById('input');
        this.button = document.getElementById('button');
        this.output = document.getElementById('output');
        this.title = document.getElementsByClassName('title')[0];
        this.response = document.createElement('p');
        this.title.appendChild(this.response);
        this.render();
    }

    render() { 
        this.output.innerHTML = this.model.data;
        this.response.innerHTML = this.model.test;
    }

    handleOnChange(event) {
        if(event && event.target){
            event.preventDefault();
            if(event.target.value !== '' && event.target.value !== ' ') {
                this.model.data = event.target.value;
            }
        }
    }
}

/*
*   @class: controller
*   @description: Handle the interaction between the view and the model
*/
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.model.data = 'Hello World';
        this.view.render();
    }

    async fetch() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            if (response.ok) {
                const data = await response.json();
                this.model.data = data.title;
                this.model.test = response.status;
            }
        } catch (error) {
            console.log('error', error)
        }
        
    }

    async handleOnClick(event) {
        event.preventDefault();
        await this.fetch();
        await this.view.render();
    }
}

const model = new Model();
const view = new View(model);
const controller = new Controller(model, view);

document.app = { view, controller }
