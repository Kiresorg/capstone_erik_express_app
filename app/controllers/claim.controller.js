const db = require("../models");
const Claim = db.claims;

// create and save a Claim
exports.create = (req, res) => {
    // create Claim
    const claim = new Claim({
        opened_date: req.body.opened_date ? req.body.opened_date : new Date("2020-10-20T18:00:00.000Z"),
        incident_date: req.body.incident_date ? req.body.incident_date : new Date("2020-10-20T18:00:00.000Z"),
        adjustor_notes: req.body.adjustor_notes ? req.body.adjustor_notes : "",
        compensation_amount: req.body.compensation_amount ? req.body.compensation_amount : null,
        decision: req.body.decision ? req.body.decision : "",
        decision_date: req.body.decision_date ? req.body.decision_date : new Date("2020-10-20T18:00:00.000Z"),
        is_closed: req.body.is_closed ? req.body.is_closed : false
        /*
            opened_date: Date,
            incident_date: Date,
            adjustor_notes: String,
            compensation_amount: Number,
            decision: String,
            decision_date: Date,
            is_closed:
        */
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