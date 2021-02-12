const { mongo } = require("mongoose");
const { mongoose } = require(".");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            policy_id: String,
            opened_date: Date,
            incident_date: Date,
            adjustor_notes: String,
            compensation_amount: Number,
            decision: String,
            decision_date: Date,
            is_closed: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object._id = _id;
        return object;
    });

    const Claim = mongoose.model("claim", schema);
    return Claim;
};