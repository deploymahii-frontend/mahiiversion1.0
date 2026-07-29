export async function requestPasswordReset(

    req,

    res

){

    const {

        email

    } = req.body;

    // generate reset token

    // store hashed token

    // send email

    return res.json({

        success:true,

        message:"Password reset email sent."

    });

}

export async function resetPassword(

    req,

    res

){

    // validate token

    // update password

    // invalidate sessions

    return res.json({

        success:true

    });

}
