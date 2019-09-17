// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads Homepage
    app.get("/", function (req, res) {
        res.sendFile(path.join("../public/index.html"));
    });

    // Route to the cms page
    app.get("/cms", function (req, res) {
        res.sendFile(path.join("../public/cms.html"));
    });

    // blog route loads blog.html
    app.get("/profile", function (req, res) {
        res.sendFile(path.join("../public/profile.html"));
    });

};