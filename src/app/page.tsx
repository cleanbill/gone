"use client"
import { FIRST_BLOG } from "@/types";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"


const First = () => {

    console.log('Welcome');

    const go = (start:number) =>{
	    window.location="/blog/"+start;
    }

    const [start, setStart] = useState(false);
    useEffect(() => (setStart(true)),[]);

    return (<>{start &&<main>
	    	<button title="Bear and shark take on the world" onClick={() => go(22)} className="lg:mt-28 border-4 border-blue-300 p-4 bg-yellow-300 rounded-3xl lg:w-3/5 justify-self-center">
        		<Link className="h-full text-8xl" href="/blog/22">World wide ferris ride</Link><br></br>
			<p className="text-blue-500">Decades ago we went around the world....</p>
		</button>
	        <button onClick={() => go(244)} className="lg:mt-36 border-4 border-blue-300 p-4 bg-yellow-300 rounded-3xl lg:w-3/5 justify-self-center">
        	        <Link className="pt-100 h-full text-8xl" href="/blog/244">Sri Lanka</Link>
		        <p className="text-blue-500">The southern Indian cicadas begin <a title="click me" className="text-blue-800" href="https://www.discoverwildlife.com/animal-facts/insects-invertebrates/cicada-song-pre-dawn-light-india">singing</a> when the sun</p>
        	       <p className="text-blue-500">is exactly 3.8 degrees below the horizon – a moment known as <a  title="click me" className="text-blue-800" href="https://www.youtube.com/watch?v=H9Ev1KzZby0">civil twilight</a>.</p>
    	        </button>
	   </main>}</>);
}

export default First; 
