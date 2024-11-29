// Express Rout module import 
var express = require('express');
var router = express.Router();


// File and Functions import
const { getogdataFromJson, getogdataFromDatabase } = require('../helper/OgData.js');

// File canvert in object










// Home Pages 
router.get(["/"], async (req, res) => {
    try {
        // Param Get Pages Meta Data
        //var ogdata = await getogdataFromDatabase("CredManager");

        // Render form view
        return res.status(200).render("../views/main/index.ejs", {
            tagdata: "Home"
        });

    } catch (error) {
        // Redirect to another error page 
        req.flash('Request AuthenticatedsRoutes For login', error);
        return res.status(500).redirect("/error_404");
    }
});






// Export the Rout Functions
module.exports = router;