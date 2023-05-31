const express = require('express');
const app = express();
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const datagather = require('./datagather')
const {setIntervalAsync,clearIntervalAsync} = require('set-interval-async/fixed')
var serverstatus="Deployed but not updated" ;

mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useCreateIndex : true ,
    useFindAndModify : false ,
}).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});

app.get('/', function(req, res) {
    res.send(`<h2>${serverstatus}</h2>`)
});

app.listen(process.env.PORT||3000,()=>{
    console.log("Serving at Port 3000")
});

const updatestart = async () =>{
    var update0 = setIntervalAsync(async ()=> {
    const marketStatus = await datagather.updatedb();
    console.log('updated DB');
    console.log(marketStatus)
    serverstatus='MARKET ON & UPDATING DATA at 60sec interval';
    if(marketStatus.toUpperCase()=="CLOSED"){
        serverstatus=`MARKET has been closed at ${new Date()}`;
        clearIntervalAsync(update0);
        }
    },60*1000);
}


let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,1,2,3,4]
rule.hour = [10,11,12];
rule.minute = [1,33,35,50];
rule.tz = 'Asia/Dhaka';
const job2 = schedule.scheduleJob( rule , async function(triggerDate){
    console.log(`Today is ${triggerDate}`);
    var times = 0
    var checkopen =  setIntervalAsync(async () =>{
        const dsex = await datagather.dsex();
        console.log(dsex)
        if(!(dsex['marketStatus'].toUpperCase()=='CLOSED')){
            console.log("Started the Stock market")
            console.log(`Today is ${triggerDate}`);
            updatestart();
            clearIntervalAsync(checkopen);
        } else { times=times+1 }
        if(times==10){
            console.log(`Market is closed today : ${triggerDate}`)
            clearIntervalAsync(checkopen)
        }
    },4000)
    console.log("Started the Stock market")
});

let rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [0,1,2,3,4]
rule2.hour = [14,16,18,20,21];
rule2.minute = [7];
rule2.tz = 'Asia/Dhaka';
const jobFinalUpdate = schedule.scheduleJob( rule2 , async function(triggerDate){
    await datagather.finalupdate();
    serverstatus = `Final updated the database with chartdata & price :  ${triggerDate}`
    console.log(`Final Update of Chartdata and All stocks done at : ${triggerDate}`)
});


