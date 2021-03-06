const ethers = require("ethers"); //importing the ethers library, const makes it that a variable cannot be changed
const fs = require("fs-extra"); //This is to be able to read from the two files created after compile in order to get abi and binary
require("dotenv").config(); //importing and configuring dotenv, this allws us to use a .env file to hide sensitive data, we put the .env in a gitigore so that when we push to gitHUb it is not pushed.

async function main() {
  //we have compiled our code separately
  // http://172.27.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //This is the way our script conects to our blockchain (ganache)

  // const wallet = new ethers.Wallet(
  //   process.env.PRIVATE_KEY, //This is the private key of our wallet which is stored in ur env file, this is the ssntax to get it from .env
  //   provider
  // ); //This connects us to a wallet in order to sign our transactions

  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8"); //reading from our encryptedKey.json

  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  ); //the function takes the encrypted key and paswword and returns a wallet

  wallet = await wallet.connect(provider); //connecting or wallet

  const abi = fs.readFileSync("./simpleStorage_sol_SimpleStorage.abi", "utf-8"); //to get the abi
  const binary = fs.readFileSync(
    "./simpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  ); //get the binary

  //a contract factory is an object you can use to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //abi - so our code knows how to interact with the contract, binary- this is the main compiled code, wallet-to have a private key to sign deploying this contract
  console.log("Deploying contract, Please wait ...");
  const contract = await contractFactory.deploy(); //code stops here and waits for contract to deploy due to await keyword, it resolves a promise
  await contract.deployTransaction.wait(1);
  console.log(`Contract address: ${contract.address}`) //To display the contract address

  // const transactionReceipt = await contract.deployTransaction.wait(1); //setting the number of blockconfirmations we want
  // console.log("Here is the deployment transaction:");
  // console.log(contract.deployTransaction);

  // console.log("Here is the  transaction receipt:"); //you only get a transaction receipt when you wait for a block confirmation otherwise youre goiing to get the contract object which tha the deplo transaction
  // console.log(transactionReceipt);

  // //sending transactions purely with transaction data
  // console.log("Lets deploy with transaction data!")
  // const nonce = await wallet.getTransactionCount() //to always get the correct nonce
  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806320fe89bc1461005c5780632e64cec11461008c5780633613a9f4146100aa5780636057361d146100db5780636f760f41146100f7575b600080fd5b610076600480360381019061007191906103c8565b610113565b604051610083919061052a565b60405180910390f35b610094610141565b6040516100a1919061052a565b60405180910390f35b6100c460048036038101906100bf919061046d565b61014a565b6040516100d2929190610545565b60405180910390f35b6100f560048036038101906100f0919061046d565b610206565b005b610111600480360381019061010c9190610411565b610210565b005b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b60008054905090565b6001818154811061015a57600080fd5b90600052602060002090600202016000915090508060000154908060010180546101839061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546101af9061063e565b80156101fc5780601f106101d1576101008083540402835291602001916101fc565b820191906000526020600020905b8154815290600101906020018083116101df57829003601f168201915b5050505050905082565b8060008190555050565b600160405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906102769291906102a0565b5050508060028360405161028a9190610513565b9081526020016040518091039020819055505050565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea26469706673582212208b6e1e46f6eae34f061eee083a82c9e4b4fd225926bd994be70f25e9653274fb64736f6c63430008070033",
  //   chainId: 1337,
  // };

  // //const signedTxResponse = await wallet.signTransaction(tx);
  // //console.log(signedTxResponse); //will return a signed transaction, but not a sent transaction
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);

  const currentFavouriteNumber = await contract.retrieve(); // to call our retrieve function
  //string interpolation allows us to insert variables to a  string literal
  console.log(`Current Favourite Number: ${currentFavouriteNumber.toString()}`); //This returns a bigNUmber, we add toString() function to get the string equivalent of the bigNumber
  const transactionResponse = await contract.store("7"); //the store function in our contract, we pass the number as a string because js has a hard time dealing with large numbers
  const transactionReceipt = await transactionResponse.wait(1); //wait one block confirmation
  const updatedFavouriteNumber = await contract.retrieve(); //puts the result of the retrieve function in the variable
  console.log(`Updated favourite number: ${updatedFavouriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
