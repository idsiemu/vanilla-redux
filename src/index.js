import {createStore} from 'redux';

const plus = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');


const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const add = 'ADD_TODO';
const del = 'DELETE_TODO';

const reducer = (state = [], action) => {
    switch(action.type){
        case add:
            return [...state, {text: action.text}];
        case del:
            return [];
        default:
            return state;
    }
}

const ulStore = createStore(reducer);

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    ulStore.dispatch({type:add, text: toDo, id: Date.now()});
}

ulStore.subscribe(() => console.log(ulStore.getState()));

form.addEventListener('submit', onSubmit);

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
    switch (action.type){
        case ADD:
            return count + 1;
        case MINUS:
            return count -1;
        default:
            return count;
    }
};

const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
}

const handlePlus = () => {
    countStore.dispatch({type: ADD})
}

const handleMinus = () => {
    countStore.dispatch({type: MINUS})
}

countStore.subscribe(onChange);

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);
