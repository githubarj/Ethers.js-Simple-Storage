// synchronous programming is executing one line after another, for example in [solidity]
// [javascript] can be asynchronous

// cooking example
// Synchronous
//1. Put popcorn in microwave
//2. Wait for popcorn to finish
//3. Pour Drinks for everyone

//Asynchronous
//1. Put popcorn in microwave
//2. While popcorn is in microwave, pour drinks for everyone
//3. Wait for pocorn to finish

//Synchronous programming comes with a promise which can be pending, Fulfulled or rejected

async function main() {
  console.log("hi");
  let x = 2;
  console.log(2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//Package.json tells us a lot about our project and the dependencies that it works with
//solc gives us the ability to compile our contracts
// we can either compile them in our code and have them automatically run when we hit deploy
//We can compile them separately

//yarn comand is used to install dependencies and also run scripts

// in order to compile, write the following in the terminal, yarn solcjs --bin --abi --include-path node_modules/ --basepath . -o . simpleStorage.sol
// Since the above is very long, we can put in our package.json file some code in order to shorten it 

//ganache runs a fake blockchain locally on our device

//each  network has a rpc url
//rpc - remote -procedure call
//url - uniform resouce locator
//rpc url stands for a connection to a blockchain node that someone is running 
// blockchain nodes run with software

// we will use this rpc url to connect to our ganache
