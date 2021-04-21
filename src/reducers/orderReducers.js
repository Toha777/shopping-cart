import { CLEAR_ORDER, CREATE_ORDER } from "../types";

export const odrerReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return { ...state, order: action.payload};
        case CLEAR_ORDER:
            return { ...state, order: null};
        default:
            return state;
    }
}

export const createOrderAction = payload => ({type: CREATE_ORDER, payload});
export const clearOrderAction = payload => ({type: CLEAR_ORDER, payload});
