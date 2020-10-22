module.exports = app => {
    const claims = require("../controllers/claim.controller");

    var router = require("express").Router();

    // create new Policy
    router.post("/", claims.create);


    app.use('/api/claims', router);
};