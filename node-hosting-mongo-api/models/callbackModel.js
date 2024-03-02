const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define sub-schemas
const cardTokenSchema = new Schema({
    token: String,
    token_provider: String,
    masked_pan: String,
    expiry_date: String,
    card_scheme: String,
    receipt_reference: String
});

const addressSchema = new Schema({
    first_name: String,
    last_name: String,
    street_1: String,
    apartment_number: String,
    city: String,
    state: String,
    state_code: String,
    postal_code: String,
    country: String,
    avs_check_required: Boolean
});

const linksSchema = new Schema({
    capture: {
        href: String
    },
    reversal: {
        href: String
    },
    paymentTokenStatus: {
        href: String
    }
});

// Define the main schema
const callbackSchema = new Schema({
    response_message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    status_code: {
        type: Number,
        required: true
    },
    auth_code: String,
    reference_number: String,
    cvv_result: String,
    card_token: cardTokenSchema,
    bill_to_details: addressSchema,
    ship_to_details: addressSchema,
    success_url: String,
    payment_token: String,
    custom: {
        hpp_allow_saving_card: String
    },
    payment_mode: String,
    payment_method: String,
    _links: linksSchema,
    receipt_reference: String
});

// Create a model
const callbackModel = mongoose.model('paymentmentCallback', callbackSchema);

module.exports = callbackModel;