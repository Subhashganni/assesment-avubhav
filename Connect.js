import abi from "./abi/abi.json" assert {type:"json"};


const connect = new Promise ((res,rej) => {
if (typeof window.ethereum == "undefined"){
    rej("install metamask");
    
}
window.ethereum.request({method : "eth_requestAccounts"});
let web3 = new Web3(window.ethereum);
let contract = new web3.eth.Contract(abi,"0xf815b437C47a643772014b2a5d97d3F81F51ef5F");
web3.eth.getAccounts().then((accounts) => {
    contract.methods.totalSupply().call({from: accounts[0]}).then((supply)=>{
        console.log(supply);
        contract.methods.getBuildings().call({from: accounts[0]}).then((data)=>{
            res({supply: supply,buildings : data});
    })
});

});
});
export default connect;
