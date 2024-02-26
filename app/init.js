let accounts;


//DEVELOPMENT: Serving contract from truffle's build/contracts

/* var abi, address;
fetch('http://localhost:3001/Record.json')
  .then(res => {
    return res.text();
  })
  .then(json => {
    var contractArtifact = JSON.parse(json);
    abi = contractArtifact.abi;
    var deployments = Object.keys(contractArtifact.networks);
    address = contractArtifact.networks[deployments[deployments.length - 1]].address;
    document.getElementById("contractAddress").innerHTML = "Contract address: " + address;
  }); */



// PRODUCTION: SERVE TESTNET CONTRACT ADDRESS

abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "id","type": "uint256"}],"name": "NewRecord","type": "event"},{"inputs": [{"internalType": "uint256","name": "_recordHash","type": "uint256"}],"name": "checkRecord","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "getRecord","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "recordToOwner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "records","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_recordHash","type": "uint256"}],"name": "storeRecord","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"},{"internalType": "uint256","name": "_newRecordHash","type": "uint256"}],"name": "updateRecord","outputs": [],"stateMutability": "nonpayable","type": "function"}];
address = "0x9D0E1CB647d98a344E29Beb3416da53e77A7896C";
document.getElementById("contractAddress").innerHTML = "Contract address: " + address;



const callContract = async (provider) => {

    // RecordContract = TruffleContract(abi);
    // RecordContract.setProvider(provider.provider);
    let result = await ctc.checkRecord(address);
    console.log(result);
}

async function connect() {
    if (typeof window.ethereum !== "undefined"){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        //html
        document.getElementById("actualAccount").innerHTML = account;
        document.getElementById("accountBar").setAttribute("style", "display: block;");
        document.getElementById("btnConnect").setAttribute("style", "display: none;");
    }
}

window.onload = function() {
    if (window.ethereum) {
      console.log("Wallet detected")
      window.ethereum.on("accountsChanged", function (accounts) {
          document.getElementById("actualAccount").innerHTML = accounts[0];
      });

      provider = new ethers.providers.Web3Provider(window.ethereum);
      web3 = new Web3(provider);
      const signer = provider.getSigner();

      ctc = new ethers.Contract(address, abi, signer);
      console.log("Contract detected!: " + ctc);
      // callContract(signer);
    } else {
      console.log("No wallet found...");
    }
}

const btnConnect = document.getElementById("btnConnect");

if (btnConnect) {
    btnConnect.addEventListener("click", connect);
}