import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState = {
  users: [
    {
      id: 0,
      email: "",
      created_at: "",
      updated_at: "",
      profiles_count: 0,
      username: "",
      admin: false
    }
  ]
}
