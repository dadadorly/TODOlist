module.exports = async () => {
  await global.MONGO_DB?.stop();
};
