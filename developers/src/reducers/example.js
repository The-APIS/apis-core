import { EXAMPLE } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function example(state = initialState.example, action) {
  switch (action.type) {
    case EXAMPLE:
      // For this example, just simulating a save by changing date modified.
      return objectAssign({}, state, {dateModified: action.dateModified});

    default:
      return state;
  }
}
