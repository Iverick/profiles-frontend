import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authSerive from '../services/auth.service'

// Parces localStorage to see if there's a user already logged in
const user = JSON.parse(localStorage.getItem("user"))

// Checks whether user.admin state is true or false
//
// Return: Boolean
const userIsAdmin = () => {
  return user.admin
}

const initialState = user 
 ? { loggedIn: true, isAdmin: userIsAdmin(), user } 
 : { loggedIn: false, isAdmin: false, user: null }

// Resolves a call to register API endpoint using authSerive
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, admin }, thunkAPI) => {
    try {
      const response = await authSerive.register(username, email, password, admin)
      return response
    } catch(err) {
      console.log(err)
      return thunkAPI.rejectWithValue()
    }
  }
)

// Resolves a call to login API endpoint using authSerive
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authSerive.login(email, password)
      return { user: response.data.user }
    } catch(err) {
      console.log(err)
      return thunkAPI.rejectWithValue()
    }
  }
)

// Resolves a call to logout API endpoint using authSerive
export const logout = createAsyncThunk(
  "auth/logout",
  async() => { 
    await authSerive.logout() 
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.loggedIn = false
      state.isAdmin = false
    },
    [register.rejected]: (state, action) => {
      state.loggedIn = false
      state.isAdmin = false
    },
    [login.fulfilled]: (state, action) => {
      state.loggedIn = true
      state.isAdmin = action.payload.user.admin
      state.user = action.payload.user
    },
    [login.rejected]: (state, action) => {
      state.loggedIn = false
      state.isAdmin = false
      state.user = null
    },
    [logout.fulfilled]: (state, action) => {
      state.loggedIn = false
      state.isAdmin = false
      state.user = null
    },
  }
})

const { reducer } = authSlice

export default reducer
