import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import themeReducer from './themeSlice';


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        theme:themeReducer,
        
    }
});
export default appStore;