
const ROOTURL = 'http://127.0.0.1:4000/api/v1/';
const temp = 'http://localhost:4000/employe'
const API = {
    addFaq: ROOTURL + 'faqs/addFaq',
    listFaq: ROOTURL + 'faqs/listFaq',
    viewFaq: ROOTURL + 'faqs/viewFaq',
    updateFaq: ROOTURL + 'faqs/updateFaq',
    softDeleteFaq: ROOTURL + 'faqs/softDeleteFaq',
    
    // Document API
    addDocument: ROOTURL + 'documents/addDocument',
    listDocument: ROOTURL + 'documents/listDocument',
    viewDocument: ROOTURL + 'documents/viewDocument',
    updateDocument: ROOTURL + 'documents/updateDocument',
    softDeleteDocument: ROOTURL + 'documents/softDeleteDocument',
    generateDocumentListFile: ROOTURL + 'documents/generateDocumentListFile',

    // Company Policies API
    companyPolicies : {

            addCompanyPolicies: ROOTURL + 'companyPolicies/addCompanyPolicies',
            listCompanyPolicies: ROOTURL + 'companyPolicies/listCompanyPolicies',
            viewCompanyPolicies: ROOTURL + 'companyPolicies/viewCompanyPolicies',
            updateCompanyPolicies: ROOTURL + 'companyPolicies/updateCompanyPolicies',
            softDeleteCompanyPolicies: ROOTURL + 'companyPolicies/softDeleteCompanyPolicies',
            generateCompanyPoliciesListFile: ROOTURL + 'companyPolicies/generateCompanyPoliciesListFile',
    },

    addEmployee: ROOTURL + 'employee/addEmployee',
    listEmployee: ROOTURL + 'employee/listEmployee',
    viewEmployee: ROOTURL + 'employee/viewEmployee',
    updateEmployee: ROOTURL + 'employee/updateEmployee',
    softDeleteEmployee: ROOTURL + 'employee/softDeleteEmployee',
    generateEmployeeListFile: ROOTURL + 'employee/generateEmployeeListFile',

}

const ImportedUrl = {
    API: API
}
export default ImportedUrl;


