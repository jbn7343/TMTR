state.application = state.application || {};
var applicationMap = state.application;

exports.dynamicAssign = function (IDKey, req)
{
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") 
    {
        applicationMap[IDKey].responseTemplate = "DYNAMIC_customer_new";
        applicationMap[IDKey].nextResponseTemplate = "DYNAMIC_customer_existing";
        applicationMap[IDKey].predefinedResponseFound = true;
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