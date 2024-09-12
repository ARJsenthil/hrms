const BaseUrl = '/api/v1/';
const express = require("express")

module.exports = function(app) {
    app.use(BaseUrl+"faqs", require('../controllers/admin/faq'));
    app.use(BaseUrl+"employee", require('../controllers/admin/employee'));
    app.use(BaseUrl+"common", require('../controllers/admin/common'));
    app.use(BaseUrl+"documents", require('../controllers/admin/document'));
    app.use(BaseUrl+"companyPolicies", require('../controllers/admin/companyPolicies'));
    app.use('/uploads', express.static('uploads'));
}
