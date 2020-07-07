import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  FETCH_DATA_FAILED,
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
} from '../constants';
import Calender from '../../mock-api/calender.mock';
// console.log(Calender)

export const fetchDataAction = () => (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_PENDING });
    dispatch({ type: FETCH_DATA_SUCCESS, payload: Calender.events });
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILED, payload: error });
  }
};

export const addEvent = (newEvent) => ({
  type: ADD_EVENT,
  payload: newEvent,
});

export const deleteEvent = (oldEvent) => ({
  type: DELETE_EVENT,
  payload: oldEvent,
});

export const editEvent = (eventObj) => ({
  type: EDIT_EVENT,
  payload: eventObj,
});
