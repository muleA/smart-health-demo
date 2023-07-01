import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/app.store";

interface GlobalError {
  error: any;
}

const initialState: GlobalError = { error: null };

const GlobalErrorSlice = createSlice({
  name: "globalError",
  initialState,
  reducers: {
    setError: (state: GlobalError, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});
export const selectError = (state: RootState) => state.globalError.error;
export const { setError } = GlobalErrorSlice.actions;
export const GlobalErrorReducer = GlobalErrorSlice.reducer;
