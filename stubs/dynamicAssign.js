state.application = state.application || {};
var applicationMap = state.application;

exports.dynamicAssign = function (IDKey, req)
{
    //Assign New Clean
    if(Math.floor(Math.random() * 100) > 80)
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
                
                customerBase.customers.customer.accounts.account.push({"test":"this out"})
                
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
                
                customerBase.customers.customer.accounts.account.push({"test":"this out fcmf"});
                
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