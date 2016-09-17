state.application = state.application || {};
var applicationMap = state.application;

exports.determinePredefinedResponse = function (IDKey, req)
{
    
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") {
        if (req.body.customer.ssn == "110017363") {
            //Dewey September
            //CUSTOMER SINGLE CMF
             applicationMap[IDKey].requestedResponse = "customer_single_cmf";
        } else if (req.body.customer.ssn == "342244596") {
            //Shota Rossi
            //CUSTOMER SINGLE FCMF
             applicationMap[IDKey].requestedResponse = "customer_single_fcmf";
        } else if (req.body.customer.ssn == "666508280") {
            //Adesa McComb
            //CUSTOMER SIMPLE OFAC
             applicationMap[IDKey].requestedResponse = "customer_single_ofac";
        } else if (req.body.customer.ssn == "666669723") {
            //Customer Single Neg
            //Provide response back for MARCI BLUMENTHAL
             applicationMap[IDKey].requestedResponse = "customer_single_neg";
        } else if (req.body.customer.ssn == "666456009") {
            //Samuel Peter
            //CUSTOMER MULTIPLE CMF
             applicationMap[IDKey].requestedResponse = "customer_multiple_cmf";
        } else if (req.body.customer.ssn == "666234987") {
            //Joe Generic
            //CUSTOMER MULTIPLE FCMF
             applicationMap[IDKey].requestedResponse = "customer_multiple_fcmf";
        } else if (req.body.customer.ssn == "627497362") {
            //Cristian David Gonzalez Mejia
            //CUSTOMER MULTIPLE OFAC
             applicationMap[IDKey].requestedResponse = "customer_multiple_ofac";
        } else if (req.body.customer.ssn == "666157434") {
            //Mario Solis
            //CUSTOMER MULTIPLE Neg
             applicationMap[IDKey].requestedResponse = "customer_multiple_neg";
        } 
    
        
    } else if (req.body.customer.customerType.toUpperCase() == "BUSINESS") {
        if (req.body.customer.organization.taxId == "531598285") {
            //BENEDICTO
            //Business SINGLE CMF
             applicationMap[IDKey].requestedResponse = "business_single_cmf";
        } else if (req.body.customer.organization.taxId == "732423580") {
            //One FCMF LLC
            //Business SINGLE FCMF
             applicationMap[IDKey].requestedResponse = "business_single_fcmf";
        } else if (req.body.customer.organization.taxId == "720792454") {
            //PFEIFFER GANTT & GLEATON
            //Business SIMPLE OFAC
             applicationMap[IDKey].requestedResponse = "business_single_ofac";
        } else if (req.body.customer.organization.taxId == "310929576") {
            //ABG CAPITAL
            //Business Single Neg
             applicationMap[IDKey].requestedResponse = "business_single_neg";
        } else if (req.body.customer.organization.taxId == "232423571") {
            //MULTIPLE CMF LLC
            //Business MULTIPLE CMF
             applicationMap[IDKey].requestedResponse = "business_multiple_cmf";
        } else if (req.body.customer.organization.taxId == "532423579") {
            //MULTIPLE FCMF LLC
            //Business MULTIPLE FCMF
             applicationMap[IDKey].requestedResponse = "business_multiple_fcmf";
        } else if (req.body.customer.organization.taxId == "923751967") {
            //GROUPED INDUSTRIES CORPORATION
            //Business COMPLEX OFAC
             applicationMap[IDKey].requestedResponse = "business_multiple_ofac";
        } else if (req.body.customer.organization.taxId == "445601764") {
            //BILLMAN HOME CENTER
            //Business MULTIPLE Neg
             applicationMap[IDKey].requestedResponse = "business_multiple_neg";
        } 
    } else if (req.body.customer.customerType.toUpperCase() == "PERSONAL GUARANTOR") {
        if (req.body.customer.organization.taxId == "112233123") {
            //PG 1 CMF LLC
            //PGCMFONE PGCMFONE
            //Personal Guarantor SINGLE CMF
             applicationMap[IDKey].requestedResponse = "PG_single_cmf";
        } else if (req.body.customer.organization.taxId == "112233001") {
            //PG 1 FCMF LLC
            //PGFCMFONE PGFCMFONE
            //Personal Guarantor SINGLE FCMF
             applicationMap[IDKey].requestedResponse = "PG_single_fcmf";
        } else if (req.body.customer.organization.taxId == "382909432") {
            //BLAIR CEDAR & NOVELTY WORKS, INC
            //BARRY MORDAN
            //Personal Guarantor SIMPLE OFAC
             applicationMap[IDKey].requestedResponse = "PG_single_ofac";
        } else if (req.body.customer.organization.taxId == "112233004") {
            //PG 1 NEG LLC
            //PGNEGONE PGNEGONE
            //Personal Guarantor Single Neg
             applicationMap[IDKey].requestedResponse = "PG_single_neg";
        } else if (req.body.customer.organization.taxId == "112233121") {
            //PG Multiple CMF-1 LLC
            //PGCMFMULTIPLE PGCMFMULTIPLE
            //Personal Guarantor MULTIPLE CMF
             applicationMap[IDKey].requestedResponse = "PG_multiple_cmf";
        } else if (req.body.customer.organization.taxId == "112233002") {
            //PG Multiple FCMF-1 LLC
            //PGFCMFMULTIPLE PGFCMFMULTIPLE
            //Personal Guarantor MULTIPLE FCMF
             applicationMap[IDKey].requestedResponse = "PG_multiple_fcmf";
        } else if (req.body.customer.organization.taxId == "112233006") {
            //PG OFAC Detailed LLC
            //Cristian David GONZALEZ MEJIA
            //Personal Guarantor COMPLEX OFAC
             applicationMap[IDKey].requestedResponse = "PG_multiple_ofac";
        } else if (req.body.customer.organization.taxId == "112233005") {
            //PG Multiple NEG-1 LLC
            //PGNEGMULTIPLE PGNEGMULTIPLE
            //Personal Guarantor MULTIPLE Neg
             applicationMap[IDKey].requestedResponse = "PG_multiple_neg";
        } 
    }
    return "";
}