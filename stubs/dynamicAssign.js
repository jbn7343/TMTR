state.application = state.application || {};
var applicationMap = state.application;

exports.dynamicAssign = function (IDKey, req)
{
    if (req.body.customer.customerType.toUpperCase() == "INDIVIDUAL") 
    {
        
    } 
    else if (req.body.customer.customerType.toUpperCase() == "BUSINESS") 
    {
        
    } 
    else if (req.body.customer.customerType.toUpperCase() == "PERSONAL GUARANTOR") 
    {
       
    } else {
        res.json({
            "error": "Customer Type not recognised"
        });
    }
}