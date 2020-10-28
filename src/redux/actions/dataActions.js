import {
  SET_SCREANS,
  LOADING_DATA,
  LIKE_SCREAN,
  UNLIKE_SCREAN,
  DELETE_SCREAN,
  SET_ERRORS,
  POST_SCREAN,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAN,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all screans
export const getScreans = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screans")
    .then((res) => {
      dispatch({
        type: SET_SCREANS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREANS,
        payload: [],
      });
    });
};
export const getScrean = (screanId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/screan/${screanId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAN,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a screan
export const postScrean = (newScrean) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/screan", newScrean)
    .then((res) => {
      dispatch({
        type: POST_SCREAN,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Like a screan
export const likeScrean = (screanId) => (dispatch) => {
  axios
    .get(`/screan/${screanId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAN,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a screan
export const unlikeScrean = (screanId) => (dispatch) => {
  axios
    .get(`/screan/${screanId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAN,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (screanId, commentData) => (dispatch) => {
  axios
    .post(`/screan/${screanId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteScrean = (screanId) => (dispatch) => {
  axios
    .delete(`/screan/${screanId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAN, payload: screanId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREANS,
        payload: res.data.screans,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREANS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
