import { CountryIndex } from "@/types"

type Props = {

    countryIndex: CountryIndex,
    select: Function
}

const CityButton = (props: Props) => {

    const countryIndex = props.countryIndex;
    const select = props.select

    return (
        <>
            <button onClick={() => select(countryIndex.stop.blogID)} title={countryIndex?.stop.country + ": " + countryIndex?.stop.desc} key={countryIndex?.index}
                className="mt-1 text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
                 focus:ring-yellow-300 rounded-xl h-10 w-24 p-2 ">{countryIndex?.stop.city}</button>


        </>
    )
}

export default CityButton;