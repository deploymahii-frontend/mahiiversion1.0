export async function verifyEmail(

    req,

    res

){

    const {

        token

    } = req.query;

    // verify token

    // activate account

    return res.json({

        success:true,

        verified:true

    });

}
