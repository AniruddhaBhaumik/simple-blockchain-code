const SHA256 = require("crypto-js/sha256");

class CryptoBlock {
  constructor(index, timestamp, data, preceedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.preceedingHash = preceedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.preceedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;
  }
  startGenesisBlock() {
    return new CryptoBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.preceedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const preceedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.preceedingHash !== preceedingBlock.hash) return false;
    }
    return true;
  }
}

let theblockchaincoder = new CryptoBlockchain();

console.log("theblockchaincoder mining in progress....");
theblockchaincoder.addNewBlock(
  new CryptoBlock(1, "23/07/2024", {
    sender: "Aniruddha Bhaumik",
    recipient: "Yash Krishna",
    quantity: 50,
  })
);

theblockchaincoder.addNewBlock(
  new CryptoBlock(2, "26/07/2024", {
    sender: "Shreyash Pachpol",
    recipient: "Soumalya Bhattacharya",
    quantity: 100,
  })
);

console.log(JSON.stringify(theblockchaincoder, null, 4));
