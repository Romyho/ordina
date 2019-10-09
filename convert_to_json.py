#!/usr/bin/env python
# Name:Romy Ho
# Student number:11007303
"""
This script selects specified data from csv and returns json file.
"""


import json
import pandas as pd
import csv
import sys


def convert(file_name):

    # Read csv file
    csv_name = file_name[0]
    df = pd.read_csv(csv_name, header = 0)
    # print(df.iat[:,4])
    WheelDiam = df.iat[1,1]
    Circum = df.iat[2,1]
    Fact = df.iat[3,1]

    df = df.loc[:,"Time":"RotSpeed"]

    df["WheelDiam"] = WheelDiam
    df["Circum"] = Circum
    df["Fact"] = Fact
    df["Speed"] = df["RotSpeed"]*Fact

    # Make dictionary, write to json structure
    data = df.to_dict('response')

    # Json file name
    json_name = csv_name.split(".csv")[0]+".json"

    # Write json file
    with open(json_name, 'w') as outfile:
        json.dump(data, outfile, indent=4)




if __name__ == "__main__":

    # Convert csv file to json
    convert(sys.argv[1:])
