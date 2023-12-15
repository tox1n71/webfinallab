const defaultState = {
    r: 3,
}
export const radiusReducer = (state = defaultState, action) => {
    switch (action.type){
        case "SET_R_VALUE":
            return {...state, r: action.payload}
        default:
            return state;
    }
}
