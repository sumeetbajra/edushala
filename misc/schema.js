var schema = {
    _defaults: { type: 'string', required: true, nullable: false },
    sample: {
        firstname: { validator: function (v) { return v == 'santosh'; } },
        email: { type: 'email' },
        midname: { max: 6, min: 3, required: false, nullable: false },
        age: { type: 'int', max: 120 },
    }
}
module.exports = schema;