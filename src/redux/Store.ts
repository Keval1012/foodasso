import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, WebStorage } from 'redux-persist';
import billingDataSlice from "./Features/BillingDataSlice";
import storage from "redux-persist/lib/storage";
import { userDataSlice } from "./Features/UserDataSlice";
import operationDataSlice from "./Features/OperationDataSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage as WebStorage,
};

const rootReducer = combineReducers({
    userData: userDataSlice,
    billingData: billingDataSlice,
    operationData: operationDataSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);