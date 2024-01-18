import { hasCookie } from 'cookies-next';
import Cryptr from 'cryptr';
import Code from 'models/code';
import dbConnect from '../../database/dbconnect';
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
dbConnect();

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default async function handler(req, res) {
  if (hasCookie('sessionID', { req, res })) {
    console.log('Cookie Hai 🥳');
  } else {
    console.log('Cookie Gayab Hai 💀');
    return res.status(401).json({ success: false, data: null, messgage: 'Unauthorized Access 💀' });
  }
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        let { code, language, input } = req.body;
        code = cryptr.encrypt(code);
        language = cryptr.encrypt(language);
        input = cryptr.encrypt(input);
        const savedCode = await Code.create({
          code: code,
          uuid: makeid(8),
          language: language,
          input: input,
        });
        return res.status(200).json({
          success: true,
          data: savedCode,
          message: `Code Saved Successfully`,
        });
      } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ success: false, data: null, message: `Can't Save Code into Database ${error.message}` });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
