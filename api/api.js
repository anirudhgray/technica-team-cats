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
        .setContractId("0.0.34877212")
        .setGas(100000)
        .setFunction(
            "setMedName",
            new ContractFunctionParameters().addString(req.params.name).addUint256(req.params.uid)
        );
    const contractExecuteSubmit = await contract.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
    //success status is 22
    res.json({ name: req.params.name, status: contractExecuteRx.status._code })
});
app.get("/get_med/:name", async (req, res) => {
    //added meds: calpol,allegra
    const query = new ContractCallQuery()
        .setContractId("0.0.34877212")
        .setGas(100000)
        .setFunction("getMedName", new ContractFunctionParameters().addString(req.params.name));
    const contractQuerySubmit1 = await query.execute(client);
    const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
    
    res.json({ name: req.params.name, uid: contractQueryResult1 })
    
});
/**
 * 0 - Manufacturer
 * 1 - Distributor
 * 2 - Smaller distributor
 * 3 - Pharmacist
 */
app.get("/verify/:name/:id", async (req, res) => {
    const contract = new ContractExecuteTransaction()
        .setContractId("0.0.34877212")
        .setGas(100000)
        .setFunction(
            "verify",
            new ContractFunctionParameters().addString(req.params.name).addUint256(req.params.id).addBool(true)
        );
    const contractExecuteSubmit = await contract.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
    //success status is 22
    res.json({ name: req.params.id, status: contractExecuteRx.status._code })
});
app.get("/verified/:name/:id", async (req, res) => {
    const query = new ContractCallQuery()
        .setContractId("0.0.34877212")
        .setGas(100000)
        .setFunction("verified",new ContractFunctionParameters().addString(req.params.name).addUint256(req.params.id));
    const contractQuerySubmit1 = await query.execute(client);
    const contractQueryResult1 = contractQuerySubmit1.getBool(0);
    
    res.json({ verified: contractQueryResult1 })
});
app.listen(8000)