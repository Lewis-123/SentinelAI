from pathlib import Path

import pandas as pd

import numpy as np



class DatasetBuilder:


    """
    Builds the SentinelAI risk training dataset.

    Features:

    Environmental:
        - temperature
        - rainfall
        - humidity
        - ndvi
        - rainfall_anomaly

    Socioeconomic:
        - population
        - density
        - poverty_rate

    Target:
        - risk_level

    """



    def __init__(self):


        self.features = [

            "temperature",

            "rainfall",

            "humidity",

            "population",

            "density",

            "poverty_rate",

            "ndvi",

            "rainfall_anomaly"

        ]




    def create_dataset(

        self,

        data

    ):


        """
        Convert raw collected data
        into ML-ready dataframe.
        """



        df = pd.DataFrame(
            data
        )



        # Ensure required columns exist

        for column in self.features:


            if column not in df.columns:


                if column == "ndvi":


                    df[column] = np.random.uniform(

                        0.1,

                        0.9,

                        len(df)

                    )



                elif column == "rainfall_anomaly":


                    df[column] = np.random.uniform(

                        -50,

                        50,

                        len(df)

                    )



                else:


                    df[column] = 0




        # Keep only model features

        df = df[

            self.features

        ]



        # Generate risk labels

        df["risk_level"] = (

            df.apply(

                self.calculate_risk,

                axis=1

            )

        )



        return df





    def calculate_risk(

        self,

        row

    ):


        """
        Generate training labels.

        Temporary rule-based labeling.

        Later replaced with historical
        disaster event data.
        """



        score = 0




        # Climate indicators


        if row["temperature"] > 35:

            score += 1



        if row["rainfall"] < 30:

            score += 1



        if row["humidity"] < 30:

            score += 1




        # Environmental indicators


        if row["ndvi"] < 0.3:

            score += 2



        if row["rainfall_anomaly"] < -20:

            score += 2




        # Social vulnerability


        if row["poverty_rate"] > 60:

            score += 2



        if row["density"] > 100:

            score += 1




        if score >= 5:


            return "HIGH"



        elif score >= 3:


            return "MEDIUM"



        else:


            return "LOW"






    def save_dataset(

        self,

        df,

        output_path

    ):


        """
        Save processed dataset.
        """



        output_path = Path(

            output_path

        )



        output_path.parent.mkdir(

            parents=True,

            exist_ok=True

        )



        df.to_csv(

            output_path,

            index=False

        )



        return output_path