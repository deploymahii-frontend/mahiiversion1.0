export async function sendSMS({ phone, message }) {
  // TODO: Integrate with real SMS provider.
  console.log("Sending SMS to", phone, message);
  return {
    success: true,
    phone,
    message,
  };
}
