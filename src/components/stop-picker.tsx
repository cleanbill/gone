"use client"
import { Stops } from "@/data/general";
import { CountryIndex, Stop } from "@/types";
import { useEffect, useState } from "react";
import CityButton from "./cityButton";


type Props = {
    picked: Function
}

const StopPicker = (props: Props) => {

    const [countries, setCountries] = useState(new Array<CountryIndex>());

    useEffect(() => {
        const countries = Stops.map((stop: Stop, index: number) => ({ stop, index }))
            .filter((cindex: CountryIndex, index: number, array: Array<CountryIndex>) => {
                const firstIndex = array.findIndex((countryIndex: CountryIndex) => countryIndex.stop.city == cindex.stop.city);
                return index == firstIndex;
            });
        setCountries([...countries]);
    }, [])

    const select = (i: number) => {
        props.picked(i);
    }

    return (
        <article>

            <h2 className="font-bold align-top ml-8">Flights</h2>
            {countries.map((countryIndex: CountryIndex, index: number) => (
                <CityButton key={index} select={select} countryIndex={countryIndex}></CityButton>))}
        </article>
    )
}

export default StopPicker