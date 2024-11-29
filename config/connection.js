const mongoose = require('mongoose');
var config = require("./config.json");

// Set global Promise for mongoose
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

// Functions Class For Body Component
class Connection {

    constructor() {
        // Initialize the connection flag
        this.connectionEstablished = false;
    }

    async Database(req, res, next) {
        // Check if the connection has already been established
        if (!this.connectionEstablished) {
            try {


                // Host URL get in Site
                const host = req.hostname;
                const isDevelopmentHost = config.SECRET.hosts.includes(host);


                // Choose the correct dbURI based on the host
                const dbURI = isDevelopmentHost ?
                    config.Database.DevelopmentUrl :
                    config.Database.ProductionURI;

                // const dbURI = config.Database.ProductionURI;

                // Connect to the database
                await mongoose.connect(dbURI);

                // Set the flag to true after successful connection
                this.connectionEstablished = true;
                console.log("Database connected successfully.");


            } catch (error) {
                console.error("Database connection error:", error);
                return res.status(500).send("Database connection error");
            }
        }

        next();
    }
}

// Export Functions
module.exports = Connection;