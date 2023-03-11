const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}