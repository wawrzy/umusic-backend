const disconnect = (socketId) => {
  logger.info(`🕳️  Disconnect with ${socketId}`);
};

module.exports = {
  disconnect,
}
