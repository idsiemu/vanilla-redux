import {createStore} from 'redux';

const plus = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const countModifier = (count = 0, action) => {
    if(action.type === "ADD"){
        return count + 1;
    }else if(action.type === "MINUS"){
        return count - 1;
    }else{
        return count;
    }
};

const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
}

const handlePlus = () => {
    countStore.dispatch({type: "ADD"})
}

const handleMinus = () => {
    countStore.dispatch({type: "MINUS"})
}

countStore.subscribe(onChange);

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);
