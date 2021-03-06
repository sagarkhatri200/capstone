// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Verifier = artifacts.require("Verifier");
var correctProof = require("../contracts/correct-proof-1.json");
var incorrectProof = require("../contracts/incorrect-proof-2.json");

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps
    
// Test verification with incorrect proof
contract('TestVerifier', accounts => {

    describe('Verifier', function () {
        beforeEach(async function () { 
            this.contract = await Verifier.new();
       })

        it('verifies correctly for the correct proof', async function () { 
            
            let verified = await this.contract.verifyTx(correctProof.proof.a, correctProof.proof.b, correctProof.proof.c, correctProof.inputs);

           assert.equal( verified, true ,"Verification did not work with correct proof."); 
        })

        it('verifies correctly with the incorrect proof', async function () { 
            let verified = await this.contract.verifyTx(incorrectProof.proof.a, incorrectProof.proof.b, incorrectProof.proof.c, incorrectProof.inputs);

            assert.equal( verified, false ,"Verification did not work with incorrect proof."); 
        })
    
    });
})
