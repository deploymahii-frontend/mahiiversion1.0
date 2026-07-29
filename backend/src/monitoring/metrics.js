import client from "prom-client";

export const requestCounter = new client.Counter({
    name: "mahii_requests_total",
    help: "Total API Requests"
});
