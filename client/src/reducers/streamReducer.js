import {
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_STREAM,
} from "../actions/types";
import _ from "lodash";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      // do not have to reference id as already doing so in action creator. omit creates a new object (the first argument) without whatever is in the second argument
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
