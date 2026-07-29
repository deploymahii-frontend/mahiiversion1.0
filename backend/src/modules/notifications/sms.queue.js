export const smsQueue = {
  async add(job) {
    // TODO: Persist or enqueue SMS job for background processing
    console.log("Enqueue SMS job", job);
    return job;
  },
};
