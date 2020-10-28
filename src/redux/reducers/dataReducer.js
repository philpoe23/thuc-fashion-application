import {
  SET_SCREANS,
  LIKE_SCREAN,
  UNLIKE_SCREAN,
  LOADING_DATA,
  DELETE_SCREAN,
  POST_SCREAN,
  SET_SCREAN,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  screans: [],
  screan: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREANS:
      return {
        ...state,
        screans: action.payload,
        loading: false
      };
    case SET_SCREAN:
      return {
        ...state,
        screan: action.payload
      };
    case LIKE_SCREAN:
    case UNLIKE_SCREAN:
      let index = state.screans.findIndex(
        (screan) => screan.screanId === action.payload.screanId
      );
      state.screans[index] = action.payload;
      if (state.screan.screanId === action.payload.screanId) {
        state.screan = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SCREAN:
      index = state.screans.findIndex(
        (screan) => screan.screanId === action.payload
      );
      state.screans.splice(index, 1);
      return {
        ...state
      };
    case POST_SCREAN:
      return {
        ...state,
        screans: [action.payload, ...state.screans]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        screan: {
          ...state.screan,
          comments: [action.payload, ...state.screan.comments]
        }
      };
    default:
      return state;
  }
}
