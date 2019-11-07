const port = process.env.PORT || '8080';
const seedPWTest = process.env.SEED_PW_TEST;
const dbName = process.env.DB_NAME;

module.exports = {
    port,
    seedPWTest,
    dbName,
};