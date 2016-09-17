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
    applicationMap[IDKey] = { "custGeneratedCCID": makeid(),
                                "bizGeneratedCCID": makeid(),
                                "reqBody":req.body,
                                "predefinedResponseFound":false
    };
    
    //Had the request off to the if block that determines if this is a known test case and needs a specific response
    utils.determinePredefinedResponse(IDKey, req);

    
   if(applicationMap[IDKey].predefinedResponseFound === false)
   {
       dynamicAssign.dynamicAssign(IDKey, req);
    }
   res.render(applicationMap[IDKey].responseTemplate,applicationMap[IDKey]);
   
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