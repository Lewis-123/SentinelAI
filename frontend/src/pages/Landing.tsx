import { Link } from "react-router-dom";



export default function Landing(){


    return (

        <div className="min-h-screen bg-gray-100">


            <nav className="bg-white shadow p-5 flex justify-between items-center">


                <h1 className="text-2xl font-bold text-blue-700">

                    SentinelAI

                </h1>



                <div className="space-x-4">


                    <Link

                        to="/login"

                        className="px-4 py-2"

                    >

                        Login

                    </Link>



                    <Link

                        to="/register"

                        className="bg-blue-600 text-white px-5 py-2 rounded"

                    >

                        Register

                    </Link>


                </div>


            </nav>





            <section className="max-w-6xl mx-auto px-6 py-20">


                <div className="bg-white rounded-xl shadow p-10">


                    <h2 className="text-5xl font-bold mb-6">

                        AI-Powered Environmental Risk Intelligence

                    </h2>




                    <p className="text-gray-600 text-xl mb-8">

                        SentinelAI combines machine learning,

                        satellite intelligence, environmental data,

                        and predictive analytics to identify

                        emerging risks before they escalate.

                    </p>





                    <div className="flex gap-5">


                        <Link

                            to="/register"

                            className="bg-blue-600 text-white px-8 py-3 rounded-lg"

                        >

                            Start Monitoring

                        </Link>



                        <Link

                            to="/login"

                            className="border px-8 py-3 rounded-lg"

                        >

                            Access Dashboard

                        </Link>


                    </div>


                </div>







                <div className="grid md:grid-cols-3 gap-6 mt-10">


                    <div className="bg-white rounded-xl shadow p-6">


                        <h3 className="font-bold text-xl">

                            AI Risk Prediction

                        </h3>


                        <p className="mt-3">

                            Predict environmental risks using

                            machine learning models.

                        </p>


                    </div>





                    <div className="bg-white rounded-xl shadow p-6">


                        <h3 className="font-bold text-xl">

                            Satellite Intelligence

                        </h3>


                        <p className="mt-3">

                            Monitor vegetation, rainfall,

                            and environmental changes.

                        </p>


                    </div>





                    <div className="bg-white rounded-xl shadow p-6">


                        <h3 className="font-bold text-xl">

                            Early Warning

                        </h3>


                        <p className="mt-3">

                            Generate alerts before risks

                            become emergencies.

                        </p>


                    </div>


                </div>


            </section>


        </div>

    );

}