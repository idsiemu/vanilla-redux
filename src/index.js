import {createStore} from 'redux';

const plus = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');


const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const add = 'ADD_TODO';
const del = 'DELETE_TODO';

const addToDo = text => {
    return {
        type: add,
        text
    }
}

const deleteToDo = id => {
    return {
        type: del,
        id
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case add:
            return [...state, {text: action.text, id: Date.now()}];
        case del:
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }
}

const ulStore = createStore(reducer);

const dispatchAddToDo = (text) => {
    ulStore.dispatch(addToDo(text))
}

const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    ulStore.dispatch(deleteToDo(id));
}

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    dispatchAddToDo(toDo);
    input.value = "";
}

ulStore.subscribe(() => ulStore.getState());

const paintToDos = () => {
    const toDos = ulStore.getState();
    ul.innerHTML = '';
    toDos.forEach(toDo => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.addEventListener('click', dispatchDeleteToDo)
        btn.innerText = 'DEL';
        li.id = toDo.id
        li.innerText = toDo.text
        li.appendChild(btn);
        ul.appendChild(li)
    });
}

ulStore.subscribe(paintToDos);

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
