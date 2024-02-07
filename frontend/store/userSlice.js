import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currId: 0,
    currUserName: '',
    currEmail: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setId: (state,action) => {
            state.currId = action.payload
        },
        setUserName: (state,action) => {
            state.currUserName = action.payload
        },
        setEmail: (state,action) => {
            state.currEmail = action.payload
        }
    }
})

export const { setEmail,setId,setUserName } = userSlice.actions
export default userSlice.reducer