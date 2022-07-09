const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
var firstName; 
var lastName; 
var email; 
var contactNo; 


let token = 0; 
const userDetails = []
const options = {
    "height": "10.5in",        
    "width": "8in", 
}

app.use( express.static( "public" ));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) =>{
    userDetails.length = 0;
    res.render(__dirname + "/index.ejs");
});

app.post('/', (req, res) => {
    userDetails.length = 0;
    token += 1;
    firstName = req.body.firstName.toLowerCase().trim();
    lastName = req.body.lastName.trim();
    email = req.body.email.trim();
    contactNo = req.body.contactNo;
    age = req.body.age;
    gender = req.body.gender;
    universityName = req.body.universityName.trim();
    degreeName = req.body.degreeName.trim();
    dateOfEndSem = req.body.dateOfEndSem;
    cgpa = req.body.cgpa;
    schoolNameTenth  = req.body.schoolNameTenth;
    schoolNameTwelfth = req.body.schoolNameTwelfth;
    boardTenth = req.body.boardTenth;
    boardTwelfth = req.body.boardTwelfth;
    marksInTenth = req.body.marksInTenth;
    marksInTwelfth = req.body.marksInTwelfth;
    companyName1 = req.body.companyName1;
    companyName2 = req.body.companyName2;
    companyName3 = req.body.companyName3;
    post1 = req.body.post1;
    post2 = req.body.post2;
    post3 = req.body.post3;
    jobDesc1 = req.body.jobDesc1;
    jobDesc2 = req.body.jobDesc2;
    jobDesc3 = req.body.jobDesc3;
    aboutYou = req.body.aboutYou;
    yearsWorked1 = req.body.yearsWorked1;
    yearsWorked2 = req.body.yearsWorked2;
    yearsWorked3 = req.body.yearsWorked3;
    name1 = req.body.name1;
    name2 = req.body.name2;
    contact1 = req.body.contact1;
    contact2 = req.body.contact2;
    relation1 = req.body.relation1;
    relation2 = req.body.relation2;




    userDetails.push(firstName, lastName, email, contactNo, age, gender, schoolNameTenth, boardTenth, marksInTenth, schoolNameTwelfth, boardTwelfth, marksInTwelfth, universityName, degreeName, dateOfEndSem, cgpa, companyName1, post1, jobDesc1, companyName2, post2, jobDesc2, companyName2, post2, jobDesc2, companyName3, post3, jobDesc3, name1, contact1, relation1, name2, contact2, relation2);
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
    res.render(__dirname + '/resume.ejs', {name: firstName+" "+lastName, email: email, contactNo: contactNo, aboutYou: aboutYou, schoolNameTenth: schoolNameTenth, boardTenth: boardTenth, marksInTenth: marksInTenth, schoolNameTwelfth: schoolNameTwelfth, marksInTwelfth: marksInTwelfth, universityName: universityName, degreeName: degreeName, cgpa: cgpa, dateOfEndSem: dateOfEndSem, job1: companyName1, post1: post1, yearsWorked1: yearsWorked1 , jobDescription1: jobDesc1 ,job2: companyName2, post2: post2, yearsWorked2: yearsWorked2, jobDescription2: jobDesc2, job3: companyName3, post3: post3, yearsWorked3: yearsWorked3, jobDescription3: jobDesc3, name1: name1, contact1: contact1, relation1: relation1, name2: name2, contact2: contact2, relation2: relation2});

})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("listening on port" + PORT);
});