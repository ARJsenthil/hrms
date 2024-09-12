import { combineReducers } from 'redux';

import faqReducer from './reducers/Faq';
import documentReducer from './reducers/document';
import employeeReducer from './reducers/employe';   
import leaveReducer from './reducers/Leave';
import companyPoliciesReducer from './reducers/companyPolicies';

export default combineReducers({
    faqReducer,
    documentReducer,
    employee:employeeReducer,
    leaveReducer,
    companyPoliciesReducer
})

