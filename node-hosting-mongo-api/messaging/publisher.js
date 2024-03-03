const { kafkaInstance } = require("../config/kafkaConfig");

const producer = kafkaInstance.producer();

const runPublisher = async () => {
  await producer.connect()
  console.log("Producer connected to Kafka broker");

  // Send a message to a Kafka topic
  await producer.send({
    topic: "in-payment-callback-event",
    messages: [{ value: "Hello Kafka!" }],
  });

  console.log("Message sent successfully");
};


module.exports = {
  runPublisher,
};
