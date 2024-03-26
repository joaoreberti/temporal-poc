import { Kafka, logLevel } from 'kafkajs';
import { paymentCancellationHandler } from '../kafka/handlers/payment-cancellation';

// Create a Kafka client
const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`localhost:3012`],
  clientId: 'example-consumer',
});

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

// Create a list of subscribers
const subscribers = [paymentCancellationHandler];

const run = async () => {
  // Connect the consumer
  await consumer.connect();

  // Subscribe to a topic
  await consumer.subscribe({ topic: 'cancelled-payments', fromBeginning: true });

  // Run the consumer and handle incoming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Notify all subscribers
      subscribers.forEach((subscriber) =>
        subscriber({
          value: message.value?.toString(),
          offset: message.offset,
          partition,
          topic,
        })
      );
    },
  });
};

run().catch((err) => console.error(`[example/consumer] ${err.message}`, err));
