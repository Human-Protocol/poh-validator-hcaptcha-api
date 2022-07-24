const port = process.env.PORT;
const validatorKey = process.env.VALIDATOR_KEY;
const hcaptchaSecret = process.env.HCAPTCHA_SECRET;

let errors = [];

if (!port) {
  errors.push("Error: PORT environment variable is not set.");
}
if (!validatorKey) {
  errors.push("Error: VALIDATOR_KEY environment variable is not set.");
}
if (!hcaptchaSecret) {
  errors.push("Error: HCAPTCHA_SECRET environment variable is not set.");
}

if (errors.length) {
  for (const error of errors) {
    console.error(error);
  }
  throw new Error("Insufficient environment varables");
}

export { port, validatorKey, hcaptchaSecret };
