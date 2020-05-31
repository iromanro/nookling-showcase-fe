/* eslint-disable no-shadow */

const searchReducer = (
  state = {
    creations: [],
    isLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "SEARCH_CREATIONS_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "SEARCH_CREATIONS_REJECTED": {
      return {
        ...state,
        isLoading: false,
      }
    }
    case "SEARCH_CREATIONS_FULFILLED": {
      console.log("Reducer: ", action.payload.data.creations)
      return {
        ...state,
        isLoading: false,
        creations: action.payload.data.creations,
      }
    }
    default:
      return state
  }
}

export default searchReducer