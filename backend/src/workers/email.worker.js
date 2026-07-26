import { Worker } from "bullmq";

new Worker(

    "email",

    async job => {

        console.log(

            "Processing",

            job.name

        );

        // send email

    },

    {

        connection

    }

);
