const Lottery = artifacts.require("Lottery");

module.exports = async function (deployer) {
    console.log('Deploying to Arbitrum')
    await deployer.deploy(Lottery);
};


