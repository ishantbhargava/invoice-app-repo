
const mongoose = require("mongoose");

 const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database ${conn.connection.host}`)
    }catch(err){ 
        console.log("err in db",(err))
    }
};  

module.exports = connectDB;