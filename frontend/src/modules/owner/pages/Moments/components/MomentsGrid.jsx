import MomentCard from "./MomentCard";

export default function MomentsGrid({

    moments=[]

}){

    return(

        <section className="mt-8 grid gap-6 md:grid-cols-4">

            {

                moments.map(moment=>(

                    <MomentCard

                        key={moment._id}

                        moment={moment}

                    />

                ))

            }

        </section>

    )

}
