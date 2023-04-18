// 여기에 user reducer를 다 치면 된다. 

import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types';

// 인자로 previous state와 action을 넣어주고
// 변경된 state를 리턴해줌
export default function Reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER :
            return {...state, loginSuccess: action.payload}
    
        case REGISTER_USER:
            return {...state, register: action.payload}

        default:
            return state;
    }
}
