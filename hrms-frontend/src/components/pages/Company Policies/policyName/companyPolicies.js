import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios';
import ImportedUrl from '../../../../utils/api';
import { Error, Success } from '../../../../utils/Swalalermsg';
import { AC_CLEAR_COMPANYPOLICIES, AC_HANDLECHANGE_COMPANYPOLICIES, AC_LIST_COMPANYPOLICIES, AC_VIEW_COMPANYPOLICIES } from '../../../../actions/companyPolicies';

function CompanyPolicies(props) {
    const policyDocument = useRef(null)
    const [policyNameError, setPolicyNameError] = useState(false);
    const [policyDiscriptionError, setPolicyDiscriptionError] = useState(false);
    const [policyCatagoryError, setPolicyCatagoryError] = useState(false);
    const [effectiveDateError, setEffectiveDateError] = useState(false);
    const [expirationDateError, setExpirationDateError] = useState(false);
    const [policyDocumentError, setPolicyDocumentError] = useState(false);
    const [policyOwnerError, setPolicyOwnerError] = useState(false);
    const [policyApproverError, setPolicyApproverError] = useState(false);
    const [versionNumberError, setVersionNumberError] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [commentsError, setCommentsError] = useState(false);
    const [modelType, setModelType] = useState('Add');
    const dispatch = useDispatch();
    const fetchCompanyPolicies = async () => {
        console.log('test fetch')
        try {
            await AC_LIST_COMPANYPOLICIES()(dispatch); // Call AC_LIST_COMPANYPOLICIESand pass dispatch
        console.log('test try')
        } catch (error) {
            console.error("Error fetching PolicyName's:", error);
        console.log('test err')
    }
    };

    useEffect(() => {
        fetchCompanyPolicies();
        console.log('test')
    }, []);

    // Access entire state 
    const listCompanyPoliciesReducer = useSelector((state) => state.companyPoliciesReducer);
    const data = {
        listCompanyPolicies: listCompanyPoliciesReducer.listCompanyPolicies,
        policyName: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.policyName,
        policyDiscription: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.policyDiscription,
        policyCategory: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.policyCategory,
        effectiveDate: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.effectiveDate,
        expirationDate: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.expirationDate,
        policyDocument: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.policyDocument,
        policyOwner: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.policyOwner,
        policyApprover: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.policyApprover,
        versionNumber: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.versionNumber,
        status: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.status,
        comments: listCompanyPoliciesReducer.companyPolicies && listCompanyPoliciesReducer.companyPolicies.comments,
    }

    console.log(listCompanyPoliciesReducer)
    const fetchFile = async (fileData, type) => {
                console.log("response", fileData)
                const fileInput = document.getElementById('policyDocument');
        if (fileData) {
            if(type == "add") {
                
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(fileData);
                // fileInput.files = dataTransfer.files;
                policyDocument.current.files = dataTransfer.files
                console.log('File in input:', fileInput.files[0]);
            }

            else if(type == "update") {

                
                const response = await fetch(`http://127.0.0.1:4000/uploads/${fileData.policyDocument}`);
                const blob = await response.blob();
                const file = new File([blob], fileData.policyDocument, { type: blob.type });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                console.log("response")
                policyDocument.current.files = dataTransfer.files
                dispatch(AC_HANDLECHANGE_COMPANYPOLICIES("policyDocument", file))
            }
        }
    }

    const handleChange = (event) => {
        var name = event.target.name
        var value = event.target.value;
        if(name == "policyDocument") {
            var file = event.target.files[0];
            dispatch(AC_HANDLECHANGE_COMPANYPOLICIES(name, file))
            if (name === 'policyDocument') {
                if (file.type) {
                    setPolicyDocumentError(false)
                } else {
                    setPolicyDocumentError(true)
                }
            }
            fetchFile(file, "add");
        }
        else {
        dispatch(AC_HANDLECHANGE_COMPANYPOLICIES(name, value))
        if (name === 'policyName') {
            if (value) {
                setPolicyNameError(false)
            } else {
                setPolicyNameError(true)
            }
        }
        else if (name === 'policyDiscription') {
            if (value) {
                setPolicyDiscriptionError(false)
            } else {
                setPolicyDiscriptionError(true)
            }
        }
        else if (name === 'policyCatagory' && value !== "-1") {
            if (value) {
                setPolicyCatagoryError(false)
            } else {
                setPolicyCatagoryError(true)
            }
        }
        else if (name === 'effectiveDate') {
            if (value) {
                setEffectiveDateError(false)
            } else {
                setEffectiveDateError(true)
            }
        }
        else if (name === 'expirationDate') {
            if (value) {
                setExpirationDateError(false)
            } else {
                setExpirationDateError(true)
            }
        }
        
        else if (name === 'policyOwner') {
            if (value) {
                setPolicyOwnerError(false)
            } else {
                setPolicyOwnerError(true)
            }
        }
        else if (name === 'policyApprover') {
            if (value) {
                setPolicyApproverError(false)
            } else {
                setPolicyApproverError(true)
            }
        }
        else if (name === 'versionNumber') {
            if (value) {
                setVersionNumberError(false)
            } else {
                setVersionNumberError(true)
            }
        }
        else if (name === 'status') {
            if (value) {
                setStatusError(false)
            } else {
                setStatusError(true)
            }
        }
        else if (name === 'comments') {
            if (value) {
                setCommentsError(false)
            } else {
                setCommentsError(true)
            }
        }
    }   
    }
    const addModel = () => {
        if(modelType != "View") {

            policyDocument.current.value = null;
        }
        setModelType('Add')
    }
    const handleClick = () => {
        let data = listCompanyPoliciesReducer.companyPolicies;
        let valid = 1;
        if (!data.policyName) {
            setPolicyNameError(true);
            valid = 0
        }
        if (!data.policyDiscription) {
            setPolicyDiscriptionError(true);
            valid = 0
        }
        if (!data.policyCatagory && data.policyCatagory === "-1") {
            setPolicyCatagoryError(true);
            valid = 0
        }
        if (!data.effectiveDate) {
            setEffectiveDateError(true);
            valid = 0
        }
        if (!data.expirationDate) {
            setExpirationDateError(true);
            valid = 0
        }
        if (!data.policyDocument) {
            setPolicyDocumentError(true);
            valid = 0
        }
        if (!data.policyOwner) {
            setPolicyOwnerError(true);
            valid = 0
        }
        if (!data.policyApprover) {
            setPolicyApproverError(true);
            valid = 0
        }
        if (!data.versionNumber) {
            setVersionNumberError(true);
            valid = 0
        }
        if (!data.comments) {
            setCommentsError(true);
            valid = 0
        }
        if (valid) {
            const formData = new FormData();
            formData.append("policyName", data.policyName)
            formData.append("policyDiscription", data.policyDiscription)
            formData.append("policyCatagory", data.policyCatagory)
            formData.append("effectiveDate", data.effectiveDate)
            formData.append("expirationDate", data.expirationDate)
            formData.append("policyDocument", data.policyDocument)
            formData.append("policyApprover", data.policyApprover)
            formData.append("policyOwner", data.policyOwner)
            formData.append("versionNumber", data.versionNumber)
            formData.append("status", data.status)
            formData.append("comments", data.comments)
            if (modelType === 'Add') {
                console.log(modelType)
                axios.post(ImportedUrl.API.companyPolicies.addCompanyPolicies, formData, { headers: { 'Content-Type': 'multipart/form-data', }, })
                    .then(res => {
                        AC_CLEAR_COMPANYPOLICIES()(dispatch);
                        AC_LIST_COMPANYPOLICIES()(dispatch);
                        Success('PolicyName added successfully');
                        document.getElementById('closeModel').click();
                    })
                    .catch(err => {
                        let error = err.response?.status
                        if (error == 409) {
                            Error('Data is already exists!')
                        }
                    })
            } else {
                console.log(data._id)
                axios.post(ImportedUrl.API.companyPolicies.updateCompanyPolicies + `/${data._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', }, })
                    .then(res => {
                        AC_CLEAR_COMPANYPOLICIES()(dispatch);
                        AC_LIST_COMPANYPOLICIES()(dispatch);
                        Success('PolicyName updated successfully')
                        document.getElementById('closeModel').click();
                    })
                    .catch(err => {
                        let error = err.response?.status
                        if (error == 409) {
                            Error('Data is already exists!')
                        }
                    })
            }
        }
    }
    const handleView = (ID) => {
        setModelType('View');
        dispatch(AC_VIEW_COMPANYPOLICIES(ID));
    }
    const handleUpdate = (data, ID) => {
        setModelType('Edit');
        dispatch(AC_VIEW_COMPANYPOLICIES(ID));
        fetchFile(data, "update");
    }
    const handleClose = () => {
        AC_CLEAR_COMPANYPOLICIES()(dispatch);
    }
    const handleStatus = (ID, Modal) => {
        Swal.fire({
            title: "Are you sure to change status?",
            // text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(ImportedUrl.API.statusChange + `/${ID}/${Modal}`)
                    .then(res => {
                        AC_LIST_COMPANYPOLICIES()(dispatch);
                        Swal.fire({
                            title: "Staus changed!",
                            text: "Your status has been updated.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        throw err;
                    })
            }
        });
    }
    const handleDelete = (ID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(ImportedUrl.API.companyPolicies.softDeleteCompanyPolicies + `/${ID}`)
                    .then(res => {
                        AC_LIST_COMPANYPOLICIES()(dispatch);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        throw err;
                    })

            }
        });
    }
    const downloadPDF = () => {
        const tableHtml = document.getElementById('table-id').outerHTML;
        const styles = '<style> body { text-align: center ; } #table-id { width: 100%;border: 1px solid black; border-collapse: collapse; } #table-id th, #table-id td { border: 1px solid black; padding: 8px; text-align: center;} .action{ display:none !important; }';
    
        axios.post(ImportedUrl.API.companyPolicies.generateCompanyPoliciesListFile, { tableHtml, styles}, {
            responseType: 'blob',
        })
        .then( response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'CompanyPoliciesList.pdf');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error =>  {
          console.error('Error downloading PDF:', error);
        })
    }
    return (
        <>
            <div class="page-header">
                <h3 class="page-title"> PolicyName's </h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Form elements</li>
                    </ol>
                </nav>
            </div>
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div className='d-flex justify-content-between mb-4'>
                            <h4 class="card-title">List Company Policies</h4>
                            <span className="d-flex">
                            <span><abbr title="Download PDF"><i class="mdi mdi-download btn btn-gradient-primary px-2 py-2" style={{ fontSize: "25px", cursor: "pointer", marginRight: "5px" }} onClick={() => downloadPDF()} data-bs-target="#staticBackdrop"></i></abbr></span>
                            <button type="button" class="btn btn-gradient-primary btn-fw" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => addModel()}>Add PolicyName</button>
                            </span>
                        </div>
                        <div className='d-flex'>
                        <div className='overflow-scroll'>
                        <table class="table" id="table-id">
                            <thead>
                                <tr>
                                    <th>Policy Name</th>
                                    <th>Policy Discription</th>
                                    <th>Policy Catagory</th>
                                    <th>Effective Date</th>
                                    <th>Expiration Date</th>
                                    <th>Policy Document</th>
                                    <th>Policy Owner</th>
                                    <th>Policy Approver</th>
                                    <th>Version Number</th>
                                    <th>Status</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.listCompanyPolicies && data.listCompanyPolicies.length > 0 ? data.listCompanyPolicies.map(data => {
                                    return <tr key={data._is}>
                                        <td>{data.policyName}</td>
                                        <td>{data.policyDiscription}</td>
                                        <td>{data.policyCatagory}</td>
                                        <td>{data.effectiveDate}</td>
                                        <td>{data.expirationDate}</td>
                                        <td>{data.policyDocument}</td>
                                        <td>{data.policyOwner}</td>
                                        <td>{data.policyApprover}</td>
                                        <td>{data.versionNumber}</td>
                                        <td ><label style={{ cursor: "pointer" }} class={`badge ${data.status === true ? 'badge-success' : 'badge-danger'}`} onClick={() => handleStatus(data._id, 'companyPolicies')}>{data.status === true ? 'Active' : 'Inactive'}</label></td>
                                        {/* <td >{data.status}</td> */}
                                        <td>{data.comments}</td>
                                    </tr>
                                }) :
                                    <tr><td >No record to</td></tr>
                                }

                            </tbody>
                        </table>
                        </div>  
                        <table class="table w-auto" id="table-id">
                            <thead>
                                <tr>
                                    <th className="action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.listCompanyPolicies && data.listCompanyPolicies.length > 0 ? data.listCompanyPolicies.map(data => {
                                    return <tr key={data._is}>
                                        <td className="action">
                                            <i class="mdi mdi-eye" onClick={() => handleView(data._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                                            <i class="mdi mdi-pencil-box" onClick={() => handleUpdate(data, data._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" ></i>
                                            <i class="mdi mdi-delete" onClick={() => handleDelete(data._id)}></i>
                                        </td>
                                    </tr>
                                }) :
                                <tr><td >No record to</td></tr>
                            }

                            </tbody>
                        </table>
                            </div>
                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">{modelType} Company Policies</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                                    </div>
                                    {modelType === 'View' ?
                                        <div class="modal-body">
                                            <h5>Policy Name : {data.policyName}</h5>
                                            <p>Policy Discription : {data.policyDiscription}</p>
                                            <p>Policy Catagory : {data.policyCatagory}</p>
                                            <p>Effective Date : {data.effectiveDate}</p>
                                            <p>Expiration Date : {data.expirationDate}</p>
                                            <p>Policy Document : <a href={"http://127.0.0.1:4000/uploads/"+ data.policyDocument} target="_blank">{data.policyDocument}</a></p>
                                            <p>Policy Owner : {data.policyOwner}</p>
                                            <p>Policy Approver : {data.policyApprover}</p>
                                            <p>Version Number : {data.versionNumber}</p>
                                            <p>Status : {data.status === true ? 'Active' : 'Inactive'}</p>
                                            {/* <p>Status : {data.status}</p> */}
                                            <p>Comments : {data.comments}</p>
                                        </div>
                                        :
                                        <>
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label for="policyName">Policy Name<code>*</code></label>
                                                    <input type="text" name='policyName' value={data.policyName} onChange={handleChange} class="form-control" id="policyName" placeholder="Policy Name" autoComplete='off' />
                                                    <code style={{ display: policyNameError ? 'block' : 'none' }}>Policy Name is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="policyDiscription">Policy Discription<code>*</code></label>
                                                    <textarea class="form-control" id="policyDiscription" value={data.policyDiscription} onChange={handleChange} rows="6" name='policyDiscription' placeholder="Discription"></textarea>
                                                    <code style={{ display: policyDiscriptionError ? 'block' : 'none' }}>Policy Discription is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="policyCatagory">Policy Catagory<code>*</code></label>
                                                    <select name='policyCatagory'  value={data.policyCatagory} onChange={handleChange} style={{ height : "48px" }} class="form-control ps-4 text-black" id="policyCatagory" placeholder="policyCatagory" autoComplete='off' >
                                                        <option value="-1">Select</option>
                                                        <option value="Option-1">Employee Conduct</option>
                                                        <option value="Option-2">Data Security</option>
                                                        <option value="Option-n">Leave Policy</option>
                                                    </select>
                                                    <code style={{ display: policyCatagoryError ? 'block' : 'none' }}>Policy Catagory is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="effectiveDate">Effective Date<code>*</code></label>
                                                    <input type="date" name='effectiveDate' value={data.effectiveDate} onChange={handleChange} class="form-control" id="effectiveDate" placeholder="Effective Date" autoComplete='off' />
                                                    <code style={{ display: effectiveDateError ? 'block' : 'none' }}>Effective Date is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="expirationDate">Expiration Date<code>*</code></label>
                                                    <input type="date" name='expirationDate' value={data.expirationDate} onChange={handleChange} class="form-control" id="expirationDate" placeholder="Expiration Date" autoComplete='off' />
                                                    <code style={{ display: expirationDateError ? 'block' : 'none' }}>Expiration Date is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="policyDocument">Policy Document (e.g., PDF, DOCX, JPG, PNG)<code>*</code></label>
                                                    <input type="file" ref={ policyDocument } name='policyDocument'  onChange={handleChange} class="form-control" id="policyDocument" placeholder="Effective Date" autoComplete='off' />
                                                    <code style={{ display: policyDocumentError ? 'block' : 'none' }}>Policy Document is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="policyOwner">Policy Owner<code>*</code></label>
                                                    <input type="text" name='policyOwner' value={data.policyOwner} onChange={handleChange} class="form-control" id="policyOwner" placeholder="Effective Date" autoComplete='off' />
                                                    <code style={{ display: policyOwnerError ? 'block' : 'none' }}>Policy Owner is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="policyApprover">Policy Approver<code>*</code></label>
                                                    <input type="text" name='policyApprover' value={data.policyApprover} onChange={handleChange} class="form-control" id="policyApprover" placeholder="Expiration Date" autoComplete='off' />
                                                    <code style={{ display: policyApproverError ? 'block' : 'none' }}>Policy Approver is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="versionNumber">Version Number<code>*</code></label>
                                                    <input type="number" name='versionNumber' value={data.versionNumber} onChange={handleChange} class="form-control" id="versionNumber" placeholder="Effective Date" autoComplete='off' />
                                                    <code style={{ display: versionNumberError ? 'block' : 'none' }}>Version Number is required</code>
                                                </div>
                                                {/* <div class="form-group">
                                                    <label for="status">Status<code>*</code></label>
                                                    <select name='status'  value={data.status} onChange={handleChange} style={{ height : "48px" }} class="form-control ps-4 text-black" id="status" placeholder="status" autoComplete='off' >
                                                        <option value="-1">Select</option>
                                                        <option value="Option-1">Active</option>
                                                        <option value="Option-2">Inactive</option>
                                                        <option value="Option-n">Under Review</option>
                                                    </select>
                                                </div> */}
                                                <div class="form-group">
                                                    <label for="comments">Comments<code>*</code></label>
                                                    <textarea class="form-control" id="comments"value={data.comments} onChange={handleChange} rows="6" name='comments' placeholder="comments">132</textarea>
                                                    <code style={{ display: commentsError ? 'block' : 'none' }}>Policy Comments is required</code>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" id='closeModel' data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                                <button type="button" class="btn btn-primary" onClick={() => handleClick()}>{modelType === 'Add' ? 'Save' : 'Update'} </button>
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyPolicies;