const defaultState = {
    username: "",
    token: ""
};

// Чтение состояния из localStorage при инициализации
const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : {};

// Объединение сохраненного состояния с исходным состоянием по умолчанию
const initialState = { ...defaultState, ...persistedState };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "set_user":
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
            };
        case "remove_user":
            return { ...state, username: "", token: "" };
        default:
            return state;
    }
};
