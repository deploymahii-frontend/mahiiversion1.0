import { Queue } from "bullmq";

const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
};

export const emailQueue = new Queue("email", {
    connection
});

export const smsQueue = new Queue("sms", {
    connection
});

export const pushQueue = new Queue("push", {
    connection
});

export const settlementQueue = new Queue("settlement", {
    connection
});
