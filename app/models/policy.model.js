module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            holder_first_name: String,
            holder_last_name: String,
            holder_account_id: String,
            is_active_policy: Boolean,
            has_active_claim: Boolean,
            effective_date: Date,
            termination_date: Date
        },
        { timestamps: true }
    );
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object._id = _id;
        return object;
    });
    
    const Policy = mongoose.model("policy", schema);
    return Policy;
};