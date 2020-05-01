import { createStore, applyMiddleware } from "redux"
import { createPromise } from "redux-promise-middleware"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer"

const middlewares = [createPromise(), thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
