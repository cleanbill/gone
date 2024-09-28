"use client"
import { FIRST_BLOG } from "@/types";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"


const First = () => {

    console.log('Welcome');

    const router = useRouter();

    // useEffect(() =>
    //     router.push('/blog/' + FIRST_BLOG));
    return (<div className="mt-96">
        <Link className=" h-full text-9xl" href="/blog/22">World Wide ferris ride</Link>
    </div>);
}

export default First; 