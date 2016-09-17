state.application = state.application || {};
var applicationMap = state.application;

exports.dynamicAssign = function (IDKey, req)
{
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") 
    {
        applicationMap[IDKey].responseTemplate = "DYNAMIC_customer_new";
        applicationMap[IDKey].predefinedResponseFound = false;
    } 
    else if (req.body.customer.customerType.toUpperCase() == "BUSINESS") 
    {
        applicationMap[IDKey].responseTemplate = "DYNAMIC_business_new";
        applicationMap[IDKey].predefinedResponseFound = false;
    } 
    else if (req.body.customer.customerType.toUpperCase() == "PERSONAL GUARANTOR") 
    {
        applicationMap[IDKey].responseTemplate = "DYNAMIC_PG_new";
        applicationMap[IDKey].predefinedResponseFound = false;
    } 
    else 
    {
        res.json({
            "error": "Customer Type not recognised"
        });
    }
    return "";
}