import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import PropTypes from "prop-types";
import authReducer from "../slice/auth";
import skillReducer from "../slice/skill";
import experienceReducer from "../slice/experience";

const rootReducer = {
    auth: authReducer,
    skill: skillReducer,
    experience:experienceReducer,
  }

const store = configureStore({reducer:rootReducer})

const StoreProvider = ({children}) => {
    return(
        <Provider store={store}>{children}</Provider>
    )
}

StoreProvider.propTypes = {
    children:PropTypes.node
}

export default StoreProvider;