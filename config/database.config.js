const mongoose = require("mongoose");

module.exports = {
    connectDB: async () => {
        try {
            const URL = process.env.MONGO_DB_URL || "mongodb+srv://root:root@cluster0.pgjx7.mongodb.net";
            let connection = await mongoose.connect(URL, {
                dbName: process.env.DBNAME || "rbac",
            });
            if(connection.connections[0].host) {
                console.log(`Database connected on : ${connection.connections[0].host} ${connection.connections[0].port} ${connection.connections[0].name}`);
            }else {
                console.log('Error while connecting to Database');
            }
        } catch (error) {
            console.log('Error : ', error);
        }
    }
}