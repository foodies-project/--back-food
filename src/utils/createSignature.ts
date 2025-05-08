import crypto from 'crypto';

export const createSignature = (data: any[], secretKey: string) => {
  const string = data.join(';') + ';' + secretKey;
  return crypto.createHash('md5').update(string).digest('hex');
};
