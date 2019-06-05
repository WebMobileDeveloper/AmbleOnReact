import { RESTService } from '../services/RESTservice';
import networkErrorHandler from '../utils/networkErrorHandler';

export const GET_TOURS_REQUEST = 'GET_TOURS_REQUEST';
export const GET_TOURS_SUCCESS = 'GET_TOURS_SUCCESS';
export const GET_TOURS_FAILURE = 'GET_TOURS_FAILURE';

export const CREATE_TOUR_REQUEST = 'CREATE_TOUR_REQUEST';
export const CREATE_TOUR_SUCCESS = 'CREATE_TOUR_SUCCESS';
export const CREATE_TOUR_FAILURE = 'CREATE_TOUR_FAILURE';

export const ADD_PINS_TO_TOUR_LOCAL = 'ADD_PINS_TO_TOUR_LOCAL';
export const ADD_PIN_TO_TOUR_REQUEST = 'ADD_PIN_TO_TOUR_REQUEST';
export const ADD_PIN_TO_TOUR_SUCCESS = 'ADD_PIN_TO_TOUR_SUCCESS';
export const ADD_PIN_TO_TOUR_FAILURE = 'ADD_PIN_TO_TOUR_FAILURE';
export const DELETE_PIN_IN_TOUR_SUCCES = 'DELETE_PIN_IN_TOUR_SUCCES';

export const ADD_ATTACHMENT_TO_PIN_REQUEST = 'ADD_ATTACHMENT_TO_PIN_REQUEST';
export const ADD_ATTACHMENT_TO_PIN_SUCCESS = 'ADD_ATTACHMENT_TO_PIN_SUCCESS';
export const ADD_ATTACHMENT_TO_PIN_FAILURE = 'ADD_ATTACHMENT_TO_PIN_FAILURE';

export const UPDATE_TOUR = 'UPDATE_TOUR';
export const REQUEST_TOUR = 'REQUEST_TOUR';

// export const CREATE_FEEDBACK = 'CREATE_FEEDBACK';
// export const UPDATE_FEEDBACK = 'UPDATE_FEEDBACK';
export const SET_FEEDBACK_SUCCESS = 'SET_FEEDBACK_SUCCESS';

export const getToursCreator = () => ({ type: GET_TOURS_REQUEST });
export const createTourCreator = () => ({ type: CREATE_TOUR_REQUEST });
export const addPinCreator = () => ({ type: ADD_PIN_TO_TOUR_REQUEST });
export const addAttachmentCreator = () => ({ type: ADD_ATTACHMENT_TO_PIN_REQUEST });
export const deletePinCreator = () => ({ type: DELETE_PIN_IN_TOUR_SUCCES });
export const update_tour = (id, tour) => ({ type: UPDATE_TOUR, id, tour });
export const request_tour = (id) => ({ type: REQUEST_TOUR, id });


export const create_feedback = (userId, tourId, rate, cb) => dispatch => {
  try {
    RESTService.create_feedback(userId, tourId, rate).then(response => {
      if (response.ok) {
        const { data } = response;
        dispatch({ type: SET_FEEDBACK_SUCCESS, data });
      } else {
        dispatch({ type: SET_FEEDBACK_FAILURE });
        // networkErrorHandler("get tour"+response.problem);
      }
      cb();
    })
  } catch (err) {
    console.warn(err);
    cb();
  }
}

export const update_feedback = (id, rate, cb) => dispatch => {
  try {
    RESTService.update_feedback(id, rate).then(response => {
      if (response.ok) {
        const { data } = response;
        dispatch({ type: SET_FEEDBACK_SUCCESS, data });
      } else {
        dispatch({ type: SET_FEEDBACK_FAILURE });
        // networkErrorHandler("get tour"+response.problem);
      }
      cb();
    })
  } catch (err) {
    cb();
    console.warn(err);
  }
}

export const getTours = () => async dispatch => {
  dispatch(getToursCreator());
  try {
    const response = await RESTService.getTours();
    if (response.ok) {
      const { data } = response;
      dispatch({ type: GET_TOURS_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_TOURS_FAILURE });
      // networkErrorHandler("get tour"+response.problem);
    }
  } catch (err) {
    console.warn(err);
  }
};

export const createTour = (ownerId, formValues, cb) => async dispatch => {
  dispatch(createTourCreator());
  try {
    const response = await RESTService.createTour({ ownerId, ...formValues });

    if (response.ok) {
      const { data: payload } = response;
      dispatch({ type: CREATE_TOUR_SUCCESS, payload });
      if (cb) cb(payload.id);
    } else {
      dispatch({ type: CREATE_TOUR_FAILURE });
      // networkErrorHandler(response.problem);
    }
  } catch (err) {
    console.warn('err', err);
  }
};

export const addPinToTourLocal = pin => dispatch =>
  dispatch({ type: ADD_PIN_TO_TOUR_REQUEST, payload: pin });

export const addPinsForTour = (pins, tourId) => dispatch =>
  dispatch({ type: ADD_PINS_TO_TOUR_LOCAL, payload: { pins, tourId } });

export const getPinsForTour = tourId => async dispatch => {
  try {
    const res = await RESTService.getPinsForTour(tourId);
    if (res.ok) {
      dispatch(addPinsForTour(res.data, tourId));
    } else {
      // networkErrorHandler("asdasd"+ res.problem);
    }
  } catch (err) {
  }
};

export const addPinToTour = (tourId, { title, description }, coordinate, cb, media_type, formData) => async dispatch => {
  dispatch(addPinCreator());
  try {
    let response;
    if (formData) {
      response = await RESTService.createPinWithMedia(tourId, title, description, coordinate, media_type, formData);
    } else {
      response = await RESTService.createPin(tourId, title, description, coordinate);
    }

    if (response.ok) {
      const { data } = response;
      dispatch({ type: ADD_PIN_TO_TOUR_SUCCESS, payload: data });
      if (cb) {
        cb(data.id);
      } else {
      }
    } else {
      dispatch({ type: ADD_PIN_TO_TOUR_FAILURE })
      // networkErrorHandler("ADD_PIN_TO_TOUR_FAILURE!");
    }
  } catch (err) {
    dispatch({ type: ADD_PIN_TO_TOUR_FAILURE })
    // networkErrorHandler("Network ADD_PIN_TO_TOUR_FAILURE!");
  }
};

export const addAttachmentToPin = (pinId, media_type, formData, cb) => async dispatch => {
  dispatch(addAttachmentCreator())
  try {
    let response = await RESTService.addAttachment(pinId, media_type, formData);
    if (response.ok) {
      const { data } = response;
      dispatch({ type: ADD_ATTACHMENT_TO_PIN_SUCCESS, payload: data });
      if (cb) cb();
    } else {
      dispatch({ type: ADD_ATTACHMENT_TO_PIN_FAILURE })
      // networkErrorHandler("ADD_ATTACHMENT_TO_PIN_FAILURE");
    }
  } catch (err) {
    // networkErrorHandler("ADD_ATTACHMENT_TO_PIN_FAILURE");
  }
};

export const deletePinLocal = newPinsArray => dispatch => {
  dispatch({ type: DELETE_PIN_IN_TOUR_SUCCES, payload: newPinsArray });
};

export const deletePin = (tourId, pinId, newPinsArray) => async dispatch => {
  try {
    const response = await RESTService.deletePin(tourId, pinId);
    if (response.ok) {
      dispatch({ type: DELETE_PIN_IN_TOUR_SUCCES, payload: newPinsArray });
      return true;
    }
    if (response.status === 403) {
      // networkErrorHandler('You are not creator');
    } else {
      // networkErrorHandler(response.problem);
    }
    return false;
  } catch (err) {
    console.warn('deletePin err', err);
  }
};
