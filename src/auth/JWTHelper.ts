import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

enum DigitalSignature {
    RS256 = 'RS256',
    RS384 = 'RS384',
    RS512 = 'RS512',
}

interface JWTOptions {
    issuer: string;
    subject: string;
    audience: string;
    expiresIn: string;
    algorithm: DigitalSignature;
}

const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');
const DEFAULT_JWT_OPTIONS = {
    issuer: 'vetapp',
    subject: 'bugra.u@gmail.com',
    audience: 'vetapp.io',
    expiresIn: '12h',
    algorithm: DigitalSignature.RS256,
};

export function signJWT(payload: object, options: JWTOptions = DEFAULT_JWT_OPTIONS): string {
    return jwt.sign(payload, privateKEY, options);
}

export function verifyJWT(token: string, options: JWTOptions = DEFAULT_JWT_OPTIONS): string {
    return jwt.verify(token, publicKEY, options);
}
