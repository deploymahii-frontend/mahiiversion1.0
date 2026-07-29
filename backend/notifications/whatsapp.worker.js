export async function processWhatsAppJob(

    job

){

    await sendWhatsApp({

        phone: job.phone,

        template: job.template,

        parameters: job.parameters

    });

}
