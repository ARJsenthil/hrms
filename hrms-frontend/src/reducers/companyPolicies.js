
const initialState = {
    companyPolicies : {
        policyName : '',
        policyDiscription : '',
        policyCategory : '',
        effectiveDate : '',
        expirationDate : '',
        policyDocument : '',
        policyOwner : '',
        policyApprover : '',
        versionNumber : '',
        status : '',
        comments : '',
    }, 
    listCompanyPolicies : '',
}

const companyPoliciesReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case 'LIST_COMPANYPOLICIES' : 
        return {
            ...state,
            listCompanyPolicies : action.payload
        }
        case 'HANDLECHANGE_COMPANYPOLICIES':
            return Object.assign({}, state, {
                companyPolicies: {
                    ...state.companyPolicies,
                    [action.name]: action.value
                }
            })
        case 'VIEW_COMPANYPOLICIES':
            return {
                ...state,
                companyPolicies: action.payload ? action.payload : null,
            }
        case 'CLEAR_COMPANYPOLICIES':
            return {
                ...state,
                companyPolicies: initialState.companyPolicies,
            }
        default:
            return state;
            break;
    }
}
export default companyPoliciesReducer;
