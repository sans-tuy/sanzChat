import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  userData: object;
  receiverData: object;
}

const initialState: CounterState = {
  value: 0,
  userData: {},
  receiverData: {},
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveUserData: (state: any, action: PayloadAction<object>) => {
      state.userData = action.payload;
    },
    saveReceiverData: (state: any, action: PayloadAction<object>) => {
      state.receiverData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveUserData, saveReceiverData} = counterSlice.actions;

export default counterSlice.reducer;
