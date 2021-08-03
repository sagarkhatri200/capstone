# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)


# Steps to test the code

##software requirements
- Truffle v5.4.3 (core: 5.4.3)
- Solidity v0.5.16 (solc-js)
- Node v14.17.3
- Web3.js v1.5.0
 
##Installation
- clon the code
- Go to root folder
- npm install

##Execution
- cd eth-contracts
- truffle compile
- open command window and bootstrap ganache using this comand `ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" --gasLimit=0x1fffffffffffff --allowUnlimitedContractSize -e 1000000000 -a 100`
- truffle migrate --reset
- truffle test


# Rinkeby and OpenSea Detail

- Contract Address: https://rinkeby.etherscan.io/address/0x2f503333BF2B7071fE3d6E5d9f1A47ED3b1267Ad

- Store front Deployed manually via truffle: https://testnets.opensea.io/collection/udacity-realstate-token

- Open Sea Interaction Transactions: https://rinkeby.etherscan.io/address/0x2f503333BF2B7071fE3d6E5d9f1A47ED3b1267Ad
- All minted tokens were transferred or sold back to owner and are avilable to sell in the above store front.






