import {createStore} from "redux";
import {userReducer} from "./userReducer";




export const store = createStore(userReducer);
store.subscribe(() => {
    const currentState = store.getState();
    localStorage.setItem("token", JSON.stringify(currentState));
});