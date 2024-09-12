const express = require('express');
const multer = require('multer');
const Router = express.Router();
const DB = require('../../models/db');
const db = require('../../models/schemaconnection')
const HELPERFUNC = require('../../models/commonfunctions');
const nodemailer = require("nodemailer");
const upload = multer()
const project = {
    createdAt: 0,
    updatedAt: 0,
}
Router.post('/addEmployee', upload.none(), async function (req, res) {
    console.log(req.body)
    const formData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        nationality: req.body.nationality,
        gender: req.body.gender,
        maritial: req.body.maritial,
        address: req.body.address,
        phone: req.body.phone,
        emailid: req.body.emailid,
        emergencyphone: req.body.emergencyphone,
        status: req.body.status ? req.body.status : 1,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : 0
    }

    const result = await db.employee.findOne({ firstname: formData.firstname });
    if (result) {
        res.statusMessage = "employee already exist";
        return res.status(409).end();
    }
    DB.InsertDocument('employee', formData, function (err, result) {
        if (err) {
            res.status(400).end();
        } else {
            console.log(formData.emailid)
            const transporter = nodemailer.createTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // Use `true` for port 465, `false` for all other ports
              auth: {
                user: "senthil.c257@gmail.com",
                pass: "rmad cxqc ewzi ubbg ",
              },
            });
            const mailContent = {
                from: {
                    name : "TonysHive",
                    address : "senthil.c257@gmail.com" 
                },
                to: formData.emailid, // list of receivers
                subject: "Employee Added Succussfully ✔", // Subject line
                text: `${formData.firstname}`, // plain text body
                html: `<b>Welcome ${formData.firstname}</b><br/><b>Your Details Added in HRMS Employee Management List</b> </br> <p>By, Company</p>`, // html body
            }
            const main = async (transporter, mailContent, result) => {
                try {
                    const info = await transporter.sendMail(mailContent);
                    console.log("Message sent: %s", info.messageId);
                    res.statusMessage = "employee created successfully";
                    return res.status(201).json(result);
                }
                catch (err) {

                }
              // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
            }
            
            main(transporter, mailContent, result);
            
        }
    })
});
Router.get('/listEmployee', function (req, res) {
    let query = {};
    query = { isDeleted: false }
    console.log('check');
    DB.GetDocument('employee', query, project, { sort: { createdAt: -1 } }, function (err, result) {
        if (err) {
        console.log('data err');
        res.status(400).end();
        } else {
        console.log('data success');
        return res.status(201).json(result);
        }
    })
});
Router.post('/viewEmployee/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('employee', { _id: req.params.id }, project, {});
        res.status(201).json(result);
    } catch (error) {
        res.status(400).end();
    }
});
Router.post('/updateEmployee/:id', async function (req, res) {
    const formData = {
        question: HELPERFUNC.Capitalize(req.body.question),
        answare: HELPERFUNC.Capitalize(req.body.answare),
        status: req.body.status,
        isDeleted: req.body.isDeleted
    }

    const result = await db.employee.findOne({ question: formData.question });
    if (result) {
        res.statusMessage = "employee already exist";
        return res.status(409).end();
    }
    const result1 = await DB.FindUpdateDocument('employee', { _id: req.params.id }, formData);

    if (result1) {
        res.statusMessage = "employee updated successfully";
        return res.status(200).json(result);
    } else {
        res.status(400).end();
    }
});

Router.get('/softDeleteEmployee/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('employee', { _id: req.params.id }, {}, {});
        // console.log(result)
        if (result) {
            const result1 = await DB.FindUpdateDocument('employee', { _id: req.params.id }, { isDeleted: result.isDeleted ? !result.isDeleted : 1 });
            console.log(result1)
            if (result1) {
                res.statusMessage = "employee deleted successfully";
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
});


module.exports = Router;
