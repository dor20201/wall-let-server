import { AES, enc } from 'crypto-ts';

const secretKey = "mZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQf";


class Encryption {
  encrypt (text: string) {
    const encryptedText = AES.encrypt(text, secretKey).toString();

    return encryptedText;
  };

  decrypt (text: string) {
    const decryptedText = AES.decrypt(text, secretKey).toString(enc.Utf8);

    return decryptedText;
  };
}

export const encryption = new Encryption();


