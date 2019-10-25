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
  ADD_ATTACHMENT_TO_PIN_REQUEST,
  ADD_ATTACHMENT_TO_PIN_SUCCESS,
  ADD_ATTACHMENT_TO_PIN_FAILURE,
  UPDATE_TOUR,
  REQUEST_TOUR,
  SET_FEEDBACK_SUCCESS,
} from '../actions/toursActions';

const initialState = {
  toursList: [],
  currTourId: null,
  currTour: null,
  currPinId: null,
  currPin: null,
  pinId: null,
  isToursLoading: false,
  isCreateTourLoading: false,
  isCreatePinLoading: false,
  toursError: null,
  createTourError: null,
  createPinError: null,
  addAttachmentToPinError: null,
};

export default (state = initialState, action) => {
  const getTour = (id) => {
    const { toursList } = state;
    for (i = 0; i < toursList.length; i++) {
      if (toursList[i].id == id) return toursList[i];
    }
  }
  const tourByRating = (tour, rating) => {
    let originIndex = 0;
    for (i = 0; i < tour.ratings.length; i++) {
      if (tour.ratings[i].id == rating.id) break;
      originIndex++;
    }
    tour.ratings[originIndex] = rating;
    return tour;
  }

  switch (action.type) {
    case GET_TOURS_REQUEST:
      return {
        ...state,
        isToursLoading: true,
      };
    case GET_TOURS_SUCCESS:
      console.log("tours list= ",action.payload)
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
        pinId: action.payload.id,
        toursList: state.toursList.map(tour =>
          tour.id === action.payload.tourId ? { ...tour, pins: tour.pins.concat(action.payload) } : tour
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
        createPinError: payload,
        isCreatePinLoading: false,
      };
    case DELETE_PIN_IN_TOUR_SUCCES:
      return {
        ...state,
        toursList: state.toursList.map(tour =>
          tour.id === action.payload.tourId ? { ...tour, pins: action.payload.array } : tour
        ),
      };
    case ADD_ATTACHMENT_TO_PIN_REQUEST:
      return { ...state, isCreatePinLoading: true };
    case ADD_ATTACHMENT_TO_PIN_SUCCESS:
      return {
        ...state,
        isCreatePinLoading: false,
        toursList: state.toursList.map(tour => {
          return {
            ...tour,
            pins: tour.pins.map(pin => pin.id === action.payload.pinId ? { ...pin, attachments: pin.attachments.concat(action.payload) } : pin),
          }
        }),
      };
    case ADD_ATTACHMENT_TO_PIN_FAILURE:
      return {
        ...state,
        isCreatePinLoading: false,
        addAttachmentToPinError: action.payload,
      };
    case UPDATE_TOUR:
      return {
        ...state,
        toursList: state.toursList.map(tour =>
          tour.id === action.id ? action.newTour : tour
        ),
        currTour: action.newTour,
      };
    case REQUEST_TOUR:
      return {
        ...state,
        currTourId: action.id,
        currTour: getTour(action.id),
      };
    case SET_FEEDBACK_SUCCESS:
      const newTour = tourByRating(state.currTour, action.data)
      return {
        ...state,
        isCreatePinLoading: false,
        toursList: state.toursList.map(tour =>
          tour.id === action.data.tourId ? newTour : tour
        ),
        currTour: newTour,
      };
    default:
      return state;
  }


};
