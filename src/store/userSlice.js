import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        apiKey: "nithin-dbs",
        token: "",
        isAuth: false,
        userName: "",
        todo:'',
    },
    reducers: {
        addToken: (state, action) => {
            state.isAuth = true;
            state.token = action.payload;
        },
        addUserName: (state, action) => {
            state.userName = action.payload;
        },
        clearState: (state) => {
            state = userSlice.initialState;
        },
        addTodo : (state, action) => {
            
            state.todo=action.payload;
        }
    },
});

export const { addToken, addUserName, clearState, addTodo } = userSlice.actions;

export default userSlice.reducer;
