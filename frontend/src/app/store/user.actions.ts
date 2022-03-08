import { createAction, props } from '@ngrx/store';
import { RegisterError, RegisterUserData, User } from '../models/user.model';

export const registerUserRequest = createAction(
  '[User] Register Request',
  props<{userData: RegisterUserData}>()
);
export const registerUserSuccess = createAction(
  '[User] Register Success',
  props<{user: User}>()
);
export const registerUserFailure = createAction(
  '[User] Register Failure',
  props<{error: null | RegisterError}>()
);
