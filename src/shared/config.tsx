import * as CryptoJS from 'crypto-js'

const secretKey = import.meta.env.SEC_KEY ? import.meta.env.SEC_KEY : '12345'

export const encrypt = ( plainText: string ) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString()
    return cipherText
}

export const decrypt = ( cipherText:string ) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey )
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return plainText
}