import Button from "@/components/ui/Button";

export default function UserActions({

    user,

    onSuspend,

    onActivate,

    onVerify,

}){

    return(

        <div className="flex gap-2">

            {

                user.status==="ACTIVE"

                ?(

                    <Button

                        size="sm"

                        variant="destructive"

                        onClick={()=>onSuspend(user)}

                    >

                        Suspend

                    </Button>

                )

                :(

                    <Button

                        size="sm"

                        onClick={()=>onActivate(user)}

                    >

                        Activate

                    </Button>

                )

            }

            {

                !user.verified && (

                    <Button

                        size="sm"

                        onClick={()=>onVerify(user)}

                    >

                        Verify

                    </Button>

                )

            }

        </div>

    )

}
