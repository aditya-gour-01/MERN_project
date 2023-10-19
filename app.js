//use dancewebsite
//use contactDance
//db.contacts.find()


const express=require("express")
const path=require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email:String,
    address: String,
    desc: String,
  });

const contact= mongoose.model('Contact', contactSchema);





//express specific stuff
//for serving static files.../static url hai aur 'static' folder hai

app.use('/static',express.static('static'));
app.use(express.urlencoded())


//pug specific stuff
//set the template engine for pug template engine
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//endpoint
app.get('/',(req,res)=>{
    
    const params = {};
    res.status(200).render('index.pug',params)
})

app.get("/contact",(req,res)=>{
    
    const params = {};
    res.status(200).render('contact.pug',params)
})

app.post("/contact",(req,res)=>{
    
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item not saved to database")
    })

    //res.status(200).render('contact.pug') isliye kyu ki ek baar send kar chuke hai status
    return res.status(400).json
})

//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
})