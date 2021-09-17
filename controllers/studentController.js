const express = require('express')
let router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model('Student')
const Joi = require('joi')

//get all
router.get('/', (req, res) => {
    // res.status(200).json()
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    });
});

router.post('/', (req, res) => {
    req.body._id =='' ? insertRecord(req, res) : updateRecord(req, res)
});

let insertRecord = (req, res) => {
    let student = new Student();
    const { fullName, email, mobile, city } = req.body;
    student.fullName = fullName;
    student.email = email;
    student.mobile = mobile;
    student.city = city;
    student.save((err, doc) => {
        !err ? res.redirect('student/list') : console.log('Error during insertion: '+ err)
    });
}

let updateRecord = (req, res) => {
    Student.findOneAndUpdate(
        { _id: req.body._id }, 
        req.body, 
        { new: true }, 
        (err, doc) => {
            !err ? res.redirect('student/list') : console.log('Error during Update: ' + err)
        }
    );
}

//Getting student list
router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        !err ? res.render('student/list', {list: docs }) : console.log('Error in retrieval: ' + err)
    });
});


//Getting One
router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('student/addOrEdit', {
                viewTitle: "Update Student",
                student: doc,
            });
            console.log(doc)
        }
    });
});

//delete list record
router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        !err ? res.render('student/list') : console.log("Error in deletion" + err)
    });
});

//creating a helper Methond
const validateField = (input) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(input, schema);
}

// //Usage
// app.post('/api/v1/xxxx', (req, res) => {
//     //Some code here
//     ////*******************/////
//     const { error } = validateField(req.body);
//     if(error){
//         res.status(400).send(error.datails[0].message);
//     }
// });

module.exports = router;