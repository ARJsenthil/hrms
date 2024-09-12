const mongoose = require('mongoose');
// importing schemas to create model
const importedSchema = require('../schemas/faqschema');
const documentSchema = require('../schemas/documentSchema');
const companyPoliciesSchema = require('../schemas/companyPolicySchema');
const employeeSchema = require('../schemas/employeeSchema');

// Creating schema
const FaqSchema = mongoose.Schema(importedSchema, { timestamps: true, versionKey: false });
const DocumentSchema =mongoose.Schema(documentSchema, { timestamps: true,versionKey: false });
const CompanyPoliciesSchema =mongoose.Schema(companyPoliciesSchema, { timestamps: true,versionKey: false });
const EmployeeSchema =mongoose.Schema(employeeSchema, { timestamps: true,versionKey: false });

// Creating models
const FaqModel = mongoose.model('faqs', FaqSchema);
const DocumentModel = mongoose.model('documents', DocumentSchema);
const CompanyPoliciesModel = mongoose.model('companyPolicies', CompanyPoliciesSchema);
const EmployeeModel = mongoose.model('employee', EmployeeSchema);


module.exports = {
  faqs: FaqModel,
  document: DocumentModel,
  companyPolicies : CompanyPoliciesModel,
  employee : EmployeeModel,
}
