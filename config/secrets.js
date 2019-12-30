const port = process.env.PORT || '8080';
const seedPWTest = process.env.SEED_PW_TEST;
const secret = process.env.JWT_SECRET || 'sdfgsdfgsd~!@`21123asdf~!@#';

module.exports = {
    port,
    seedPWTest,
    dbName,
    secret,
};