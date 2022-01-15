const mongoose = require('mongoose');

const stockschema = new mongoose.Schema({
    _id: Number ,
    name : String , 
    ltp : String ,
    high : String , 
    low : String , 
    closep: String ,
    ycp : String ,
    change : String ,
    changeP : String,
    trade : String ,
    value : String ,
    volume : String,
    last60 : Array ,
    
    },
    { 
        versionKey : false
    })

module.exports.stockmodel = mongoose.model('stockdata',stockschema)


const stockschema2 = new mongoose.Schema(
    {
    marketStatus : String,
    dsex :   Number, 
    dsexChange :   Number,
    dsexChangeP :Number,
    ds30 : Number,
    ds30Change :    Number,
    ds30ChangeP : Number,
    totaltrade : Number,
    totalvolume :  Number,
    totalvalue : Number,
    issueAdvance :Number,
    issueDecline :Number,
    issueUnchange : Number,
    },
    { 
        versionKey : false
    })

module.exports.dsexmodel = mongoose.model('dsexdata',stockschema2)

const AnalysisSchema = new mongoose.Schema(
    {
    _id : String,
    ROE : Number,
    EarnGrowth : Number ,
    PE: Number ,
    Sector : String 
    },
    { 
        versionKey : false
    })

module.exports.analysis1 = mongoose.model('analysisdata',AnalysisSchema)


