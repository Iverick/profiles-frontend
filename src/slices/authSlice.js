import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authSerive from '../services/auth.service'

// Parces localStorage to see if there's a user already logged in
const user = JSON.parse(localStorage.getItem("user"))

const initialState = user ? { user } : { user: null }

// Resolves a call to register API endpoint using authSerive
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, admin }, thunkAPI) => {
    try {
      const response = await authSerive.register(username, email, password, admin)
      return response
    } catch (err) {
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
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue()
    }
  }
)

// Resolves a call to logout API endpoint using authSerive
export const logout = createAsyncThunk(
  "auth/logout",
  async (thunkAPI) => {
    try {
      await authSerive.logout()
    } catch (err) {
      console.log(err)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return thunkAPI.rejectWithValue()
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = null
    },
    [register.rejected]: (state, action) => {
      state.user = null
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user
    },
    [login.rejected]: (state, action) => {
      state.user = null
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null
    },
    [logout.rejected]: (state, action) => {
      state.user = null
    },
  }
})

const { reducer } = authSlice

export default reducer
