import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import themeReducer from './themeSlice';
import connectionReducer from './connectionSlice';
import requestReducer from './requestSlice';


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        theme: themeReducer,
        connections: connectionReducer,
        request: requestReducer,


    }
});
export default appStore;