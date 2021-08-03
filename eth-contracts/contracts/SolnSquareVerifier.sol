pragma solidity >=0.4.21 <0.6.0;
import './ERC721Mintable.sol';

// // define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
interface Verifier {
    function verifyTx(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[2] calldata input
    )
        external
        returns(bool r);
}

// define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is UDARSERC721Token {

Verifier private verifier;

// define a solutions struct that can hold an index & an address
struct Solution{
    uint256 tokenId;
    address addr;
}

// define an array of the above struct
Solution[] private solutionsArray;

// define a mapping to store unique solutions submitted
mapping(bytes32 => bool) uniqueSolutions;


// Create an event to emit when a solution is added
event SolutionAdded(uint256 tokenId,address addr);

constructor(address verifierAddress) public {
    verifier = Verifier(verifierAddress);
}


// Create a function to add the solutions to the array and emit the event
function addSolution(uint256 tokenId, address addres, bytes32 solutionKey) internal{
    uniqueSolutions[solutionKey] = true;
    solutionsArray.push(Solution(tokenId, addres));
    emit SolutionAdded(tokenId, addres);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mintToken(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key] == false, "Solution is already verified");

        require(verifier.verifyTx(a, b, c, input), "Solution is not correct");
        addSolution(tokenId, to, key);
        super.mint(to, tokenId);
    }
}

  




























