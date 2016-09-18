state.application = state.application || {};
var applicationMap = state.application;

 var cmf = {
                    "accountNumber": "110017364",
                    "status": "O",
                    "statusChangeDate": "03/03/2004",
                    "accountType": "I",
                    "accountsubType": "R",
                    "contactAddress": {},
                    "notes": [{
                        "noteType": "CUSTOMERSTATUS",
                        "content": "CMF"
                    }]
                };
                
                
var fcmf = {
                    "accountNumber": "912345670",
                    "status": "C",
                    "statusChangeDate": "02/02/2012",
                    "accountType": "I",
                    "accountsubType": "R",
                    "contactAddress": {},
                    "serviceStartDate": "01/01/2012",
                    "notes": [{
                        "noteType": "CUSTOMERSTATUS",
                        "content": "FCMF"
                    }]
                };
                
var OFAC = {"jurisdictionActions": [{
                "sanctionFlag": true,
                "sanctionDate": "09/09/2016",
                "id": "18376",
                "watchLists": [{
                    "alertId": "SEN-205",
                    "caseKey": "OWS-201609-091048-48E262-IND",
                    "city": "Basel",
                    "country": "CH",
                    "familyName": "GONZALES MEJIA",
                    "fullName": "CRISTIAN GONZALES MEJIA",
                    "givenName": "CRISTIAN",
                    "key": "OFAC",
                    "subKey": "OFAC-SDN",
                    "matchRule": "[I150O] Abbreviated given name and family name with typos only",
                    "matchScore": "74",
                    "nameType": "aka",
                    "vendorId": "18376",
                    "primaryName": "Cristian David GONZALEZ MEJIA",
                    "recordOrigin": "OFAC-SDN",
                    "recordType": "SAN",
                    "riskScore": "76"
                }, {
                    "alertId": "SEN-207",
                    "caseKey": "OWS-201609-091052-1A972A-IND",
                    "city": "Basel",
                    "country": "CH",
                    "familyName": "GONZALEZ MEJIA",
                    "fullName": "CRISTIAN DAVID GONZALEZ MEJIA",
                    "givenName": "CRISTIAN DAVID",
                    "key": "OFAC",
                    "subKey": "OFAC-SDN",
                    "matchRule": "[I010P] Exact name (conflict)",
                    "matchScore": "75",
                    "nameType": "Primary",
                    "vendorId": "18376",
                    "primaryName": "Cristian David GONZALEZ MEJIA",
                    "recordOrigin": "OFAC-SDN",
                    "recordType": "SAN",
                    "riskScore": "76"
                }],
                "userName": "SADMINU2",
                "overrideStatus": "No Over Ride",
                "actionTaken": false,
                "comments": [
                    "FOR Review"
                ]
            }]};
            
var neg = {"negativeAccount": [{
                            "accountNumber": "897152159",
                            "status": "N",
                            "statusChangeDate": "07/07/2014",
                            "accountType": "B",
                            "accountSubType": "C",
                            "contactFamilyName": "ABG CAPITAL",
                            "contactAddress": {
                                "addressLine1": "8 PENN CTR W STE 101",
                                "cityName": "PITTSBURGH",
                                "stateCode": "PA",
                                "zip": "15276"
                            },
                            "linesCount": 7,
                            "availableBalance": 2073.01,
                            "serviceStartDate": "07/06/2013",
                            "billCycle": "2",
                            "earlyTerminationFee": 0,
                            "collectionAssignedDate": "09/11/2014",
                            "phoneNumbers": [],
                            "newAccountIndicator": true,
                            "submarketCode": "NYN",
                            "submarketName": "NEW YORK NY",
                            "statusReasonCode": "FABR",
                            "paymentLastAmount": 0,
                            "taxId": "455108077",
                            "writeOffDate": "10/04/2013",
                            "creditClass": "0",
                            "statusActivityCode": "CAN",
                            "statusActivityReason": "FABR",
                            "negativeFiles": [{
                                "negativeFileId": "244443509",
                                "marketCode": "VST",
                                "agencyCode": "DCI",
                                "assignedDate": "06/01/2015",
                                "activityDate": "06/01/2015",
                                "activityAmount": "2073.01",
                                "activityType": "ASSN"
                            }],
                            "ssn": "310929576"
                        }]}

exports.dynamicAssign = function (IDKey, req)
{
    /////////////////////////////////////////
    //Create the holding variable for the body
    var bodyObject;
    
    //Assign New Clean
    if(Math.floor(Math.random() * 100) < 20)
    {
        applicationMap[IDKey].responseTypes.newClean = true;
    }
    
    //Assign RAND CMF
    if(Math.floor(Math.random() * 100) < 20)
    {
        applicationMap[IDKey].responseTypes.cmf = true;
    }
    
    //Assign RAND FCMF
    if(Math.floor(Math.random() * 100) < 20)
    {
        applicationMap[IDKey].responseTypes.fcmf = true;
    }
    
    //Assign RAND OFAC
    if(Math.floor(Math.random() * 100) < 20)
    {
        applicationMap[IDKey].responseTypes.ofac = true;
    }
    
    //Assign RAND NEG
    if(Math.floor(Math.random() * 100) < 20)
    {
        applicationMap[IDKey].responseTypes.neg = true;
    }
    
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") 
    {
        if(applicationMap[IDKey].responseTypes.newClean === true)
        {
            applicationMap[IDKey].responseTemplate = "DYNAMIC_customer_new";
            applicationMap[IDKey].nextResponseTemplate = "DYNAMIC_customer_existing";
            applicationMap[IDKey].predefinedResponseFound = true;
        }
        else
        {
            bodyObject = {
                    "customers": {
                        "customer": [{
                            "customerType": "individual",
                            "firstName": applicationMap[IDKey].reqBody.customer.firstName,
                            "familyName": applicationMap[IDKey].reqBody.customer.familyname,
                            "dateOfBirth": applicationMap[IDKey].reqBody.customer.dateOfBirth,
                            "phoneNumbers": [{
                                "phoneNumber": applicationMap[IDKey].reqBody.customer.phoneNumbers[0].phoneNumber,
                                "phoneType": applicationMap[IDKey].reqBody.customer.phoneNumbers[0].phoneType
                            }],
                            "commonCustomerId": applicationMap[IDKey].custGeneratedCCID,
                            "status": "N",
                            "accounts": {
                                "account": [{
                                    "contactAddress": {
                                        "addressLine1": applicationMap[IDKey].reqBody.customer.addresses[0].addressLine1,
                                        "addressLine2": applicationMap[IDKey].reqBody.customer.addresses[0].addressLine2,
                                        "cityName": applicationMap[IDKey].reqBody.customer.addresses[0].cityName,
                                        "stateCode": applicationMap[IDKey].reqBody.customer.addresses[0].stateCode,
                                        "zip": applicationMap[IDKey].reqBody.customer.addresses[0].zip
                                    }
                                }]
                            },
                            "ssn": applicationMap[IDKey].reqBody.customer.ssn
                        }]
                    }
                };
        }
        
    } 
    else if (req.body.customer.customerType.toUpperCase() == "BUSINESS") 
    {
        if(applicationMap[IDKey].responseTypes.newClean === true)
        {
            applicationMap[IDKey].responseTemplate = "DYNAMIC_business_new";
            //applicationMap[IDKey].nextResponseTemplate = "DYNAMIC_business_existing";
            applicationMap[IDKey].predefinedResponseFound = true;
        }
        else
        {
            bodyObject = {
                            "customers": {
                                "customer": [{
                                    "customerType": "Business",
                                    "organization": {
                                        "name": data.reqBody.customer.organization.name,
                                        "taxId": data.reqBody.customer.organization.taxId
                                    },
                                    "phoneNumbers": [{
                                        "phoneNumber": data.reqBody.customer.phoneNumbers[0].phoneNumber,
                                        "phoneType": data.reqBody.customer.phoneNumbers[0].phoneType
                                    }],
                                    "commonCustomerId": data.reqBody.bizGeneratedCCID,
                                    "status": "N",
                                    "accounts": {
                                        "account": [{
                                            "contactAddress": {
                                                "addressLine1": data.reqBody.customer.addresses[0].addressLine1,
                                                "addressLine2": data.reqBody.customer.addresses[0].addressLine2,
                                                "cityName": data.reqBody.customer.addresses[0].cityName,
                                                "stateCode": data.reqBody.customer.addresses[0].stateCode,
                                                "zip": data.reqBody.customer.addresses[0].zip
                                            }
                                        }]
                                    }
                                }]
                            }
                        }
            
            
        }
    } 
    else if (req.body.customer.customerType.toUpperCase() == "PERSONAL GUARANTOR") 
    {
        if(applicationMap[IDKey].responseTypes.newClean === true)
        {
            applicationMap[IDKey].responseTemplate = "DYNAMIC_PG_new";
            //applicationMap[IDKey].nextResponseTemplate = "DYNAMIC_PG_existing";
            applicationMap[IDKey].predefinedResponseFound = true;
        }
        else
        {
            
            bodyObject = {
                            "customers": {
                                "customer": [{
                                    "customerType": "Business",
                                    "organization": {
                                        "name": data.reqBody.customer.organization.name,
                                        "taxId": data.reqBody.customer.organization.taxId
                                    },
                                    "commonCustomerId": data.reqBody.bizGeneratedCCID,
                                    "status": "N",
                                    "accounts": {
                                        "account": [{
                                            "contactAddress": {
                                                "addressLine1": data.reqBody.customer.addresses[0].addressLine1,
                                                "addressLine2": data.reqBody.customer.addresses[0].addressLine2,
                                                "cityName": data.reqBody.customer.addresses[0].cityName,
                                                "stateCode": data.reqBody.customer.addresses[0].stateCode,
                                                "zip": data.reqBody.customer.addresses[0].zip
                                            }
                                        }]
                                    }
                                }, {
                                    "customerType": "Personal Guarantor",
                                    "firstName": data.reqBody.customer.firstName,
                                    "familyName": data.reqBody.customer.familyname,
                                    "dateOfBirth": data.reqBody.customer.dateOfBirth,
                                    "phoneNumbers": [{
                                        "phoneNumber": data.reqBody.customer.phoneNumbers[0].phoneNumber,
                                        "phoneType": data.reqBody.customer.phoneNumbers[0].phoneType
                                    }],
                                    "commonCustomerId": data.custGeneratedCCID,
                                    "status": "N",
                                    "accounts": {
                                        "account": [{
                                            "contactAddress": {
                                                "addressLine1": data.reqBody.customer.addresses[1].addressLine1,
                                                "addressLine2": data.reqBody.customer.addresses[1].addressLine2,
                                                "cityName": data.reqBody.customer.addresses[1].cityName,
                                                "stateCode": data.reqBody.customer.addresses[1].stateCode,
                                                "zip": data.reqBody.customer.addresses[1].zip
                                            }
                                        }]
                                    },
                                    "ssn": data.reqBody.customer.ssn
                                }]
                            }
                        }
            
        }
    } 
    else 
    {
        applicationMap[IDKey].errorMessage = "Customer Type not recognised";
        applicationMap[IDKey].error = true;
    }
    
    
    
    
    
    //THIS IS NOT A TEMPLATE RESPONSE SO LETS ADD ANY PIECES
     if(applicationMap[IDKey].predefinedResponseFound === true)
     {
        //IF WE HAVE CMF ADD THAT
        if(applicationMap[IDKey].responseTypes.cmf === true)
        {
           
            bodyObject.customers.customer[0].accounts.account.push(cmf);
        }
        
        //IF WE HAVE FCMF ADD THAT
        if(applicationMap[IDKey].responseTypes.fcmf === true)
        {
            bodyObject.customers.customer[0].accounts.account.push(fcmf);
        }
        
        //IF WE HAVE OFAC ADD THAT
        if(applicationMap[IDKey].responseTypes.ofac === true)
        {
            bodyObject.customers.customer[0].jurisdictionActions = OFAC.jurisdictionActions;
        }
        
        //IF WE HAVE NEG ADD THAT
        if(applicationMap[IDKey].responseTypes.neg === true)
        {
           bodyObject.responseBody.customers.customer[0].negativeAccount = neg.negativeAccount;
        }
        
        
        //ADDING THE PIECES IS DONE SO APPEND TO THE STORAGE OBJECT
        applicationMap[IDKey].responseBody = bodyObject;
     }
    
    
    
    
    
    
    
    return "";
}