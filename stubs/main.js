/**
 * My API Sandbox
 * 
 */
 
state.application = state.application || {};
var applicationMap = state.application;
 
 
//The predefined maps are in the util script
var utils = require('./utils.js');
var dynamicAssign = require('./dynamicAssign.js');
 
function makeid()
{
    var text = "";
    var possible = "0123456789";

    text = possible.charAt(Math.floor(Math.random() * possible.length));
    text += "-";

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
    
    //see if we already have an entry
    var application = applicationMap[IDKey];
    
    //if we don't have an existing application make the determination with what to respond
    if (!application) { 
        //Gnerate a stateful store of the created CCID and (currently) keep a copy of the req 
        applicationMap[IDKey] = { "custGeneratedCCID": makeid(),
                                    "bizGeneratedCCID": makeid(),
                                    "responseTemplate":"",
                                    "nextResponseTemplate":"",
                                    "responseBody":"",
                                    "reqBody":req.body,
                                    "predefinedResponseFound":false,
                                    "error":false,
                                    "responseTypes":{
                                        "newClean":false,
                                        "cmf":false,
                                        "fcmf":false,
                                        "ofac":false,
                                        "neg":false
                                    }
        };
        
        //Hand the request off to the if block that determines if this is a known test case and needs a specific response
        utils.determinePredefinedResponse(IDKey, req);
        
        
        if(applicationMap[IDKey].predefinedResponseFound === false)
        {
            //We didn't find a known test case so let's dynamically pick what the response should be
            dynamicAssign.dynamicAssign(IDKey, req);
        }
    }
    
    
    if(applicationMap[IDKey].error===true)
    {
        //We hit an error so lets send it back
        res.json({
            "error": applicationMap[IDKey].errorMessage
        });
    }
    else if(applicationMap[IDKey].predefinedResponseFound === true)
    {
        //We found a template we are going to use so let's send that
        res.render(applicationMap[IDKey].responseTemplate,applicationMap[IDKey]);
        //We have sent the response so lets see if we need to assign a next response
    }
    else
    {
        res.json(applicationMap[IDKey].responseBody);
    }
    
    //If we specified the next response for this customer should use a template lets bring that live and make sure template response flag is enables
    if(applicationMap[IDKey].nextResponseTemplate!=="")
        {
            applicationMap[IDKey].predefinedResponseFound = true;
            applicationMap[IDKey].responseTemplate = applicationMap[IDKey].nextResponseTemplate;
            applicationMap[IDKey].nextResponseTemplate = "";
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
    } else if (req.query.userid == "1000002" || req.query.dealercode == "1000002") {
        res.json({
            "users": {
                "user": [{
                    "dealerCode": "1000002",
                    "masterDealerCode": "1000002",
                    "dealerName": "QA Test Dealer",
                    "dealerGroupNames": [
                        "OES_RPS_BASIC"
                    ],
                    "brand": "UVM",
                    "rsaTokenCount": 3,
                    "creditChannelCodes": [
                        "260"
                    ],
                    "stores": {
                        "store": [{
                            "businessPhones": [{
                                "phoneType": "BUSINESS",
                                "phoneNumber": "Required Field"
                            }]
                        }]
                    },
                    "provisionedDate": "2016-05-24",
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
    } else if (req.query.userid == "1767933" || req.query.dealercode == "1767933") {
        res.json({
      "users": {
        "user": [
          {
            "dealerCode": "1767933",
            "dealerName": "Merida Reyes-castro",
            "creditChannelCodes": [
              "410"
            ],
            "contractTypes": [
              "DIRECT"
            ],
            "dealerStatus": "Active"
          }
        ]
      }
    });
        
    } else {
        res.json({
            "error": "Test dealercode not found, use 4315536"
        });
    }
    // Send the response body.
});


Sandbox.define('/core/v2/customers', 'POST', function(req, res){
    // The URL has to have a / at the end because reasons
        res.type('application/json');
        return res.send(301, '{"Error":"Change your Customers URL to have a / at the end."}');
});


Sandbox.define('/core/v2/users', 'GET', function(req, res){
    // The URL has to have a / at the end because reasons
        res.type('application/json');
        return res.send(301, '{"Error":"Change your Users URL to have a / at the end."}');
});


Sandbox.define('/core/v2/customers/{customerid}/creditprofile', 'PUT', function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    
    
    var CID = req.params.customerid;
    
    
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