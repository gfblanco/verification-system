const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
      return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const handleVerification = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const isValid = await verifyMessage({
    message: data.get("message"),
    address: data.get("address"),
    signature: data.get("signature")
  });

  if (isValid) {
    document.getElementById('validSignature').innerHTML = "♦ Correct sign. Checking key existence... <br/>";

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const record = NPP.getRecordByHash(account);

    if (record == undefined) {
      document.getElementById('validSignature').innerHTML = "♦ Your public key does not match with any academic record. <br/>";
      return;
    }

    document.getElementById('validSignature').innerHTML = "♦ Detected record in the university database. <br/>";

    if (record.role == "1" ) {
      sessionStorage.setItem('activeUserRole', record.role);

      let newRecordString = JSON.stringify(record);
      if (record.id == ""){

        dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(newRecordString));
        document.getElementById('recordExists').innerHTML = "♦ Academic record not traced by the blockchain.<br/>♦ Storing academic record with hash: " + dataHash + "<br/>";

        let storeValueTx = await storeRecord(dataHash);

        await NPP.updateRecordByHash( account, storeValueTx )

      } else {
        console.log("♦ Academic record ID not null, requesting information...");
      }
      ingresar(record);
    
    } else if (record.role == "2" ) {
      sessionStorage.setItem('activeUserRole', record.role);
      ingresar();
    }

  } else {
    document.getElementById('validSignature').innerHTML = "♦ Invalid signature, please try again.";
  }

};

function ingresar(record) {
  var role = sessionStorage.getItem('activeUserRole');
  switch(role){
    case '1':
      console.log("Student (1)");
      setFile(record);
      displayOne(record, "verifyTable");
      document.getElementById('btnDownload').setAttribute("style", "display: block;");
      document.getElementById('closeForm').setAttribute("style", "display: block;");

    break;
    case '2':
      console.log("Admin (2)");
      document.getElementById('updateForm').setAttribute("style", "display: block;");
      document.getElementById('moreOptionsForm').setAttribute("style", "display: block;");
      document.getElementById('closeForm').setAttribute("style", "display: block;");

    break;
    default:
      window.location.href = '/app/indexVerify.html';
    break;
  }

}

const verifyForm = document.querySelector("#verifyForm");

if (verifyForm) {
  verifyForm.addEventListener("submit", handleVerification);
}
