const { Kafka } = require("kafkajs");

//create kafka instance
const kafkaInstance = new Kafka({
  clientId: "payment-producer",
  brokers: ["localhost:29092", "localhost:39092"]
});


module.exports = {
    kafkaInstance
}