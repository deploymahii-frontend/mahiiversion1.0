import {

    generateAccessToken

} from "../services/token.service.js";

export async function refreshToken(

    req,

    res

){

    const {

        refreshToken

    } = req.body;

    // verify refresh token

    // load user

    // create new access token

    return res.json({

        success:true,

        accessToken:generateAccessToken({

            id:"USER_ID"

        })

    });

}
