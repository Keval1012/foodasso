import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OperationDataState {
  kotListOpeData: any;
  kotFilterOpeData: any;
  duePaymentOpeData: any;
  duePaymentFilterOpeData: any;
  orderWiseOpeData: any;
  orderWiseFilterOpeData: any;
  customerWiseOpeData: any;
  customerWiseFilterOpeData: any;
  currentOrderAllOpeData: any;

  dineInOrderAllOpeData: any;
  deliveryOrderAllOpeData: any;
  pickUpOrderAllOpeData: any;
  advanceOrderAllOpeData: any;
}

const initialState: OperationDataState = {
  kotListOpeData: null,
  kotFilterOpeData: null,
  duePaymentOpeData: null,
  duePaymentFilterOpeData: null,
  orderWiseOpeData: null,
  orderWiseFilterOpeData: null,
  customerWiseOpeData: null,
  customerWiseFilterOpeData: null,
  currentOrderAllOpeData: null,

  dineInOrderAllOpeData: null,
  deliveryOrderAllOpeData: null,
  pickUpOrderAllOpeData: null,
  advanceOrderAllOpeData: null,
};

export const operationDataSlice = createSlice({
  name: "operationData",
  initialState,
  reducers: {
    setKotListOpeData: (state, action: PayloadAction<any>) => {
      state.kotListOpeData = action.payload;
    },
    setKotFilterOpeData: (state, action: PayloadAction<any>) => {
      state.kotFilterOpeData = action.payload;
    },
    setDuePaymentOpeData: (state, action: PayloadAction<any>) => {
      state.duePaymentOpeData = action.payload;
    },
    setDuePaymentFilterOpeData: (state, action: PayloadAction<any>) => {
      state.duePaymentFilterOpeData = action.payload;
    },
    setOrderWiseOpeData: (state, action: PayloadAction<any>) => {
      state.orderWiseOpeData = action.payload;
    },
    setOrderWiseFilterOpeData: (state, action: PayloadAction<any>) => {
      state.orderWiseFilterOpeData = action.payload;
    },
    setCustomerWiseOpeData: (state, action: PayloadAction<any>) => {
      state.customerWiseOpeData = action.payload;
    },
    setCustomerWiseFilterOpeData: (state, action: PayloadAction<any>) => {
      state.customerWiseFilterOpeData = action.payload;
    },
    setCurrentOrderAllOpeData: (state, action: PayloadAction<any>) => {
      state.currentOrderAllOpeData = action.payload;
    },

    setDineInOrderAllOpeData: (state, action: PayloadAction<any>) => {
      state.dineInOrderAllOpeData = action.payload;
    },
    setDeliveryOrderAllOpeData: (state, action: PayloadAction<any>) => {
      state.deliveryOrderAllOpeData = action.payload;
    },
    setPickUpOrderAllOpeData: (state, action: PayloadAction<any>) => {
      state.pickUpOrderAllOpeData = action.payload;
    },
    setAdvanceOrderAllOpeData: (state, action: PayloadAction<any>) => {
      state.advanceOrderAllOpeData = action.payload;
    },
  },
});

export const {
  setKotListOpeData,
  setKotFilterOpeData,
  setDuePaymentOpeData,
  setDuePaymentFilterOpeData,
  setOrderWiseOpeData,
  setOrderWiseFilterOpeData,
  setCustomerWiseOpeData,
  setCustomerWiseFilterOpeData,
  setCurrentOrderAllOpeData,

  setDineInOrderAllOpeData,
  setDeliveryOrderAllOpeData,
  setPickUpOrderAllOpeData,
  setAdvanceOrderAllOpeData,
} = operationDataSlice.actions;

export default operationDataSlice.reducer;