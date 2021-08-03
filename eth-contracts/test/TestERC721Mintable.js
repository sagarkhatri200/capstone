var UDARSERC721Token = artifacts.require('UDARSERC721Token');

contract('TestUDARSERC721Token', accounts => {

    const account_owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const account_three = accounts[3];
    const account_four = accounts[4];
    const account_five = accounts[5];


    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await UDARSERC721Token.new({from: account_owner});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1001, {from: account_owner});
            await this.contract.mint(account_two, 1002, {from: account_owner});
            await this.contract.mint(account_three, 1003, {from: account_owner});
            await this.contract.mint(account_four, 1004, {from: account_owner});
            await this.contract.mint(account_five, 1005, {from: account_owner});
        })

        it('should return total supply', async function () { 
            let circulatingSupply = await this.contract.totalSupply({from: account_owner});
            assert.equal(circulatingSupply.toNumber(), 5, "supply does not equal minted.");
        })

        it('should get token balance', async function () { 
            let account_one_balance = await this.contract.balanceOf(account_one,{from: account_one});
            assert.equal(account_one_balance, 1, "balance does not match expected balance");
            let account_two_balance = await this.contract.balanceOf(account_two,{from: account_two});
            assert.equal(account_two_balance, 1, "balance does not match expected balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let token_uri = await this.contract.tokenURI(1001,{from: account_one});
            assert.equal( token_uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1001","token uri is not correct.");

            let token_uri_2 = await this.contract.tokenURI(1004,{from: account_one});
            assert.equal(token_uri_2, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1004","token uri is not correct.");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_five, account_one, 1005, {from: account_five});
            
            let ownerOfToken1005 = await this.contract.ownerOf(1005,{from: account_five});
            assert.equal(ownerOfToken1005, account_one, "token was not transferred from account5 to account 1.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await UDARSERC721Token.new({from: account_owner});

        })

        it('should fail when minting when address is not contract owner', async function () { 
            let errorOccured = false;
            try{
            await this.contract.mint(account_one, 99, {from: account_one})
            }catch(e)
            {
                errorOccured= true;
            }
            assert.equal(errorOccured, true, "error did not happen while non-owner minted a token.");
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.Owner({from: account_one});
            assert.equal(contractOwner, account_owner, "returned contract owner is not the one who deployed the contract.");
        })

    });
})