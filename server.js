const express = require('express');
const bodyParser = require('body-parser')
const mailToUser = require('./modules/mailToUser')
const pdf = require('./modules/downloadPdf')
const autoCapitalize = require('./modules/autoCapitalize');
const { name } = require('ejs');
const app = express();
var firstName; 
var lastName; 
var email; 
var contactNo; 
let token = 0; 
const userDetails = []

app.use( express.static( "public" ));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) =>{
    userDetails.length = 0;
    res.render(__dirname + "/index.ejs");
});

app.post('/', (req, res) => {
    userDetails.length = 0;
    token += 1;
    firstName = autoCapitalize(req.body.firstName.trim());
    lastName = autoCapitalize(req.body.lastName.trim());
    email = req.body.email.trim();
    contactNo = req.body.contactNo;
    age = req.body.age;
    gender = req.body.gender;
    universityName1 = autoCapitalize(req.body.universityName1.trim());
    degreeName1 = req.body.degreeName1.trim();
    collegeName1 = req.body.collegeName1;
    cgpa1 = req.body.cgpa1;
    universityName2 = autoCapitalize(req.body.universityName2.trim());
    degreeName2 = req.body.degreeName2.trim();
    collegeName2 = req.body.collegeName2;
    cgpa2 = req.body.cgpa2;
    schoolNameTenth  = req.body.schoolNameTenth;
    schoolNameTwelfth = req.body.schoolNameTwelfth;
    boardTenth = req.body.boardTenth.toUpperCase();
    boardTwelfth = req.body.boardTwelfth.toUpperCase();
    marksInTenth = req.body.marksInTenth;
    marksInTwelfth = req.body.marksInTwelfth;
    companyName1 = autoCapitalize(req.body.companyName1);
    companyName2 = req.body.companyName2;
    companyName3 = req.body.companyName3;
    post1 = autoCapitalize(req.body.post1);
    post2 = req.body.post2;
    post3 = req.body.post3;
    jobDesc1 = req.body.jobDesc1;
    jobDesc2 = req.body.jobDesc2;
    jobDesc3 = req.body.jobDesc3;
    yearsWorked1 = req.body.yearsWorked1;
    yearsWorked2 = req.body.yearsWorked2;
    yearsWorked3 = req.body.yearsWorked3;
    aboutYou = req.body.aboutYou;
    skills = autoCapitalize(req.body.skills)

    // Validation




    userDetails.push(firstName, lastName, email, contactNo, age, gender, schoolNameTenth, boardTenth, marksInTenth, schoolNameTwelfth, boardTwelfth, marksInTwelfth, universityName1, degreeName1, collegeName1, cgpa1, universityName2, degreeName2, collegeName2, cgpa2, companyName1, post1, jobDesc1, yearsWorked1,companyName2, post2, jobDesc2, yearsWorked2,companyName3, post3, jobDesc3, yearsWorked3, skills);
    console.log(userDetails);
    flag = true;
    for(var i=0; i<userDetails.length; i++){
        if(userDetails[i] == ''){
            flag = false
        }
    }
    if(!flag){
        res.render(__dirname + "/submit.ejs", {confirmation: "Oops! looks like you left some details unfilled :(", action:"/", actiontxt: "Go Back"});
    }
    else{
        res.render(__dirname + "/submit.ejs", {confirmation: "Awesome, your file is ready to be downloaded.", action:"/resume", actiontxt: "Download"});
    }

});


app.get('/resume', (req, res)=>{
    // console.log(userDetails);
    if(userDetails.length < 1){
        res.sendStatus(401)
    }
    else{
        res.render(__dirname + '/resume.ejs', {name: firstName+" "+lastName, email: email, contactNo: contactNo, aboutYou: aboutYou, schoolNameTenth: schoolNameTenth, boardTenth: boardTenth, marksInTenth: marksInTenth, schoolNameTwelfth: schoolNameTwelfth, marksInTwelfth: marksInTwelfth, universityName1: universityName1, degreeName1: degreeName1, cgpa1: cgpa1, collegeName1: collegeName1,  universityName2: universityName2, degreeName2: degreeName2, cgpa2: cgpa2, collegeName2: collegeName2, job1: companyName1, post1: post1, yearsWorked1: yearsWorked1 , jobDescription2: jobDesc2,  job2: companyName2, post2: post2, yearsWorked2: yearsWorked2 , jobDescription3: jobDesc3,   job3: companyName3, post3: post3, yearsWorked3: yearsWorked3 , jobDescription3: jobDesc3, skills:skills});
    }
})

app.get('/downloadPdf', (req, res)=>{
    if(userDetails.length < 1){
        res.sendStatus(401)
    }else{
        pdf.downloadPDF('http://localhost:3000/resume', './resumePdfs/')
    }
})

// app.get('/emailPdf', (req, res)=>{
//     if(userDetails.length < 1){
//         res.sendStatus(401)
//     }else{
//         mailToUser();
//     }
// })


// Sending resume via email to user




const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("listening on port" + PORT);
});

module.exports = {email , firstName}