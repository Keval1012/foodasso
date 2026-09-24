import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BillingDataState {
    userData: any;
}

const initialState: BillingDataState = {
    userData: null
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
        }
    }
});

export const {
    setUserData
} = userDataSlice.actions;

export default userDataSlice.reducer;