# Proof-of-Humanity hCaptcha Validator API

[![Docker](https://img.shields.io/docker/pulls/bakoushin/poh-validator-hcaptcha)](https://hub.docker.com/r/bakoushin/poh-validator-hcaptcha)

Validator API exposes a single endpoint `/api/v1/proof`.

The endpoint takes a hex-string `data` to be signed, and an [hCaptcha](https://www.hcaptcha.com/) challenge `token` to be verified. See file [`example.http`](example.http).

Once hCaptcha token validity is verified, `data` is included in a signed Proof-of-Humanity, which is returned along with a `timestamp`.

See details and example: [OpenAPI interface](https://app.swaggerhub.com/apis-docs/bakoushin/poh-validator-hcaptcha/0.0.1)

Generated Proof-of-Humanity could be further verified on-chain in a smart contract.

This API can be used as an example for other PoH validator APIs.

## Quickstart

### As a Docker container

```bash
docker run -it \
  -p 8080:8080 \
  --env PORT=8080 \
  --env VALIDATOR_KEY=0x89c821ae8f9abcd0737f910e3de1904699df9e390a9f184f01f941e20dac8a52 \
  --env HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000 \
  bakoushin/poh-validator-hcaptcha
```

### As a Node project

```bash
git clone https://github.com/bakoushin/poh-validator-hcaptcha-api.git
cd poh-validator-hcaptcha
npm install
npm start
```

### Example query

```bash
curl -X POST http://localhost:8080/api/v1/proof \
   -H 'Content-Type: application/json' \
   -d '{ "data": "0xef9990adc264ccc6e55bd0cfbf8dbef5177760273ee5aa3f65aae4bbb014750f", "token": "10000000-aaaa-bbbb-cccc-000000000001" }'
```

> Set appropriate environment variables in a `.env` file before starting a server.

### Environment variables

| Env. variable   | Description                 | Example                                                            |
| --------------- | --------------------------- | ------------------------------------------------------------------ |
| PORT            | Port to run on              | 8080                                                               |
| VALIDATOR_KEY   | Private key to sign proofs  | 0x89c821ae8f9abcd0737f910e3de1904699df9e390a9f184f01f941e20dac8a52 |
| HCAPTCHA_SECRET | hCaptcha account secret key | 0x0000000000000000000000000000000000000000                         |

## Author

Alex Bakoushin

## License

MIT
