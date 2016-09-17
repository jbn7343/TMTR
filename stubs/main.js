/**
 * My API Sandbox
 * 
 */
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
            res.render("business_single_cmf");
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
            res.json({
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
                        "organization": {
                            "name": "PG 1 CMF LLC",
                            "taxId": "112233123"
                        },
                        "commonCustomerId": "1-4X0BN",
                        "status": "Y",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "1 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "395624351",
                                "status": "O",
                                "statusChangeDate": "09/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "businessName": "PG 1 CMF LLC",
                                "taxID": "112233123",
                                "contactAddress": {
                                    "addressLine1": "1 Test Dr",
                                    "addressLine2": "11",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2016",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "CMF"
                                }]
                            }]
                        }
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": "PGCMFONE",
                        "familyName": "PGCMFONE",
                        "dateOfBirth": "09/09/1979",
                        "commonCustomerId": "1-4X0IS",
                        "status": "Y",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "1111 Test Dr",
                                    "addressLine2": "Apt 2",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "395624351",
                                "status": "O",
                                "statusChangeDate": "09/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "contactAddress": {
                                    "addressLine1": "1111 Test Dr",
                                    "addressLine2": "Apt 2",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2016",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "CMF"
                                }]
                            }]
                        },
                        "ssn": "101199991"
                    }]
                }
            });
        } else if (req.body.customer.organization.taxId == "112233001") {
            //PG 1 FCMF LLC
            //PGFCMFONE PGFCMFONE
            //Personal Guarantor SINGLE FCMF
            res.json({
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
                        "organization": {
                            "name": "PG 1 FCMF LLC",
                            "taxId": "112233001"
                        },
                        "commonCustomerId": "1-4X0BN",
                        "status": "N",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "1 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "843230900",
                                "status": "N",
                                "statusChangeDate": "01/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "businessName": "PG 1 FCMF LLC",
                                "contactAddress": {
                                    "addressLine1": "1 Test Dr",
                                    "addressLine2": "#1",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2001",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "FCMF"
                                }]
                            }]
                        }
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": "PGFCMFONE",
                        "familyName": "PGFCMFONE",
                        "dateOfBirth": "09/09/1979",
                        "commonCustomerId": "1-4X0J9",
                        "status": "Y",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "1111 Test Dr",
                                    "addressLine2": "Apt 2",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "843230900",
                                "status": "N",
                                "statusChangeDate": "01/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "contactAddress": {
                                    "addressLine1": "1111 Test Dr",
                                    "addressLine2": "Apt 2",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2001",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "FCMF"
                                }]
                            }]
                        },
                        "negativeAccount": [{
                            "accountNumber": "843230900",
                            "status": "N",
                            "statusChangeDate": "08/01/2003",
                            "accountType": "I",
                            "accountSubType": "R",
                            "contactFirstName": "JOHN",
                            "contactFamilyName": "WHEAT",
                            "contactAddress": {
                                "addressLine1": "3307 ADELAIDE WY",
                                "cityName": "BELMONT",
                                "stateCode": "CA",
                                "zip": "94002"
                            },
                            "linesCount": 2,
                            "availableBalance": 100,
                            "serviceStartDate": "09/02/2003",
                            "billCycle": "5",
                            "phoneNumbers": [{
                                "phoneNumber": "4048034662",
                                "phoneType": "HOME"
                            }],
                            "newAccountIndicator": true,
                            "submarketCode": "SAT",
                            "submarketName": "SAN ANTONIO TX",
                            "statusReasonCode": "FACM",
                            "paymentLastDate": "12/03/2003",
                            "paymentLastAmount": 100,
                            "birthDate": "04/07/1955",
                            "identificationNumber": "10737449",
                            "identificationState": "TX",
                            "taxId": "0",
                            "writeOffDate": "10/07/2002",
                            "creditClass": "B",
                            "statusActivityCode": "CAN",
                            "statusActivityReason": "FACM",
                            "equipmentCreditLimit": 0,
                            "negativeFiles": [{
                                "negativeFileId": "10000001",
                                "marketCode": "VST",
                                "agencyCode": "VST",
                                "assignedDate": "06/01/2015",
                                "activityDate": "06/01/2015",
                                "activityAmount": "100",
                                "activityType": "ASSN"
                            }],
                            "personalGuarantor": {},
                            "ssn": "666713265"
                        }],
                        "ssn": "101199993"
                    }]
                }
            });
        } else if (req.body.customer.organization.taxId == "382909432") {
            //BLAIR CEDAR & NOVELTY WORKS, INC
            //BARRY MORDAN
            //Personal Guarantor SIMPLE OFAC
            res.json({
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
                        "organization": {
                            "name": "BLAIR CEDAR & NOVELTY WORKS, INC",
                            "taxId": "382909432"
                        },
                        "phoneNumbers": [{
                            "phoneNumber": "5733462235",
                            "phoneType": "BUSINESS"
                        }],
                        "commonCustomerId": "1-42124",
                        "status": "N",
                        "jurisdictionActions": [{
                            "sanctionFlag": true,
                            "sanctionDate": "08/06/2018",
                            "userName": "SADMINU2"
                        }],
                        "marketCode": "STM",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "680 W US HIGHWAY 54",
                                    "cityName": "CAMDENTON",
                                    "stateCode": "MO",
                                    "zip": "65020"
                                }
                            }]
                        }
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": "BARRY",
                        "middleName": "A",
                        "familyName": "MORDAN",
                        "title": "..",
                        "dateOfBirth": "09/09/1979",
                        "phoneNumbers": [{
                            "phoneNumber": "555-555-5567",
                            "phoneType": "HOME"
                        }],
                        "commonCustomerId": "1-421J5",
                        "status": "Y",
                        "jurisdictionActions": [{
                            "sanctionFlag": true,
                            "sanctionDate": "08/06/2018",
                            "userName": "SADMINU2"
                        }],
                        "ssn": "666544500"
                    }]
                }
            });
        } else if (req.body.customer.organization.taxId == "112233004") {
            //PG 1 NEG LLC
            //PGNEGONE PGNEGONE
            //Personal Guarantor Single Neg
            res.json({
  "customers": {
    "customer": [
      {
        "customerType": "Business",
        "organization": {
          "name": "PG 1 NEG LLC",
          "taxId": "112233004"
        },
        "commonCustomerId": "1-4X0BN",
        "status": "N",
        "notes": [
          {
            "noteType": "NEWCUSTOMER",
            "content": "TRUE"
          }
        ],
        "marketCode": "SEW",
        "accounts": {
          "account": [
            {
              "contactAddress": {
                "addressLine1": "1 Test Dr",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              }
            },
            {
              "accountNumber": "100120011",
              "status": "N",
              "statusChangeDate": "01/01/2016",
              "accountType": "B",
              "accountsubType": "L",
              "businessName": "PG 1 NEG LLC",
              "contactAddress": {
                "addressLine1": "1 Test Dr",
                "addressLine2": "Bellevue",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              },
              "serviceStartDate": "01/01/2001",
              "notes": [
                {
                  "noteType": "CUSTOMERSTATUS",
                  "content": "FCMF"
                }
              ]
            }
          ]
        },
        "negativeAccount": [
          {
            "accountNumber": "100120011",
            "status": "N",
            "statusChangeDate": "13/08/2002",
            "accountType": "I",
            "accountSubType": "R",
            "contactFirstName": "JOHN",
            "contactFamilyName": "WHEAT",
            "contactAddress": {
              "addressLine1": "3307 ADELAIDE WY",
              "cityName": "BELMONT",
              "stateCode": "CA",
              "zip": "94002"
            },
            "linesCount": 2,
            "availableBalance": 100,
            "serviceStartDate": "26/09/2001",
            "billCycle": "5",
            "earlyTerminationFee": 0,
            "phoneNumbers": [
              {
                "phoneNumber": "4048034662",
                "phoneType": "HOME"
              }
            ],
            "newAccountIndicator": true,
            "submarketCode": "SAT",
            "submarketName": "SAN ANTONIO TX",
            "statusReasonCode": "FACM",
            "paymentLastDate": "03/12/2003",
            "paymentLastAmount": 100,
            "birthDate": "07/04/1955",
            "identificationNumber": "10737449",
            "identificationState": "TX",
            "taxId": "0",
            "writeOffDate": "07/10/2002",
            "creditClass": "B",
            "statusActivityCode": "CAN",
            "statusActivityReason": "FACM",
            "negativeFiles": [
              {
                "negativeFileId": "10000001",
                "marketCode": "VST",
                "agencyCode": "VST",
                "assignedDate": "13/06/2014",
                "activityDate": "13/06/2014",
                "activityAmount": "100",
                "activityType": "ASSN"
              }
            ],
            "ssn": "666713265"
          }
        ]
      },
      {
        "customerType": "Personal Guarantor",
        "firstName": "PGNEGONE",
        "familyName": "PGNEGONE",
        "dateOfBirth": "21/09/1978",
        "commonCustomerId": "1-4X0JQ",
        "status": "N",
        "accounts": {
          "account": [
            {
              "accountNumber": "100120011",
              "status": "N",
              "statusChangeDate": "01/01/2016",
              "accountType": "B",
              "accountsubType": "L",
              "contactAddress": {
                "addressLine1": "1 Test Dr",
                "addressLine2": "Bellevue",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              },
              "serviceStartDate": "01/01/2001",
              "notes": [
                {
                  "noteType": "CUSTOMERSTATUS",
                  "content": "FCMF"
                }
              ]
            }
          ]
        },
        "negativeAccount": [
          {
            "accountNumber": "100120011",
            "status": "N",
            "statusChangeDate": "13/08/2002",
            "accountType": "I",
            "accountSubType": "R",
            "contactFirstName": "JOHN",
            "contactFamilyName": "WHEAT",
            "contactAddress": {
              "addressLine1": "3307 ADELAIDE WY",
              "cityName": "BELMONT",
              "stateCode": "CA",
              "zip": "94002"
            },
            "linesCount": 2,
            "availableBalance": 100,
            "serviceStartDate": "26/09/2001",
            "billCycle": "5",
            "phoneNumbers": [
              {
                "phoneNumber": "4048034662",
                "phoneType": "HOME"
              }
            ],
            "newAccountIndicator": true,
            "submarketCode": "SAT",
            "submarketName": "SAN ANTONIO TX",
            "statusReasonCode": "FACM",
            "paymentLastDate": "03/12/2003",
            "paymentLastAmount": 100,
            "birthDate": "07/04/1955",
            "identificationNumber": "10737449",
            "identificationState": "TX",
            "taxId": "0",
            "writeOffDate": "07/10/2002",
            "creditClass": "B",
            "statusActivityCode": "CAN",
            "statusActivityReason": "FACM",
            "equipmentCreditLimit": 0,
            "negativeFiles": [
              {
                "negativeFileId": "10000001",
                "marketCode": "VST",
                "agencyCode": "VST",
                "assignedDate": "13/06/2014",
                "activityDate": "13/06/2014",
                "activityAmount": "100",
                "activityType": "ASSN"
              }
            ],
            "personalGuarantor": {},
            "ssn": "666713265"
          }
        ],
        "ssn": "101199995"
      }
    ]
  }
});
        } else if (req.body.customer.organization.taxId == "112233121") {
            //PG Multiple CMF-1 LLC
            //PGCMFMULTIPLE PGCMFMULTIPLE
            //Personal Guarantor MULTIPLE CMF
            res.json({
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
                        "organization": {
                            "name": "PG Multiple CMF-1 LLC",
                            "taxId": "112233121"
                        },
                        "commonCustomerId": "1-4X0CD",
                        "status": "Y",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "2 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "298374756",
                                "status": "O",
                                "statusChangeDate": "09/05/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "businessName": "PG Multiple CMF-1 LLC",
                                "taxID": "112233121",
                                "contactAddress": {
                                    "addressLine1": "2 Test Dr",
                                    "addressLine2": "12",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2009",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "CMF"
                                }]
                            }]
                        }
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": "PGCMFMULTIPLE",
                        "familyName": "PGCMFMULTIPLE",
                        "dateOfBirth": "09/09/1979",
                        "commonCustomerId": "1-4X0K7",
                        "status": "Y",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "1111 Test Dr",
                                    "addressLine2": "Apt 2",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "298374756",
                                "status": "O",
                                "statusChangeDate": "09/05/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "contactAddress": {
                                    "addressLine1": "2 Test Dr",
                                    "addressLine2": "12",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2009",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "CMF"
                                }]
                            }, {
                                "accountNumber": "298374755",
                                "status": "O",
                                "statusChangeDate": "09/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "contactAddress": {
                                    "addressLine1": "2-1 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2010",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "CMF"
                                }]
                            }]
                        },
                        "ssn": "101199992"
                    }]
                }
            });
        } else if (req.body.customer.organization.taxId == "112233002") {
            //PG Multiple FCMF-1 LLC
            //PGFCMFMULTIPLE PGFCMFMULTIPLE
            //Personal Guarantor MULTIPLE FCMF
            res.json({
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
                        "organization": {
                            "name": "PG Multiple FCMF-1 LLC",
                            "taxId": "112233002"
                        },
                        "commonCustomerId": "1-4X0FJ",
                        "status": "N",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "2 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }, {
                                "accountNumber": "792567122",
                                "status": "N",
                                "statusChangeDate": "01/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "businessName": "PG Multiple FCMF-1 LLC",
                                "contactAddress": {
                                    "addressLine1": "2 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2011",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "FCMF"
                                }]
                            }]
                        }
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": "PGFCMFMULTIPLE",
                        "familyName": "PGFCMFMULTIPLE",
                        "dateOfBirth": "09/09/1979",
                        "commonCustomerId": "1-4YA37",
                        "status": "Y",
                        "accounts": {
                            "account": [{
                                "accountNumber": "792567122",
                                "status": "N",
                                "statusChangeDate": "01/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "contactAddress": {
                                    "addressLine1": "2 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2011",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "FCMF"
                                }]
                            }, {
                                "accountNumber": "792567123",
                                "status": "N",
                                "statusChangeDate": "01/01/2016",
                                "accountType": "B",
                                "accountsubType": "L",
                                "contactAddress": {
                                    "addressLine1": "2-1 Test Dr",
                                    "addressLine2": "123",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                },
                                "serviceStartDate": "01/01/2016",
                                "notes": [{
                                    "noteType": "CUSTOMERSTATUS",
                                    "content": "FCMF"
                                }]
                            }]
                        },
                        "negativeAccount": [{
                            "accountNumber": "792567122",
                            "status": "N",
                            "statusChangeDate": "08/01/2003",
                            "accountType": "I",
                            "accountSubType": "R",
                            "contactFirstName": "JOHN",
                            "contactFamilyName": "WHEAT",
                            "contactAddress": {
                                "addressLine1": "3307 ADELAIDE WY",
                                "cityName": "BELMONT",
                                "stateCode": "CA",
                                "zip": "94002"
                            },
                            "linesCount": 2,
                            "availableBalance": 100,
                            "serviceStartDate": "09/02/2003",
                            "billCycle": "5",
                            "phoneNumbers": [{
                                "phoneNumber": "4048034662",
                                "phoneType": "HOME"
                            }],
                            "newAccountIndicator": true,
                            "submarketCode": "SAT",
                            "submarketName": "SAN ANTONIO TX",
                            "statusReasonCode": "FACM",
                            "paymentLastDate": "12/03/2003",
                            "paymentLastAmount": 100,
                            "birthDate": "04/07/1955",
                            "identificationNumber": "10737449",
                            "identificationState": "TX",
                            "taxId": "0",
                            "writeOffDate": "10/07/2002",
                            "creditClass": "B",
                            "statusActivityCode": "CAN",
                            "statusActivityReason": "FACM",
                            "equipmentCreditLimit": 0,
                            "negativeFiles": [{
                                "negativeFileId": "10000002",
                                "marketCode": "VST",
                                "agencyCode": "VST",
                                "assignedDate": "06/01/2015",
                                "activityDate": "06/01/2015",
                                "activityAmount": "100",
                                "activityType": "ASSN"
                            }],
                            "personalGuarantor": {},
                            "ssn": "666713265"
                        }, {
                            "accountNumber": "792567123",
                            "status": "N",
                            "statusChangeDate": "08/01/2003",
                            "accountType": "I",
                            "accountSubType": "R",
                            "contactFirstName": "JOHN",
                            "contactFamilyName": "WHEAT",
                            "contactAddress": {
                                "addressLine1": "3307 ADELAIDE WY",
                                "cityName": "BELMONT",
                                "stateCode": "CA",
                                "zip": "94002"
                            },
                            "linesCount": 2,
                            "availableBalance": 100,
                            "serviceStartDate": "09/02/2003",
                            "billCycle": "5",
                            "phoneNumbers": [{
                                "phoneNumber": "4048034662",
                                "phoneType": "HOME"
                            }],
                            "newAccountIndicator": true,
                            "submarketCode": "SAT",
                            "submarketName": "SAN ANTONIO TX",
                            "statusReasonCode": "FACM",
                            "paymentLastDate": "12/03/2003",
                            "paymentLastAmount": 100,
                            "birthDate": "04/07/1955",
                            "identificationNumber": "10737449",
                            "identificationState": "TX",
                            "taxId": "0",
                            "writeOffDate": "10/07/2002",
                            "creditClass": "B",
                            "statusActivityCode": "CAN",
                            "statusActivityReason": "FACM",
                            "equipmentCreditLimit": 0,
                            "negativeFiles": [{
                                "negativeFileId": "10000003",
                                "marketCode": "VST",
                                "agencyCode": "VST",
                                "assignedDate": "06/01/2015",
                                "activityDate": "06/01/2015",
                                "activityAmount": "100",
                                "activityType": "ASSN"
                            }],
                            "personalGuarantor": {},
                            "ssn": "666713265"
                        }],
                        "ssn": "101199994"
                    }]
                }
            });
        } else if (req.body.customer.organization.taxId == "112233006") {
            //PG OFAC Detailed LLC
            //Cristian David GONZALEZ MEJIA
            //Personal Guarantor COMPLEX OFAC
            res.json({
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
                        "organization": {
                            "name": "PG OFAC Detailed LLC",
                            "taxId": "112233006"
                        },
                        "commonCustomerId": "1-4X0I2",
                        "status": "N",
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "1 Test Dr",
                                    "cityName": "Bellevue",
                                    "stateCode": "WA",
                                    "zip": "98006"
                                }
                            }]
                        }
                    }, {
                        "customerType": "Personal Guarantor",
                        "firstName": "Cristian David",
                        "familyName": "GONZALEZ MEJIA",
                        "dateOfBirth": "09/09/1979",
                        "phoneNumbers": [{
                            "phoneNumber": "3605685555",
                            "phoneType": "HOME"
                        }],
                        "commonCustomerId": "1-4S3QF",
                        "status": "Y",
                        "jurisdictionActions": [{
                            "sanctionFlag": true,
                            "sanctionDate": "09/01/2017",
                            "watchLists": [{
                                "alertId": "SEN-242",
                                "caseKey": "OWS-201609-131227-C5F00B-IND",
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
                                "alertId": "SEN-242",
                                "caseKey": "OWS-201609-131227-C5F00B-IND",
                                "city": "Basel",
                                "country": "CH",
                                "familyName": "GONZALEZ MEJIA",
                                "fullName": "CRISTIAN DAVID GONZALEZ MEJIA",
                                "givenName": "CRISTIAN DAVID",
                                "key": "OFAC",
                                "subKey": "OFAC-SDN",
                                "matchRule": "[I010O] Exact name only",
                                "matchScore": "85",
                                "nameType": "Primary",
                                "vendorId": "18376",
                                "primaryName": "Cristian David GONZALEZ MEJIA",
                                "recordOrigin": "OFAC-SDN",
                                "recordType": "SAN",
                                "riskScore": "76"
                            }],
                            "userName": "SADMINU2"
                        }],
                        "marketCode": "SEW",
                        "accounts": {
                            "account": [{
                                "contactAddress": {
                                    "addressLine1": "61 PINE AVE # 2",
                                    "cityName": "SNOHOMISH",
                                    "stateCode": "WA",
                                    "zip": "98290"
                                }
                            }]
                        },
                        "ssn": "753234567"
                    }]
                }
            });
        } else if (req.body.customer.organization.taxId == "112233005") {
            //PG Multiple NEG-1 LLC
            //PGNEGMULTIPLE PGNEGMULTIPLE
            //Personal Guarantor MULTIPLE Neg
            res.json({
  "customers": {
    "customer": [
      {
        "customerType": "Business",
        "organization": {
          "name": "PG Multiple NEG-1 LLC",
          "taxId": "112233005"
        },
        "commonCustomerId": "1-4X0BN",
        "status": "N",
        "notes": [
          {
            "noteType": "NEWCUSTOMER",
            "content": "TRUE"
          }
        ],
        "marketCode": "SEW",
        "accounts": {
          "account": [
            {
              "contactAddress": {
                "addressLine1": "2 Test Dr",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              }
            },
            {
              "accountNumber": "100120012",
              "status": "N",
              "statusChangeDate": "01/01/2016",
              "accountType": "B",
              "accountsubType": "L",
              "businessName": "PG Multiple NEG-1 LLC",
              "contactAddress": {
                "addressLine1": "2 Test Dr",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              },
              "serviceStartDate": "01/01/2006",
              "notes": [
                {
                  "noteType": "CUSTOMERSTATUS",
                  "content": "FCMF"
                }
              ]
            }
          ]
        },
        "negativeAccount": [
          {
            "accountNumber": "100120012",
            "status": "N",
            "statusChangeDate": "13/08/2002",
            "accountType": "I",
            "accountSubType": "R",
            "contactFirstName": "JOHN",
            "contactFamilyName": "WHEAT",
            "contactAddress": {
              "addressLine1": "3307 ADELAIDE WY",
              "cityName": "BELMONT",
              "stateCode": "CA",
              "zip": "94002"
            },
            "linesCount": 2,
            "availableBalance": 100,
            "serviceStartDate": "26/09/2001",
            "billCycle": "5",
            "earlyTerminationFee": 0,
            "phoneNumbers": [
              {
                "phoneNumber": "4048034662",
                "phoneType": "HOME"
              }
            ],
            "newAccountIndicator": true,
            "submarketCode": "SAT",
            "submarketName": "SAN ANTONIO TX",
            "statusReasonCode": "FACM",
            "paymentLastDate": "03/12/2003",
            "paymentLastAmount": 100,
            "birthDate": "07/04/1955",
            "identificationNumber": "10737449",
            "identificationState": "TX",
            "taxId": "0",
            "writeOffDate": "07/10/2002",
            "creditClass": "B",
            "statusActivityCode": "CAN",
            "statusActivityReason": "FACM",
            "negativeFiles": [
              {
                "negativeFileId": "10000002",
                "marketCode": "VST",
                "agencyCode": "VST",
                "assignedDate": "13/06/2014",
                "activityDate": "13/06/2014",
                "activityAmount": "100",
                "activityType": "ASSN"
              }
            ],
            "ssn": "666713265"
          }
        ]
      },
      {
        "customerType": "Personal Guarantor",
        "firstName": "PGNEGMULTIPLE",
        "familyName": "PGNEGMULTIPLE",
        "dateOfBirth": "21/09/1978",
        "commonCustomerId": "1-4X0LY",
        "status": "N",
        "accounts": {
          "account": [
            {
              "accountNumber": "100120012",
              "status": "N",
              "statusChangeDate": "01/01/2016",
              "accountType": "B",
              "accountsubType": "L",
              "contactAddress": {
                "addressLine1": "2 Test Dr",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              },
              "serviceStartDate": "01/01/2006",
              "notes": [
                {
                  "noteType": "CUSTOMERSTATUS",
                  "content": "FCMF"
                }
              ]
            },
            {
              "accountNumber": "100120013",
              "status": "N",
              "statusChangeDate": "01/01/2009",
              "accountType": "B",
              "accountsubType": "L",
              "contactAddress": {
                "addressLine1": "2-1 Test Dr",
                "cityName": "Bellevue",
                "stateCode": "WA",
                "zip": "98006"
              },
              "serviceStartDate": "01/01/2007",
              "notes": [
                {
                  "noteType": "CUSTOMERSTATUS",
                  "content": "FCMF"
                }
              ]
            }
          ]
        },
        "negativeAccount": [
          {
            "accountNumber": "100120012",
            "status": "N",
            "statusChangeDate": "13/08/2002",
            "accountType": "I",
            "accountSubType": "R",
            "contactFirstName": "JOHN",
            "contactFamilyName": "WHEAT",
            "contactAddress": {
              "addressLine1": "3307 ADELAIDE WY",
              "cityName": "BELMONT",
              "stateCode": "CA",
              "zip": "94002"
            },
            "linesCount": 2,
            "availableBalance": 100,
            "serviceStartDate": "26/09/2001",
            "billCycle": "5",
            "phoneNumbers": [
              {
                "phoneNumber": "4048034662",
                "phoneType": "HOME"
              }
            ],
            "newAccountIndicator": true,
            "submarketCode": "SAT",
            "submarketName": "SAN ANTONIO TX",
            "statusReasonCode": "FACM",
            "paymentLastDate": "03/12/2003",
            "paymentLastAmount": 100,
            "birthDate": "07/04/1955",
            "identificationNumber": "10737449",
            "identificationState": "TX",
            "taxId": "0",
            "writeOffDate": "07/10/2002",
            "creditClass": "B",
            "statusActivityCode": "CAN",
            "statusActivityReason": "FACM",
            "equipmentCreditLimit": 0,
            "negativeFiles": [
              {
                "negativeFileId": "10000002",
                "marketCode": "VST",
                "agencyCode": "VST",
                "assignedDate": "13/06/2014",
                "activityDate": "13/06/2014",
                "activityAmount": "100",
                "activityType": "ASSN"
              }
            ],
            "personalGuarantor": {},
            "ssn": "666713265"
          },
          {
            "accountNumber": "100120013",
            "status": "N",
            "statusChangeDate": "13/08/2002",
            "accountType": "I",
            "accountSubType": "R",
            "contactFirstName": "JOHN",
            "contactFamilyName": "WHEAT",
            "contactAddress": {
              "addressLine1": "3307 ADELAIDE WY",
              "cityName": "BELMONT",
              "stateCode": "CA",
              "zip": "94002"
            },
            "linesCount": 2,
            "availableBalance": 100,
            "serviceStartDate": "26/09/2001",
            "billCycle": "5",
            "phoneNumbers": [
              {
                "phoneNumber": "4048034662",
                "phoneType": "HOME"
              }
            ],
            "newAccountIndicator": true,
            "submarketCode": "SAT",
            "submarketName": "SAN ANTONIO TX",
            "statusReasonCode": "FACM",
            "paymentLastDate": "03/12/2003",
            "paymentLastAmount": 100,
            "birthDate": "07/04/1955",
            "identificationNumber": "10737449",
            "identificationState": "TX",
            "taxId": "0",
            "writeOffDate": "07/10/2002",
            "creditClass": "B",
            "statusActivityCode": "CAN",
            "statusActivityReason": "FACM",
            "equipmentCreditLimit": 0,
            "negativeFiles": [
              {
                "negativeFileId": "10000003",
                "marketCode": "VST",
                "agencyCode": "VST",
                "assignedDate": "13/06/2014",
                "activityDate": "13/06/2014",
                "activityAmount": "100",
                "activityType": "ASSN"
              }
            ],
            "personalGuarantor": {},
            "ssn": "666713265"
          }
        ],
        "ssn": "101199996"
      }
    ]
  }
});
        } else {
            var pg = {
                "customers": {
                    "customer": [{
                        "customerType": "Personal Guarantor",
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
            }
    
            res.json(pg);
        }
    } else {
        res.json({
            "error": "Customer Type not recognised"
        });
    }
})


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