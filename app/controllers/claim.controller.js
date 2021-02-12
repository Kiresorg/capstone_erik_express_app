const db = require("../models");
const Claim = db.claims;

// create and save a Claim
exports.create = (req, res) => {
    // create Claim
    const claim = new Claim({
        policy_id: req.body.policy_id,
        opened_date: req.body.opened_date ? req.body.opened_date : new Date("2020-10-20T18:00:00.000Z"),
        incident_date: req.body.incident_date ? req.body.incident_date : new Date("2020-10-20T18:00:00.000Z"),
        adjustor_notes: req.body.adjustor_notes ? req.body.adjustor_notes : "",
        compensation_amount: req.body.compensation_amount ? req.body.compensation_amount : null,
        decision: req.body.decision ? req.body.decision : "",
        decision_date: req.body.decision_date ? req.body.decision_date : new Date("2020-10-20T18:00:00.000Z"),
        is_closed: req.body.is_closed ? req.body.is_closed : false
    });

    // save Claim to dB
    claim
        .save(claim)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creating Claim"
            });
        })
};

// get all claims
exports.findAll = (req, res) => {
    const adjustor_notes = req.query.adjustor_notes;
    var condition = adjustor_notes ? { adjustor_notes: { $regex: new RegExp(adjustor_notes), $options: "i" }} : {}

    Claim.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while retreving Claims"
            });
        });
};


// get Claim by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Claim.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found: Claim with id of " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retreiving Claim with id of " + id });
        });
};

// update Claim by id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Empty data for update"
        });
    }

    const id = req.params.id;

    Claim.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Edit failed for Policy with id of ${id}.`
                });
            } else res.send({ message: "Successfully updated Claim." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while trying to update Claim with id of " + id
            });
        });
};

// delete Claim by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Claim.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Unable to delete Claim with id of ${id}.`
                });
            } else {
                res.send({
                    message: "Claim deleted successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to delete Claim with id of " + id
            });
        });
};

// delete all Claims
exports.deleteAll = (req, res) => {
    Claim.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Claims were deleted successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occurred while attempting to delete all Claims"
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