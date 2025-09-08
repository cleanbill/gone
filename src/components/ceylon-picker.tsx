"use client"
import { Stops } from "@/data/general";
import DateButton from "./date-button";


type Props = {
    picked: Function
}

const CeylonPicker = (props: Props) => {

    const getDisplayableDates = (): string[] => {

    	const dates: string[] = [];
    	const startDate = new Date(2025, 7, 13); // Month is 0-indexed (August is 7)
    	const endDate = new Date(2025, 7, 28);
    	let currentDate = startDate;

    	while (currentDate <= endDate) {
        	// Format the date into a readable string (e.g., "August 13, 2025")
        	const options: Intl.DateTimeFormatOptions = {
            		month: 'short',
            		day: 'numeric',
			weekday: 'short'
        	};
        	dates.push(currentDate.toLocaleDateString('en-US', options));
        
        	// Move to the next day
        	currentDate.setDate(currentDate.getDate() + 1);

         }

          return dates;
    } 

    const dates = getDisplayableDates();
    const select = (i: number) => {
        props.picked(i);
    }

    return (
        <article>

            <h2 className="font-bold align-top">Dates</h2>
            {dates.map((ddate: string, index: number) => (
                <DateButton key={index} name={ddate} select={select} index={index}></DateButton>))}
        </article>
    )
}

export default CeylonPicker
