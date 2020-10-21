const db = require("../models");
const Policy = db.policies;

// Create and save a Policy
exports.create = (req, res) => {
    // validate request
    if(!req.body.name) {
        res.status(400).send({ message: "Policy name must be entered" });
        return;
    }

    // create Policy
    const policy = new Policy({
        name: req.body.name,
        holder_first_name: req.body.holder_first_name,
        holder_last_name: req.body.holder_last_name,
        holder_account_id: req.body.holder_account_id,
        is_active: req.body.is_active ? req.body.is_active : false,
        has_active_claim: req.body.has_active_claim ? req.body.has_active_claim : false,
        effective_date: req.body.effective_date,
        termination_date: req.body.termination_date
    });

    // save Policy to dB
    policy
        .save(policy)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creating Policy"
            });
        });
};