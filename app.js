const express = require('express');
const app = express();
const port = 8800;
const path = require('path');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config({ path: 'config.env' });
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const Users = require('./models/userSchema');
const authenticate = require('./middleware/authenticate');

// Importing connection to the database;
require('./connections/connect');
var pricings = {
    menSalon: {VivoY100: 24999, VivoX90Pro: 57190,VivoX90: 42390,VivoV27Pro: 37999,VivoY21G: 13499,VivoU20: 11999,iPhone14ProMax: 149900,iPhone13: 61999,SamsungGalaxy_S23_5G: 79999,Samsung_Galaxy_A23_5G: 22999,Samsung_Galaxy_S20_FE_5G: 37999,beardshapingandstylingonly: 149,haircutandbeardandfaceandneckdetanandmassage: 999,faceandneckdetan: 349,skingbrighteningfacialandinstantoilreduction: 1499,instanttanreduction: 129,refreshingfacemassage: 129,antipollutantcleanup: 649,oilreductioncleanup: 649,skinbrighteningfacial: 1349,hairstraighteningandheadmassage: 129,kidsheadmassage: 129,},
    womenSalon: {},
};
var pricemodel = [
    ["VivoY100", 24999],["VivoX90Pro", 57190],["VivoX90", 42390],
    ["VivoV27Pro",37999],["VivoY21G", 13499],["VivoU20", 11999],["iPhone14ProMax", 149900],["iPhone13",61999], ["SamsungGalaxy_S23_5G", 79999],["Samsung_Galaxy_A23_5G",22999], ["Samsung_Galaxy_S20_FE_5G",37999],["beardshapingandstylingonly", 149],
    ["haircutandbeardandfaceandneckdetanandmassage", 999],["faceandneckdetan", 349],
    ["skingbrighteningfacialandinstantoilreduction", 1499], ["instanttanreduction", 129],
    ["refreshingfacemassage", 129],["antipollutantcleanup", 649],["oilreductioncleanup", 649],
    ["skinbrighteningfacial", 1349],["hairstraighteningandheadmassage", 129],["kidsheadmassage", 129]
];
// console.log(pricemodel);
app.get('/', async (req, res) => {
    return res.redirect('migMwIzOgGRN6fD40RhzazAYtpRu1GhrmT2');
});

app.get('/cRNEnyzuZWPJVpPKsT1IrV1uwYRfmBWl5mc', async function(req, res){
    return res.status(200).render('carwashing');
});

app.get('/SJhsjdh7e3r46ishdJHDjdh3493', async function(req, res){
    return res.status(200).render('singupEmployee');
});
app.get('/migMwIzOgGRN6fD40RhzazAYtpRu1GhrmT2', authenticate ,async function(req, res){
    // console.log("You're now only Men's Salon page!");
    await Users.findOneAndUpdate({pricemodel: pricemodel});
    const userCredentials = req.rootUser.serviceArray;
    const lengthofarray = userCredentials.length;
    // console.log(getlistofprices);
    return res.status(200).render('mensalonPage', {menSalon: pricings.menSalon, lengthofarray: lengthofarray, userCredentials: userCredentials, listofitems: req.rootUser.serviceArray});
});
app.get('/dg3TlbLXB4GNtYc1akFq4lxaGfMXlw195Bs/', async function(req, res){
    const querysd = req.query;
    console.log(querysd);
    return res.status(200).redirect('/migMwIzOgGRN6fD40RhzazAYtpRu1GhrmT2');
});
var isLoggedIn = false;
let checkoutamt = 0;
app.post('/registerClient', async function(req, res){
    const {firstnameclient, lastnameclient, passwordclient, confirmpasswordclient, emailclient, contactnumberclient, parmanentaddressclient, temporaryaddressclient, ageclient, dobclient, aadharcardclient, clientcompanyID} = req.body;
    try{
        const regemployeeComapnyID = await Users.findOne({clientcompanyID: clientcompanyID});
        const regemployeeEmail = await Users.findOne({emailclient: emailclient});
        const regaadharcardNumber = await Users.findOne({aadharcardclient: aadharcardclient});
        const regphoneNumber = await Users.findOne({contactnumberclient: contactnumberclient});
        if(regemployeeComapnyID){
            return res.status(422).send(`Cannot register because ${clientcompanyID} is already registered, refresh the page and fill the form again!`);
        }
        if(regemployeeEmail){
            return res.status(422).send(`${emailclient} is already registered, try another email!`)
        } if (regaadharcardNumber){
            return res.status(422).send(`${aadharcardclient} is already registered, try contacting the support team!`);
        } if (regphoneNumber) {
            return res.status(422).send(`${contactnumberclient} is already register, register with another phone number.`);
        }
        else{
            const user = new Users({firstnameclient, lastnameclient, passwordclient, confirmpasswordclient, emailclient, contactnumberclient, parmanentaddressclient, temporaryaddressclient, ageclient, dobclient, aadharcardclient, clientcompanyID, isLoggedIn, pricemodel, checkoutamt});
            await user.save();
            // Make confirm button, and handover an unique dashboard to the user. Later in the code, with proper understandable comments.
            return res.status(200).redirect('/jfs845ahdsklLKJSHD364qjashdDZBNMbuywe9837498ljHNZDB');
        }
    }catch(error){
        console.log(error);
    }
});
app.get('/jfs845ahdsklLKJSHD364qjashdDZBNMbuywe9837498ljHNZDB', async function(req, res){
    return res.status(200).render('login');
});
app.post('/Sk3497weidjhasjkldhKJZHGDkgSHKD7we3iqte4687HJGDKS', async function(req, res){
    const {userEmail, userPassword} = req.body;
    try {
        const userLogin = await Users.findOne({ emailclient: userEmail });
        if (!userLogin) {
            console.log("User does not exists in the database!");
            return res.send("Wrong data has been filled in the fields! Please check it.");
        }
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        if (userLogin) {
            const passwordMatch = await bcrypt.compare(userPassword, (userLogin.passwordclient));
            if (passwordMatch) {
                console.log('Logged in successfully!');
                return res.render("successlogin", {emailattach: userEmail});
            } else {
                console.log("Error in loggin in!");
                return res.send("Wrong data has been filled in the fields! Please check it.");
            }
        } else {
            console.log('cant login');
        }
    }catch(error) {
        return res.status(422).send(error);
    }
})
app.get('/home', authenticate, async function(req, res){
    console.log("You're now on authenticated home page!");
    await Users.findOneAndUpdate({firstnameclient: req.rootUser.firstnameclient}, {isLoggedIn: true});
    return res.status(200).redirect('/migMwIzOgGRN6fD40RhzazAYtpRu1GhrmT2');
});
app.listen(port, (errors) => {
    if(errors == true){console.log(errors);}else{
        console.log(`Running on: http://localhost:${port}`);
    };
});

// lIST APPENDERS  
// Adding of HairCut, Beard Grooming, and Massage
app.get('/hJjdQaBtcsroymammaL8/', authenticate, async function(req, res) {
    const considerQueryPassed = req.query.v87sds87d87c;
    let found = false;
    let datarecieved = req.rootUser.serviceArray;
    for(let i = 0; i<datarecieved.length; i++) {
        if(`${considerQueryPassed}` == datarecieved[i]) {
            console.log("Already present in the cart!")
            found = true;
            return res.status(200).redirect('back');
        }
    }
    if(!found) {
        await Users.findOneAndUpdate({clientcompanyID: req.rootUser.clientcompanyID}, {$push: {serviceArray: `${considerQueryPassed}`}});
        return res.status(200).redirect('back');
    }
})

// Removal of HairCut, Beard Grooming, and Massage
app.get('/sa437HSDGw363whgGDS619D/', authenticate, async function(req, res) {
    const harshal = req.query.rem387DShsdg3568eHDG;
    await Users.findOneAndUpdate({clientcompanyID: req.rootUser.clientcompanyID}, {$pull: {serviceArray: `${harshal}`}});
    return res.status(200).redirect('back');
})

app.get('/myCart', authenticate, async function(req, res){
    const clientID = req.rootUser.clientcompanyID;
    const arrayofitemsadded = req.rootUser.serviceArray;
    arrayofitemsadded.forEach(element => {
        console.log(element);      
    });
    const getlistofprices = req.rootUser.pricemodel;
    return res.status(200).render('myCart', {clientID:clientID, arrayofitemsadded: arrayofitemsadded, menSalon: pricings.menSalon, getlistofprices:getlistofprices});
});

app.get('/XhepltpojC5AyJcvtMmWh12Y7wse6uzTAOk/', authenticate, async function(req, res){
    const readlink = req.query.Gs2jHsTC2QRpt3ZedTtDC7mNIzDmuWuYa2w;
    await Users.findOneAndUpdate({clientcompanyID: req.rootUser.clientcompanyID}, {checkoutamt: readlink});
    const appendAmt = req.rootUser.checkoutamt;
    console.log(appendAmt)
    return res.render('checkout', {appendAmt:appendAmt, firstname: req.rootUser.firstnameclient, lastname: req.rootUser.lastnameclient, clientID: req.rootUser.clientcompanyID});
});