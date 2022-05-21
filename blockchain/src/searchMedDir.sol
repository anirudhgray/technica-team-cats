// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0<0.9.0;

contract MedicalDirectory {
    
    mapping (string => uint) public medical_directory;
    mapping (string=>bool[4]) verifications;

    constructor(string memory med_name,uint med_uid) {
        medical_directory[med_name]=med_uid;
    }

    function setMedName(string memory med_name,uint med_uid)public {
        medical_directory[med_name]=med_uid;
    }

    function getMedName(string memory med_name) public view returns(uint){
        return medical_directory[med_name];
    }

    function verify(string memory med_name,uint id,bool done)public{
        verifications[med_name][id]=done;
    }
    function verified(string memory med_name,uint id)public view returns(bool){
        return verifications[med_name][id];
    }
}