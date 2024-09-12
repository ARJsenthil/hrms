const express = require('express');
const Router = express.Router();
const DB = require('../../models/db');
const db = require('../../models/schemaconnection');
const HELPERFUNC = require('../../models/commonfunctions');
const puppeteer = require("puppeteer")
const multer = require('multer');
const project = {
    createdAt : 0,
    updatedAt : 0
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    var type = file.mimetype.split("/");
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, type[0] + '-' + uniqueSuffix+'.'+type[1])
    }
  })

  const upload = multer({ storage: storage })

  const fileType = upload.single('policyDocument');
Router.post('/addCompanyPolicies', fileType, async function(req, res) {
    const formData = {
        policyName: req.body.policyName,
        policyDiscription: req.body.policyDiscription,
        policyCatagory: req.body.policyCatagory,
        effectiveDate: req.body.effectiveDate,
        expirationDate: req.body.expirationDate,
        policyDocument: req.file.filename,
        policyOwner: req.body.policyOwner,
        policyApprover: req.body.policyApprover,
        versionNumber: req.body.versionNumber,
        status: req.body.status ? req.body.status : 1,
        comments: req.body.comments,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : 0
    }
    try {
        console.log('hi')
        const data = await db.companyPolicies.findOne( { policyName : formData.policyName } );
    if(data) {
        res.statusMessage = "Policy Name name already exists";
        return res.status(409).end();
    }
    else {
        DB.InsertDocument('companyPolicies', formData, function(err, result) {
            if(err) {
                console.log(err)
                res.status(500).end();
            }
            else if(result) {
                res.status(200).json(result);
            }
        })
    }
    }
    catch (err) {
        console.log(err)
        res.status(500).end();
    }
});

Router.get("/listCompanyPolicies", function(req, res) {
    console.log('data')
    let query = {};
    query = { isDeleted: false };
        DB.GetDocument('companyPolicies', query, project, { sort: { createdAt: -1 } }, function (err, result) {
            if(err) {
                res.status(400).end();
            }
            else if(result) {
                res.status(200).json(result);
            }
        });
});

Router.post("/viewCompanyPolicies/:id", async function(req, res) {
    try {
        const result = await DB.GetOneDocument('companyPolicies', { _id : req.params.id }, project, {  });
        res.status(200).json(result);
        res.sendFile(path.resolve(doc.path));
    }
    catch (err) {
        res.status(400).end();
    }
});

Router.post('/updateCompanyPolicies/:id', fileType, async function(req, res) {
    const formData = {
        policyName: req.body.policyName,
        policyDiscription: req.body.policyDiscription,
        policyCatagory: req.body.policyCatagory,
        effectiveDate: req.body.effectiveDate,
        expirationDate: req.body.expirationDate,
        policyDocument: req.file.filename,
        policyOwner: req.body.policyOwner,
        policyApprover: req.body.policyApprover,
        versionNumber: req.body.versionNumber,
        comments: req.body.comments,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : 0
    }

    const data = await db.companyPolicies.findOne({ policyName : formData.policyName })
    if(data && data.policyName != formData.policyName) {
        res.statusMessage('Policy Name is Already Exist').status(300);
    }
    
    try {
        const result = await DB.FindUpdateDocument('companyPolicies', { _id: req.params.id }, formData);
        if (result) {
            res.statusMessage = "Document updated successfully";
            return res.status(200).json(result);
        } else {
            res.status(400).end();
        }
    } catch (error) {
        res.status(500).end();
    }
})

Router.get('/softDeleteCompanyPolicies/:id', async function(req, res) {
    try {
        const result = await DB.GetOneDocument('companyPolicies', { _id: req.params.id }, {}, {});
        if (result) {
            const result1 = await DB.FindUpdateDocument('companyPolicies', { _id: req.params.id }, { isDeleted: result.isDeleted ? !result.isDeleted : 1 });
            if (result1) {
                res.statusMessage = "Company Policies deleted successfully";
                return res.status(200).json(result);
            } else {
                res.status(400).end();
            }
        } else {
            res.status(400).end();
        }
    } catch (error) {
        throw error;
    }
})

Router.post('/generateCompanyPoliciesListFile', async (req, res) => {
    try {
      const { tableHtml, styles } = req.body;
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(`<html>${styles}</style><body><h1>Company Policies's List</h1>${tableHtml}</body></html>`);
      const pdf = await page.pdf({ format: 'A4' });
  
      await browser.close();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdf);
    } catch (error) {
      res.status(500).send('Error generating PDF');
    }
  });  

module.exports = Router;