module.exports = app => {
    const claims = require("../controllers/claim.controller");

    var router = require("express").Router();

    // create new Claim
    router.post("/", claims.create);

    // get all Claims
    router.get("/", claims.findAll);

    // get all active Claims
    router.get("/active", claims.findAllActive);

    // get Claim by id
    router.get("/:id", claims.findOne);

    // update Claim by id
    router.put("/:id", claims.update);

    // delete Claim by id
    router.delete("/:id", claims.delete);

    // delete all Claims
    router.delete("/", claims.deleteAll);

    app.use('/api/claims', router);
};