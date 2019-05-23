import {
  GET_TOURS_REQUEST,
  GET_TOURS_SUCCESS,
  GET_TOURS_FAILURE,
  CREATE_TOUR_REQUEST,
  CREATE_TOUR_SUCCESS,
  CREATE_TOUR_FAILURE,
  ADD_PINS_TO_TOUR_LOCAL,
  ADD_PIN_TO_TOUR_REQUEST,
  ADD_PIN_TO_TOUR_SUCCESS,
  ADD_PIN_TO_TOUR_FAILURE,
  DELETE_PIN_IN_TOUR_SUCCES,
} from '../actions/toursActions';

const initialState = {
  toursList: [],
  isToursLoading: false,
  toursError: null,
  isCreateTourLoading: false,
  isCreatePinLoading: false,
  createTourError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOURS_REQUEST:
      return {
        ...state,
        isToursLoading: true,
      };
    case GET_TOURS_SUCCESS:
      return {
        ...state,
        isToursLoading: false,
        toursList: action.payload,
      };
    case GET_TOURS_FAILURE:
      return {
        ...state,
        isToursLoading: false,
        toursError: action.payload,
      };
    case CREATE_TOUR_REQUEST:
      return {
        ...state,
        isCreateTourLoading: true,
      };
    case CREATE_TOUR_SUCCESS:
      return {
        ...state,
        isCreateTourLoading: false,
        toursList: state.toursList.concat(action.payload),
      };
    case CREATE_TOUR_FAILURE:
      return {
        ...state,
        isCreateTourLoading: false,
        createTourError: action.payload,
      };
    case ADD_PIN_TO_TOUR_REQUEST:
      return { ...state, isCreatePinLoading: true };
    case ADD_PIN_TO_TOUR_SUCCESS:
      return {
        ...state,
        isCreatePinLoading: false,
        toursList: state.toursList.map(tour =>
          tour.id === action.payload.tourId
            ? { ...tour, pins: tour.pins.concat(action.payload) }
            : tour
        ),
      };
    case ADD_PINS_TO_TOUR_LOCAL:
      return {
        ...state,
        toursList: state.toursList.map(tour =>
          tour.id === action.payload.tourId ? { ...tour, pins: action.payload.pins } : tour
        ),
      };
    case ADD_PIN_TO_TOUR_FAILURE:
      return {
        ...state,
        isCreatePinLoading: false,
      };
    case DELETE_PIN_IN_TOUR_SUCCES:
      return {
        ...state,
        toursList: state.toursList.map(tour =>
          tour.id === action.payload.tourId ? { ...tour, pins: action.payload.array } : tour
        ),
      };
    default:
      return state;
  }
};
