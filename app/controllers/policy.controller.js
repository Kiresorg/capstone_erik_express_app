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
        is_active_policy: req.body.is_active_policy ? req.body.is_active_policy : false,
        has_active_claim: req.body.has_active_claim ? req.body.has_active_claim : false,
        effective_date: req.body.effective_date ? req.body.effective_date : "2020-10-20T18:00:00.000Z",
        termination_date: req.body.termination_date ? req.body.termination_date : "2020-10-20T18:00:00.000Z"
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


// get all policies
exports.findAll = (req, res) => {
    const last_name = req.query.holder_last_name;
    var condition = last_name ? { holder_last_name: { $regex: new RegExp(last_name), $options: "i" }} : {}

    Policy.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while retreving Policies"
            });
        });
};


// get Policy by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Policy.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found: Policy with id of " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retreiving Policy with id of " + id });
        });
};

// update Policy by id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Empty data for update"
        });
    }

    const id = req.params.id;

    Policy.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Unable to update Policy with id of ${id}.`
                });
            } else res.send({ message: "Successfully updated Policy." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while trying to update Policy with id of " + id
            });
        });
};

// delete Policy by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Policy.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Unable to delete Policy with id of ${id}.`
                });
            } else {
                res.send({
                    message: "Policy deleted successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to delete Policy with id of " + id
            });
        });
};

// delete all Policies
exports.deleteAll = (req, res) => {
    Policy.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Policies were deleted successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occurred while attempting to delete all Policies"
            });
        });
};

// get all active Policies
exports.findAllActive = (req, res) => {
    Policy.find({ is_active_policy: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving active Policies"
            });
        });
};