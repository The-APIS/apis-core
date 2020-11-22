pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract {{token.name}} is ERC20 {
  constructor() ERC20("{{token.name}}", "{{token.symbol}}") public {}
}
