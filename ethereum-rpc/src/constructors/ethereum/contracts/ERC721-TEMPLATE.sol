pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract {{token.name}} is ERC721 {
  constructor() ERC721("{{token.name}}", "{{token.symbol}}") public {}
}
