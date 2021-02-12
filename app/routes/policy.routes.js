module.exports = app => {
    const policies = require("../controllers/policy.controller");

    var router = require("express").Router();

    // create new Policy
    router.post("/", policies.create);

    // get all Policies
    router.get("/", policies.findAllPolicies);

    // get all active Policies
    router.get("/active", policies.findAllActive);

    // get Policy by id
    router.get("/:id", policies.findOne);

    // update Policy by id
    router.put("/:id", policies.update);

    // delete Policy by id
    router.delete("/:id", policies.delete);

    // delete all Policies
    router.delete("/", policies.deleteAll);

    app.use("/api/policies", router);
};