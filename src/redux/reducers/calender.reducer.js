import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  FETCH_DATA_FAILED,
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
} from '../constants';

const initialState = {
  events: [],
  isPending: false,
  error: '',
};

export const fetchDataReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_DATA_PENDING:
      return { ...state, isPending: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, events: action.payload, isPending: false };
    case FETCH_DATA_FAILED:
      return { ...state, error: action.payload, isPending: false };
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case DELETE_EVENT:
      const filteredEvent = [...state.events].filter((event) => event.id !== action.payload);
      return { ...state, events: filteredEvent };
    case EDIT_EVENT:
      const filteredEditEvent = [...state.events].filter((event) => event.id !== action.payload.id);
      return { ...state, events: [...filteredEditEvent, action.payload] };
    default:
      return state;
  }
};
