import dbConnect from '../../database/dbconnect';
import Code from '../../models/code';
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
import { hasCookie } from 'cookies-next';
dbConnect();

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
        const { uuid } = req.body;
        const codeFile = await Code.find({ uuid: uuid.toString() });
        codeFile[0].code = cryptr.decrypt(codeFile[0].code);
        codeFile[0].input = cryptr.decrypt(codeFile[0].input);
        codeFile[0].language = cryptr.decrypt(codeFile[0].language);
        return res.status(200).json({ success: true, data: codeFile, message: `Successfully Fetched the Code ` });
      } catch (error) {
        return res.status(500).json({ success: false, data: null, messgage: error.message });
      }
    default:
      res.status(500).json({ success: false, data: null, messgage: `Route Not Found` });
  }
}
