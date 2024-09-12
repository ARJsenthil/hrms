import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Leftnav from '../components/layouts/Leftnav';
import Index from '../components/pages/dashboard/Index';
import Listfaq from '../components/pages/faqs/Listfaq';
import Listdocument from '../components/pages/document/Listdocument';
import Leave from '../components/pages/leave/Leave';
import Footer from '../components/layouts/Footer';
import Emp from '../components/pages/employe/emp';
import Addemp from '../components/pages/employe/addemp';
import CompanyPolicies from '../components/pages/Company Policies/policyName/companyPolicies';
function Routing() {
    return (
        <Router>
            <div class="container-scroller">
                <Header />
                <div class="container-fluid page-body-wrapper">
                    <Leftnav />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/emp" element={<Emp />} />
                                <Route path="/addemp" element={<Addemp />} />
                                <Route path="/Listfaq" element={<Listfaq />} />
                                <Route path="/Listdocument" element={<Listdocument />} />
                                <Route path="/leave" element={<Leave />} />
                                <Route path="/ListCompanyPolicies" element={<CompanyPolicies />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </Router>

    );
}

export default Routing;
