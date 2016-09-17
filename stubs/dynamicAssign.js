state.application = state.application || {};
var applicationMap = state.application;

exports.dynamicAssign = function (IDKey, req)
{
    //Assign New Clean
    if(Math.floor(Math.random() * 100) > 50)
    {
        applicationMap[IDKey].responseTypes.newClean = true;
    }
    
    //Assign RAND CMF
    if(Math.floor(Math.random() * 100) > 20)
    {
        applicationMap[IDKey].responseTypes.cmf = true;
    }
    
    //Assign RAND FCMF
    if(Math.floor(Math.random() * 100) > 20)
    {
        applicationMap[IDKey].responseTypes.fcmf = true;
    }
    
    //Assign RAND OFAC
    if(Math.floor(Math.random() * 100) > 20)
    {
        applicationMap[IDKey].responseTypes.ofac = true;
    }
    
    //Assign RAND NEG
    if(Math.floor(Math.random() * 100) > 20)
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
            var customerBase = {
                    "customers": {
                        "customer": [{
                            "customerType": "individual",
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
                                        "addressLine1": data.reqBody.customer.addresses[0].addressLine1,
                                        "addressLine2": data.reqBody.customer.addresses[0].addressLine2,
                                        "cityName": data.reqBody.customer.addresses[0].cityName,
                                        "stateCode": data.reqBody.customer.addresses[0].stateCode,
                                        "zip": data.reqBody.customer.addresses[0].zip
                                    }
                                }]
                            },
                            "ssn": data.reqBody.customer.ssn
                        }]
                    }
                };
                
            
            //IF WE HAVE CMF ADD THAT
            if(applicationMap[IDKey].responseTypes.cmf === true)
            {
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
                
                customerBase.customers.customer.accounts.account.push(cmf);
                
            }
            
            //IF WE HAVE FCMF ADD THAT
            if(applicationMap[IDKey].responseTypes.fcmf === true)
            {
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
                
                customerBase.customers.customer.accounts.account.push(fcmf);
                
            }
            
        }
        
    } 
    else if (req.body.customer.customerType.toUpperCase() == "BUSINESS") 
    {
        applicationMap[IDKey].responseTemplate = "DYNAMIC_business_new";
        //applicationMap[IDKey].nextResponseTemplate = "DYNAMIC_business_existing";
        applicationMap[IDKey].predefinedResponseFound = true;
    } 
    else if (req.body.customer.customerType.toUpperCase() == "PERSONAL GUARANTOR") 
    {
        applicationMap[IDKey].responseTemplate = "DYNAMIC_PG_new";
        //applicationMap[IDKey].nextResponseTemplate = "DYNAMIC_PG_existing";
        applicationMap[IDKey].predefinedResponseFound = true;
    } 
    else 
    {
        applicationMap[IDKey].errorMessage = "Customer Type not recognised";
        applicationMap[IDKey].error = true;
    }
    return "";
}