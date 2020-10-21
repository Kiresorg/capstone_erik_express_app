module.exports = app => {
    const policies = require("../controllers/policy.controller");

    var router = require("express").Router();

    // create new Policy
    router.post("/", policies.create);


    app.use('/api/policies', router);
};