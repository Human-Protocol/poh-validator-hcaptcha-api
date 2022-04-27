import express from 'express';
import ethers from 'ethers';
import hcaptcha from 'hcaptcha';
import { validatorKey, hcaptchaSecret } from './config.js';

const wallet = new ethers.Wallet(validatorKey);

const api = express.Router();

const methodNotAllowed = (req, res) => {
  res.sendStatus(405);
};

api
  .route('/proof')
  .post(async (req, res, next) => {
    try {
      const { data, token } = req.body;

      const result = await hcaptcha.verify(hcaptchaSecret, token);
      const { success, challenge_ts } = result;
      if (!success) {
        res.sendStatus(400);
        return;
      }

      const timestamp = ethers.utils.hexZeroPad(
        ethers.utils.hexlify(
          Math.floor(new Date(challenge_ts).getTime() / 1000)
        ),
        4
      );

      const hash = ethers.utils.keccak256(
        ethers.utils.hexConcat([data, timestamp])
      );
      const validatorSignature = await wallet.signMessage(
        ethers.utils.arrayify(hash)
      );

      const proof = ethers.utils.hexConcat([
        data,
        timestamp,
        validatorSignature
      ]);

      res.json({ proof, timestamp: challenge_ts });
    } catch (error) {
      next(error);
    }
  })
  .all(methodNotAllowed);

export default api;
