var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require("Verifier");
var correctProof = require("../contracts/proof-1.json");

contract('TestSolnSquareVerifier', accounts => {

    const account_owner = accounts[0];
    const account_one = accounts[1];


    describe('TestSolnSquareVerifier', function () {
        beforeEach(async function () { 
            this.verifierContract = await Verifier.new();
            this.contract = await SolnSquareVerifier.new(this.verifierContract.address, {from: account_owner});
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint an ERC721 token and add a new solution', async function () { 
            // Declare and Initialize a variable for event
            var eventEmitted;
            // Watch the emitted event SolutionAdded()
            this.contract.SolutionAdded({}, function(err, res) {
                eventEmitted = res;
            });

            await this.contract.mintToken(account_one,1001, correctProof.proof.a, correctProof.proof.b, correctProof.proof.c, correctProof.inputs,{from: account_owner}
              );
              let circulatingSupply = await this.contract.totalSupply({from: account_one});
              assert.equal(circulatingSupply.toNumber(), 1, "supply does not equal minted.");

              let account_one_balance = await this.contract.balanceOf(account_one,{from: account_one});
              assert.equal(account_one_balance, 1, "token was not minted to minter.");

              assert.equal(eventEmitted.returnValues.tokenId, 1001, "New Solution was not added for token 1001.");
              assert.equal(eventEmitted.returnValues.addr, account_one, "New Solution was not added for account_one.");
        });
    
    });
});
