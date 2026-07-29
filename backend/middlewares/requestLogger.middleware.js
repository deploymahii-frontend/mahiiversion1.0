export default function requestLogger(

    req,

    res,

    next

){

    console.log({

        method:req.method,

        url:req.originalUrl,

        ip:req.ip,

        user:req.user?._id

    });

    next();

}
