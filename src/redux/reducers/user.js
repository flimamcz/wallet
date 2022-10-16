import { TYPE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_USER:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default reducerUser;
