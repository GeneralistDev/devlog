import { ADD_ENTRY } from './actionTypes';

const initialState = {
    entries: []
};

export default function feed(state = initialState, action) {
    switch(action.type) {
        case ADD_ENTRY:
            let entries = state.entries.slice();
            entries.push(action.entry);
            return { 
                ...state,
                entries
            };
        default:
            return state;
    }
};