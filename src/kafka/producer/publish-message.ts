import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`localhost:3012`],
  clientId: 'example-producer',
});

const topic = 'cancelled-payments';
const producer = kafka.producer();

export const sendMessage = async (workflowId: string) => {
  await producer.connect();
  try {
    const message = await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify({
            workflowId,
          }),
        },
      ],
    });
    return console.log(message);
  } catch (e: any) {
    return console.error(`[example/producer] ${e?.message}`, e);
  }
};
