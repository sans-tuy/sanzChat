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
    increment: (state: any) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state: any) => {
      state.value -= 1;
    },
    incrementByAmount: (state: any, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    saveUserData: (state: any, action: PayloadAction<object>) => {
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount, saveUserData} =
  counterSlice.actions;

export default counterSlice.reducer;
