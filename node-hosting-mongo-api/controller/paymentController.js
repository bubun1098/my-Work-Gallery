const PaymentModel = require("../models/callbackModel");
const { CallbackEntryResponse } = require("../schemas/CallbackEntryResponse");
const { ErrorResponse } = require("../schemas/ErrorResponse");

//create callback entry
const createPaymentEntry = (req, res) => {
  //const parsed_request = JSON.parse(req.body.data)
  const parsed_request = req.body;
  const newCallbackEntry = new PaymentModel({
    response_message: parsed_request.response_message,
    status: parsed_request.status,
    auth_code: parsed_request.auth_code,
    cvv_result: parsed_request.cvv_result,
    status_code: parsed_request.status_code,
    reference_number: parsed_request.reference_number,
    card_token: parsed_request.card_token,
    custom: parsed_request.custom,
    _links: parsed_request._links,
    payment_method: parsed_request.payment_method,
    payment_mode: parsed_request.payment_mode,
    receipt_reference: parsed_request.receipt_reference,
    success_url: parsed_request.success_url,
    ship_to_details: parsed_request.ship_to_details,
    bill_to_details: parsed_request.bill_to_details,
    payment_token: parsed_request.payment_token,
  });
  newCallbackEntry
    .save()
    .then((savedObj) => {
      let responseVar = {
        payment_token: savedObj.payment_token,
        auth_code: savedObj.auth_code,
        reference_code: savedObj.reference_number,
        receipt_reference: savedObj.receipt_reference,
      };
      const response = new CallbackEntryResponse(200, "Success", responseVar);
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      const errorResp = new ErrorResponse(500, "Failure", error);
      res.json(errorResp);
    });
};

// read by token
const fetchCallBackEntry = (req, res) => {
  console.log("request received to fetch for token ", req.params.id);
  PaymentModel.find({ payment_token: req.params.id })
    .then((paymentObj) => {
      res.status(200).json(paymentObj);
    })
    .catch((error) => {
      const errorResp = new ErrorResponse(500, "Failure", error);
      res.json(errorResp);
    });
};

//delete by token
const deleteByToken = (req, res) => {
  console.log(
    "request received for deleteion with payment_token ",
    req.params.id
  );
  PaymentModel.deleteMany({ payment_token: req.params.id })
    .then((result) => {
      res.status(200).json({"deleted_count": result.deletedCount});
    })
    .catch((error) => {
      const errorResp = new ErrorResponse(500, "Failure", error);
      res.json(errorResp);
    });
};

module.exports = {
  createPaymentEntry,
  fetchCallBackEntry,
  deleteByToken
};
