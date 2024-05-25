import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie'
import { USER  , TOKEN} from '../../components/cosnt';

const initialState = {
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  loading:false,
  user: JSON.parse(localStorage.getItem(USER)) || null ,
};

const counterSlice = createSlice( {
  initialState,
  name: 'auth',
  reducers: {
    setAuth( state, {payload: {user , token , navigate}} ) {
      const {role} = user;
      state.isAuthenticated = true;
      state.user = user ;
      Cookies.set(TOKEN , token);
      localStorage.setItem(USER  ,JSON.stringify(user))
      navigate('/dashboard')
    },
    logout( state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(USER)
      Cookies.remove( TOKEN )
    },
    controlLoading(state) {
      state.loading = !state.loading
    }
  },
} )

const { reducer: authReducer, actions } = counterSlice;

export const { setAuth , logout , controlLoading } = actions;

export default authReducer