const BoredApeNFT = artifacts.require("BoredApe");  // contract Name

module.exports = async function(deployer) {
  try {
    await deployer.deploy(BoredApeNFT);
  } catch (error) {
    console.error("Error during deployment:", error);
    throw error;
  }
};
