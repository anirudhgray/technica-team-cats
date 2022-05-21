require("dotenv").config();
const {
    AccountId,
    PrivateKey,
    Client,
    ContractFunctionParameters,
    ContractExecuteTransaction,
    ContractCallQuery,
} = require("@hashgraph/sdk");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const express = require("express");
const app = express()

app.get("/set_med/:name/:uid", async (req, res) => {
    const contract = new ContractExecuteTransaction()
        .setContractId("0.0.34875863")
        .setGas(100000)
        .setFunction(
            "setMedName",
            new ContractFunctionParameters().addString(req.params.name).addUint256(req.params.uid)
        );
    //return contract;
    const contractExecuteSubmit = await contract.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
    //console.log(`- Contract function call status: ${contractExecuteRx.status} \n`);
    res.json({ name: req.params.name, status: contractExecuteRx.status._code })
    //res.send(`Status: ${}`);
});
app.get("/get_med/:name", async (req, res) => {
    //added meds: calpol,allegra
    const query = new ContractCallQuery()
        .setContractId("0.0.34875863")
        .setGas(100000)
        .setFunction("getMedName", new ContractFunctionParameters().addString(req.params.name));
    const contractQuerySubmit1 = await query.execute(client);
    const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
    //console.log(`- Here's the uid that you asked for: ${contractQueryResult1} \n`);
    res.json({ name: req.params.name, uid: contractQueryResult1 })
    //res.send();
});
app.listen(3000)