/**
 * My API Sandbox
 * 
 */
 
state.application = state.application || {};
var applicationMap = state.application;
 
 
//The predefined maps are in the util script
var utils = require('./utils.js');
 
function makeid()
{
    var text = "";
    var possible = "0123456789";

    text = possible.charAt(Math.floor(Math.random() * possible.length));
    text += "-"

    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



Sandbox.define('/core/v2/customers/', 'POST', function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    
    //Make a unique mapping value to store what the SSN/TID of the inboud request is
    var IDKey; 
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") {
        IDKey = req.body.customer.ssn;
    }
    else
    {
        IDKey = req.body.customer.organization.taxId;
    }
    
    //Gnerate a stateful store of the created CCID and (currently) keep a copy of the req 
    applicationMap[IDKey] = { "generatedCCID": makeid(),
                                "reqBody":req.body,
                                "predefinedResponseFound":false
    };
    
    //Had the request off to the if block that determines if this is a known test case and needs a specific response
    utils.determinePredefinedResponse(IDKey, req);
   
   if(applicationMap[IDKey].predefinedResponseFound === true)
   {
       res.render(applicationMap[IDKey].responseTemplate);
   }    
   else
   {
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") {
        if (req.body.customer.ssn == "110017363") {
            //Dewey September
            //CUSTOMER SINGLE CMF
            res.render("customer_single_cmf");
        } else if (req.body.customer.ssn == "342244596") {
            //Shota Rossi
            //CUSTOMER SINGLE FCMF
            res.render("customer_single_fcmf");
        } else if (req.body.customer.ssn == "666508280") {
            //Adesa McComb
            //CUSTOMER SIMPLE OFAC
            res.render("customer_single_ofac");
        } else if (req.body.customer.ssn == "666669723") {
            //Customer Single Neg
            //Provide response back for MARCI BLUMENTHAL
            res.render("customer_single_neg");
        } else if (req.body.customer.ssn == "666456009") {
            //Samuel Peter
            //CUSTOMER MULTIPLE CMF
            res.render("customer_multiple_cmf");
        } else if (req.body.customer.ssn == "666234987") {
            //Joe Generic
            //CUSTOMER MULTIPLE FCMF
            res.render("customer_multiple_fcmf");
        } else if (req.body.customer.ssn == "627497362") {
            //Cristian David Gonzalez Mejia
            //CUSTOMER MULTIPLE OFAC
            res.render("customer_multiple_ofac");
        } else if (req.body.customer.ssn == "666157434") {
            //Mario Solis
            //CUSTOMER MULTIPLE Neg
            res.render("customer_multiple_neg");
        } else {
             
          // res.render("dyn_cust",{"reqTest":req.body,"generatedCCID":3} );
            //res.json({});
            var cust = {
                "customers": {
                    "customer": [{
                        "customerType": "individual",
                        "firstName": req.body.customer.firstName,
                        "familyName": req.body.customer.familyname,
                        "dateOfBirth": req.body.customer.dateOfBirth,
                        "phoneNumbers": [{
                            "phoneNumber": req.body.customer.phoneNumbers[0].phoneNumber,
                            "phoneType": req.body.customer.phoneNumbers[0].phoneType.toUpperCase()
                        }],
                        "commonCustomerId": makeid(),
                        "status": "N",
                        "notes": [{
                            "noteType": "NEWCUSTOMER",
                            "content": "TRUE"
                        }],
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": req.body.customer.addresses[0].addressLine1,
                                    "addressLine2": req.body.customer.addresses[0].addressLine2,
                                    "cityName": req.body.customer.addresses[0].cityName,
                                    "stateCode": req.body.customer.addresses[0].stateCode,
                                    "zip": req.body.customer.addresses[0].zip
                                }
                            }]
                        },
                        "ssn": req.body.customer.ssn
                    }]
                }
            }
    
            res.json(cust);
        }
    } else if (req.body.customer.customerType.toUpperCase() == "BUSINESS") {
        if (req.body.customer.organization.taxId == "531598285") {
            //BENEDICTO
            //Business SINGLE CMF
            res.render("business_single_cmf",{"reqBody":req,"generatedCCID":"3"});
        } else if (req.body.customer.organization.taxId == "732423580") {
            //One FCMF LLC
            //Business SINGLE FCMF
            res.render("business_single_fcmf");
        } else if (req.body.customer.organization.taxId == "720792454") {
            //PFEIFFER GANTT & GLEATON
            //Business SIMPLE OFAC
            res.render("business_single_ofac");
        } else if (req.body.customer.organization.taxId == "310929576") {
            //ABG CAPITAL
            //Business Single Neg
            res.render("business_single_neg");
        } else if (req.body.customer.organization.taxId == "232423571") {
            //MULTIPLE CMF LLC
            //Business MULTIPLE CMF
            res.render("business_multiple_cmf");
        } else if (req.body.customer.organization.taxId == "532423579") {
            //MULTIPLE FCMF LLC
            //Business MULTIPLE FCMF
            res.render("business_multiple_fcmf");
        } else if (req.body.customer.organization.taxId == "923751967") {
            //GROUPED INDUSTRIES CORPORATION
            //Business COMPLEX OFAC
            res.render("business_multiple_ofac");
        } else if (req.body.customer.organization.taxId == "445601764") {
            //BILLMAN HOME CENTER
            //Business MULTIPLE Neg
            res.render("business_multiple_neg");
        } else {
            var biz = {
                "customers": {
                    "customer": [{
                        "customerType": "Business",
                        "organization": {
                            "name": req.body.customer.organization.name,
                            "taxId": req.body.customer.organization.taxId
                        },
                        "phoneNumbers": [{
                            "phoneNumber": req.body.customer.phoneNumbers[0].phoneNumber,
                            "phoneType": req.body.customer.phoneNumbers[0].phoneType.toUpperCase()
                        }],
                        "commonCustomerId": makeid(),
                        "status": "N",
                        "notes": [{
                            "noteType": "NEWCUSTOMER",
                            "content": "TRUE"
                        }],
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": req.body.customer.addresses[0].addressLine1,
                                    "addressLine2": req.body.customer.addresses[0].addressLine2,
                                    "cityName": req.body.customer.addresses[0].cityName,
                                    "stateCode": req.body.customer.addresses[0].stateCode,
                                    "zip": req.body.customer.addresses[0].zip
                                }
                            }]
                        }
                    }]
                }
            }
    
            res.json(biz);
        }
    } else if (req.body.customer.customerType.toUpperCase() == "PERSONAL GUARANTOR") {
        if (req.body.customer.organization.taxId == "112233123") {
            //PG 1 CMF LLC
            //PGCMFONE PGCMFONE
            //Personal Guarantor SINGLE CMF
            res.render("PG_single_cmf");
        } else if (req.body.customer.organization.taxId == "112233001") {
            //PG 1 FCMF LLC
            //PGFCMFONE PGFCMFONE
            //Personal Guarantor SINGLE FCMF
            res.render("PG_single_fcmf");
        } else if (req.body.customer.organization.taxId == "382909432") {
            //BLAIR CEDAR & NOVELTY WORKS, INC
            //BARRY MORDAN
            //Personal Guarantor SIMPLE OFAC
            res.render("PG_single_ofac");
        } else if (req.body.customer.organization.taxId == "112233004") {
            //PG 1 NEG LLC
            //PGNEGONE PGNEGONE
            //Personal Guarantor Single Neg
            res.render("PG_single_neg");
        } else if (req.body.customer.organization.taxId == "112233121") {
            //PG Multiple CMF-1 LLC
            //PGCMFMULTIPLE PGCMFMULTIPLE
            //Personal Guarantor MULTIPLE CMF
            res.render("PG_multiple_cmf");
        } else if (req.body.customer.organization.taxId == "112233002") {
            //PG Multiple FCMF-1 LLC
            //PGFCMFMULTIPLE PGFCMFMULTIPLE
            //Personal Guarantor MULTIPLE FCMF
            res.render("PG_multiple_fcmf");
        } else if (req.body.customer.organization.taxId == "112233006") {
            //PG OFAC Detailed LLC
            //Cristian David GONZALEZ MEJIA
            //Personal Guarantor COMPLEX OFAC
            res.render("PG_multiple_ofac");
        } else if (req.body.customer.organization.taxId == "112233005") {
            //PG Multiple NEG-1 LLC
            //PGNEGMULTIPLE PGNEGMULTIPLE
            //Personal Guarantor MULTIPLE Neg
            res.render("PG_multiple_neg");
        } else {
            var pg = {
                "customers": {
                    "customer": [{
                        "customerType": "Business",
                        "organization": {
                            "name": req.body.customer.organization.name,
                            "taxId": req.body.customer.organization.taxId
                        },
                        "commonCustomerId": makeid(),
                        "status": "N",
                        "notes": [{
                            "noteType": "NEWCUSTOMER",
                            "content": "TRUE"
                        }]
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": req.body.customer.firstName,
                        "familyName": req.body.customer.familyname,
                        "dateOfBirth": req.body.customer.dateOfBirth,
                        "phoneNumbers": [{
                            "phoneNumber": req.body.customer.phoneNumbers[0].phoneNumber,
                            "phoneType": req.body.customer.phoneNumbers[0].phoneType.toUpperCase()
                        }],
                        "commonCustomerId": makeid(),
                        "status": "N",
                        "notes": [{
                            "noteType": "NEWCUSTOMER",
                            "content": "TRUE"
                        }],
                        "ssn": req.body.customer.ssn
                    }]
                }
            };
    
            res.json(pg);
        }
    } else {
        res.json({
            "error": "Customer Type not recognised"
        });
    }
   }
});


Sandbox.define('/core/v2/users/','GET', function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    if (req.query.userid == "4315536" || req.query.dealercode == "4315536") {
        res.json({
            "users": {
                "user": [{
                    "dealerCode": "4315536",
                    "masterDealerCode": "4315536",
                    "dealerName": "TEST",
                    "dealerGroupNames": [
                        "OES_RPS_BASIC"
                    ],
                    "brand": "UVM",
                    "rsaTokenCount": 3,
                    "creditChannelCodes": [
                        "330"
                    ],
                    "stores": {
                        "store": [{
                            "businessPhones": [{
                                "phoneType": "BUSINESS",
                                "phoneNumber": "Required Field"
                            }]
                        }]
                    },
                    "provisionedDate": "2014-04-24",
                    "enabledForTAM": "N",
                    "manager": {
                        "userId": "XELSYSADM"
                    },
                    "brightPointDealerId": "0560575",
                    "dealerStatus": "A",
                    "firstName": "Required Field",
                    "userId": "MIDTOSYNY16"
                }]
            }
        });
    } else if (req.query.userid == "1610027" || req.query.dealercode == "1610027") {
        res.json({
            "users": {
                "user": [{
                    "dealerCode": "1610027",
                    "masterDealerCode": "1610027",
                    "dealerName": "QA Test Dealer",
                    "dealerGroupNames": [
                        "OES_RPS_BASIC"
                    ],
                    "brand": "UVM",
                    "rsaTokenCount": 3,
                    "creditChannelCodes": [
                        "330"
                    ],
                    "stores": {
                        "store": [{
                            "businessPhones": [{
                                "phoneType": "BUSINESS",
                                "phoneNumber": "Required Field"
                            }]
                        }]
                    },
                    "provisionedDate": "2014-04-24",
                    "enabledForTAM": "N",
                    "manager": {
                        "userId": "XELSYSADM"
                    },
                    "brightPointDealerId": "0560575",
                    "dealerStatus": "A",
                    "firstName": "Required Field",
                    "userId": "MIDTOSYNY16"
                }]
            }
        });
    } else {
        res.json({
            "error": "Test dealercode not found, use 4315536"
        });
    }
    // Send the response body.
})


Sandbox.define('/core/v2/customers', 'POST', function(req, res){
    // The URL has to have a / at the end because reasons
        res.type('application/json');
        return res.send(301, '{"Error":"Change your Customers URL to have a / at the end."}');
})


Sandbox.define('/core/v2/users', 'GET', function(req, res){
    // The URL has to have a / at the end because reasons
        res.type('application/json');
        return res.send(301, '{"Error":"Change your Users URL to have a / at the end."}');
})


Sandbox.define('/core/v2/customers/{customerid}/creditprofile', 'PUT', function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    
    
    var CID = req.params.customerid
    
    
    if(CID=="1234")
    {
        res.status(404);
        res.json({
            "errors":{
                "error":[
                    {
                        "code": "1",
                        "userMessage": "2",
                        "systemMessage": "3" 
                    }]
                }
        });
    }
    else{
        res.status(204);
        res.json(
            {
                "status": "ok"
            }
        );
    }
    
    
        
})

Sandbox.define('/core/v2/customers//creditprofile','PUT', function(req, res){
    //THIS SERVICE IS ONLY USED TO CAPTURE AND RESPOND TO BAD CCIDs
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(400);
    
    // Send the response body.
    res.json({
        "error": "Your did not pass the CCID in the URL."
    });
})