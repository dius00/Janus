/* eslint-disable no-await-in-loop */
/* eslint-disable no-useless-escape */
// https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require('firebase-functions');
const axios = require("axios");
const nodemailer = require("nodemailer");

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// TODO -> convert these back to Cron Job

exports.getHealthNews = functions.https.onRequest(async (request, response) => {
  functions.logger.info("HealthDB server update", {structuredData: true});
  const health = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=health&max=15&lang=en&country=us&token=${functions.config().gnews.key}`);
  const batch = db.batch()
  const batchArr = [];
  for(let i = 0; i < 15; i++){
    let param = health.data.articles[i].title.replace(/[^a-zA-Z0-9]/g, ' ');
    const {data} = await axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=10&pageSize=1&query=${param}&key=${functions.config().factcheck.key}`);
    if (Object.keys(data).length === 0) {health.data.articles[i].factCheck = false;}
    else {health.data.articles[i].factCheck = data;}
    
    param = param.replace(/ /g, '');   
    batchArr[i] = db.collection("health").doc(param)
    batch.set(batchArr[i], health.data.articles[i]);
  }
  await batch.commit();
  response.send(health.data.articles)
});

exports.getWorldNews = functions.https.onRequest(async (request, response) => {
  functions.logger.info("WorldDB server update", {structuredData: true});
  const world = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=world&max=15&lang=en&country=us&token=${functions.config().gnews.key}`);
  const batch = db.batch()
  const batchArr = [];
  for(let i = 0; i < 15; i++){

    let param = world.data.articles[i].title.replace(/[^a-zA-Z0-9]/g, ' ');
    const {data} = await axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=10&pageSize=1&query=${param}&key=${functions.config().factcheck.key}`);
    if (Object.keys(data).length === 0) {world.data.articles[i].factCheck = false;}
    else {world.data.articles[i].factCheck = data;}
    
    param = param.replace(/ /g, '');        
    batchArr[i] = db.collection("world").doc(param)
    batch.set(batchArr[i], world.data.articles[i]);
  }
  await batch.commit();
  response.send(world.data.articles)
});

exports.getElectionNews = functions.https.onRequest(async (request, response) => {
  functions.logger.info("ElectionDB server update", {structuredData: true});
  const usElection = await axios.get(`https://gnews.io/api/v4/search?q=us%20election&max=15&lang=en&country=us&token=${functions.config().gnews.key}`);
  const batch = db.batch()
  const batchArr = [];
  for(let i = 0; i < 15; i++){

    let param = usElection.data.articles[i].title.replace(/[^a-zA-Z0-9]/g, ' ');
    const {data} = await axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=10&pageSize=1&query=${param}&key=${functions.config().factcheck.key}`);
    if (Object.keys(data).length === 0) {usElection.data.articles[i].factCheck = false;}
    else {usElection.data.articles[i].factCheck = data;}
    param = param.replace(/ /g, '');    
    
    batchArr[i] = db.collection("elections").doc(param)
    batch.set(batchArr[i], usElection.data.articles[i]);
  }
  await batch.commit();
  response.send(usElection.data.articles)
});

exports.getBusinessNews = functions.https.onRequest(async (request, response) => {
  functions.logger.info("BusinessDB server update", {structuredData: true});
  const business = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=business&max=15&lang=en&country=us&token=${functions.config().gnews.key}`);
  const batch = db.batch()
  const batchArr = [];
  for(let i = 0; i < 15; i++){

    let param = business.data.articles[i].title.replace(/[^a-zA-Z0-9]/g, ' ');
    const {data} = await axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=10&pageSize=1&query=${param}&key=${functions.config().factcheck.key}`);
    if (Object.keys(data).length === 0) {business.data.articles[i].factCheck = false;}
    else {business.data.articles[i].factCheck = data;}
    param = param.replace(/ /g, '');
    
    batchArr[i] = db.collection("business").doc(param);
    batch.set(batchArr[i], business.data.articles[i]);
  }
  await batch.commit();
  response.send(business.data.articles)
  
});

exports.getTechNews = functions.https.onRequest(async (request, response) => {
  functions.logger.info("TechDB server update", {structuredData: true});
  const tech = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=technology&max=15&lang=en&country=us&token=${functions.config().gnews.key}`);
  const batch = db.batch()
  const batchArr = [];
  for(let i = 0; i < 15; i++){

    let param = tech.data.articles[i].title.replace(/[^a-zA-Z0-9]/g, ' ');
    const {data} = await axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=10&pageSize=1&query=${param}&key=${functions.config().factcheck.key}`);
    if (Object.keys(data).length === 0) {tech.data.articles[i].factCheck = false;}
    else {tech.data.articles[i].factCheck = data;}
    param = param.replace(/ /g, '');

    batchArr[i] = db.collection("tech").doc(param)
    batch.set(batchArr[i], tech.data.articles[i]);
  }
  await batch.commit();
  response.send(tech.data.articles)
  
});


exports.getScienceNews = functions.https.onRequest(async (request, response) => {
  functions.logger.info("ScienceDB server update", {structuredData: true});
  const science = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=science&max=15&lang=en&country=us&token=${functions.config().gnews.key}`);
  const batch = db.batch()
  const batchArr = [];
  for(let i = 0; i < 15; i++){

    let param = science.data.articles[i].title.replace(/[^a-zA-Z0-9]/g, ' ');
    const {data} = await axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=10&pageSize=1&query=${param}&key=${functions.config().factcheck.key}`);
    if (Object.keys(data).length === 0) {science.data.articles[i].factCheck = false;}
    else {science.data.articles[i].factCheck = data;}
    param = param.replace(/ /g, '');

    batchArr[i] = db.collection("science").doc(param)
    batch.set(batchArr[i], science.data.articles[i]);
  }
  await batch.commit();
  response.send(science.data.articles)
});






// TODO -> Configure email service

exports.sendEmail = functions.https.onRequest(async (request, response) => {
const email = [];
let link = null;
await (await admin.auth().listUsers()).users.forEach((user) => email.push(user.email));


async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  response.send("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
response.send("sent");
});
