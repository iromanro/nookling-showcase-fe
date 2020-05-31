import { combineReducers } from "redux"
import globalReducer from "./globalReducer"
import searchReducer from "./searchReducer"

export default combineReducers({
  // simpleReducer,
  global: globalReducer,
  search: searchReducer,
})
