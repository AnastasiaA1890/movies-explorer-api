const { NODE_ENV, JWT_SECRET } = process.env;

const regex = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
const MONGO_DEV_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  regex,
  secretKey,
  MONGO_DEV_DB,
};
