import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import PropTypes from "prop-types";
import authReducer from "../slice/auth";
import skillReducer from "../slice/skill";
import experienceReducer from "../slice/experience";
import educationQuery from "../query/education";
import portfolioQuery from "../query/portfolio";

const rootReducer = {
    auth: authReducer,
    skill: skillReducer,
    experience:experienceReducer,
    education:educationQuery.reducer,
    portfolio:portfolioQuery.reducer,
  }

const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(educationQuery.middleware , portfolioQuery.middleware)
})


const StoreProvider = ({children}) => {
    return(
        <Provider store={store}>{children}</Provider>
    )
}

StoreProvider.propTypes = {
    children:PropTypes.node
}

export default StoreProvider;