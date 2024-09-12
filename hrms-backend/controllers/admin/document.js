const express = require('express');
const Router = express.Router();
const DB = require('../../models/db');
const db = require('../../models/schemaconnection');
const HELPERFUNC = require('../../models/commonfunctions');
const puppeteer = require("puppeteer")
const multer = require('multer');
const project = {
    createdAt: 0,
    updatedAt: 0,
};

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
Router.post('/addDocument', upload.single("file"), async function (req, res) {
        const formData = {
        employee: req.body.employee,
        documentTittle: req.body.documentTittle,
        documentFile: req.file.filename,
        status: req.body.status ? req.body.status : 1,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : 0
    };


    try {
        const result = await db.document.findOne({ documentTittle: formData.documentTittle });
        if (result) {
            res.statusMessage = "Document name already exists";
            return res.status(409).end();
        }

        DB.InsertDocument('document', formData, function (err, result) {
            if (err) {
                res.status(400).end();
            } else {
                res.statusMessage = "Document created successfully";
                console.log("Document created successfully");
                return res.status(201).json(result);
            }
        });
    } catch (error) {
        console.error('Error while creating document:', error);
        res.status(500).end();
    }
});

Router.get('/listdocument', function (req, res) {
    let query = {};
    query = { isDeleted: false };
    DB.GetDocument('document', query, project, { sort: { createdAt: -1 } }, function (err, result) {
        if (err) {
            res.status(400).end();
        } else {
            return res.status(201).json(result);
        }
    });
});

Router.post('/viewDocument/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('document', { _id: req.params.id }, project, {});
        res.status(201).json(result);
        res.sendFile(path.resolve(doc.path));
    } catch (error) {
        res.status(400).end();
    }
});

Router.post('/updateDocument/:id', upload.single("file"), async function (req, res) {
    console.log(req.file)
    const formData = {
        employee: req.body.employee,
        documentTittle: req.body.documentTittle,
        documentFile: req.file.filename,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : 0
    };

    try {
        const result = await DB.FindUpdateDocument('document', { _id: req.params.id }, formData);
        if (result) {
            res.statusMessage = "Document updated successfully";
            return res.status(200).json(result);
        } else {
            res.status(400).end();
        }
    } catch (error) {
        res.status(500).end();
    }
});

Router.get('/softDeleteDocument/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('document', { _id: req.params.id }, {}, {});
        if (result) {
            const updatedResult = await DB.FindUpdateDocument('document', { _id: req.params.id }, { isDeleted: result.isDeleted ? !result.isDeleted : 1 });
            if (updatedResult) {
                res.statusMessage = "document deleted successfully";
                return res.status(200).json(result);
            } else {
                res.statusMessage = "issue while deleting document";
                res.status(400).end();
            }
        } else {
            res.statusMessage = "issue while finding document";
            res.status(400).end();
        }
    } catch (error) {
        res.statusMessage = "issue with the  deletion  request";
        res.status(500).end();
    }
});

Router.post('/generateDocumentListFile', async (req, res) => {
    try {
      const { tableHtml, styles } = req.body;
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(`<html>${styles}</style><body><h1>Document's List</h1>${tableHtml}</body></html>`);
      const pdf = await page.pdf({ format: 'A4' });
  
      await browser.close();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdf);
    } catch (error) {
      res.status(500).send('Error generating PDF');
    }
  });                                                                                           

module.exports = Router;
