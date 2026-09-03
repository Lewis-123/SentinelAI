export default function AlertPanel(){

    const alerts = [
        {
            location:"Turkana",
            message:"Risk increased MEDIUM → HIGH",
            score:87
        },
        {
            location:"Nairobi",
            message:"Drought indicators increasing",
            score:65
        }
    ];


    return (

        <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

                Active Alerts

            </h2>



            {

            alerts.map((alert)=>(


                <div

                    key={alert.location}

                    className="border rounded-lg p-4 mb-3"

                >


                    <h3 className="font-bold">

                        ⚠ {alert.location}

                    </h3>


                    <p>

                        {alert.message}

                    </p>


                    <p>

                        Risk Score:

                        {" "}

                        {alert.score}/100

                    </p>



                </div>


            ))

            }



        </div>

    );

}