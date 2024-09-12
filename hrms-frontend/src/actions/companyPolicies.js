import axios from "axios"
import ImportedUrl from "../utils/api"


export function AC_LIST_COMPANYPOLICIES(params) {
    console.log('action')
    try {
        return async function(dispatch) {
            const res = await axios.get(ImportedUrl.API.companyPolicies.listCompanyPolicies, { params });
            dispatch( { type : "LIST_COMPANYPOLICIES", payload : res.data } )
        }
    } 
    catch (error) {
        console.log(error)
    }
}

export function AC_HANDLECHANGE_COMPANYPOLICIES(name, value) {
    return function (dispatch) {
        console.log("action",name, value)
        dispatch({ type: "HANDLECHANGE_COMPANYPOLICIES", name: name, value: value });
    }
}

export function AC_VIEW_COMPANYPOLICIES(ID) {
    try {
        return async function (dispatch) {
            const response = await axios.post(ImportedUrl.API.companyPolicies.viewCompanyPolicies + `/${ID}`);
            dispatch({ type: 'VIEW_COMPANYPOLICIES', payload: response.data })
            console.log(response.data)
        }
    } catch (error) {
        console.log('------------- Error fetching PolicyNames:', error);
    }
}

export function AC_CLEAR_COMPANYPOLICIES(params) {
    return function (dispatch) {
        dispatch({ type: 'CLEAR_COMPANYPOLICIES' })
    }
}