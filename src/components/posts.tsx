"use client"
import { BlogComment, BlogPost, FIRST_BLOG, LAST_BLOG, LinkParts } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkRender from "./linkRender";
import LinkRenderSmall from "./linkRenderSmall";
import Picture from "./picture";
import Image from "next/image";
import StopPicker from "./stop-picker";
import CeylonPicker from "./ceylon-picker";
import useSwipe from "@/utils/useSwipe";
import { display, displayShort } from "@/utils/dates";
import Comments from "./comments";
import { useRouter } from 'next/navigation'

type Props = {
    allPosts: any,
    index: string
}
const convert = (item: any): BlogPost => {
    const blog: any = { ...item };
    if (Object.keys(blog).length == 0) {
        blog.date = new Date().getTime();
        blog.country = "Nowhere";
        blog.times = "";
        blog.title = "Out of range";
        blog.description = ["There is nothing here"];
        blog.links = [];
        blog.images = [];
        blog.videos = [];
        blog.comments = [];
        blog.rubbish = [];
    }
    blog.date = new Date(blog.date);
    blog.comments = blog.comments.map((bc: BlogComment) => {
        bc.date = new Date(bc.date);
        return bc;
    })
    blog.links = blog.links.map((l: any) => l as LinkParts);

    return blog;
};

const Posts = (props: Props) => {

    const defaultBlog = convert(props.allPosts[FIRST_BLOG]);

    const [item, setItem] = useState(defaultBlog);
    const [index, setIndex] = useState(FIRST_BLOG);
    const [next, setNext] = useState(FIRST_BLOG + 1);
    const [previous, setPrevious] = useState(LAST_BLOG);
    const [ready, setReady] = useState(false)

    const router = useRouter();

    useEffect(() => {
        selectItem(parseInt(props.index));
        setReady(true);
    }, [])

    const selectItem = (index: number) => {

        setIndex(index);
        setNext(index + 1);
        setPrevious(index - 1);
        const item = props.allPosts[index];
        const blog = convert(item);

        setItem(blog);
        window.history.replaceState({}, '', '../blog/' + index); // works better than shallow navigation
        // router.push('/blog/' + index, undefined, { shallow: true });

    };

    const swipeHandlers = useSwipe({ onSwipedLeft: () => selectItem(previous), onSwipedRight: () => selectItem(next) });

    const first = item.type == "Ceylon" ? 244 : item.type == "Music" ? 260 : FIRST_BLOG;
    const last = item.type == "Ceylon" ? 258 : item.type == "Music" ? 260 : LAST_BLOG;

    return (
        ready && <div {...swipeHandlers} className="lg:grid lg:grid-cols-[0.5fr,12fr]">
            <div className="hidden lg:block text-4xl pl-1 pt-10">

                <div className="text-xs">
                    {item.type == "WFR" && <StopPicker picked={selectItem}></StopPicker>}
                    {item.type == "Ceylon" && <CeylonPicker picked={selectItem}></CeylonPicker>}
                </div>
            </div>
            {/* <a href='https://www.google.com/maps/d/edit?mid=1HKAM6Y-IvZQud_Wjfpeu4oAMVCg&usp=sharing'>
        <Image src='/the-world.png' width={150} height={100} alt={"The world map"}
        ></Image>
      </a> */}

            <article id='blogs'>
                {<><h2 className="text-4xl bold text-center pt-1">{item.title}</h2>

                    <h3 className="hidden lg:block text-center pb-5 ">

                        {index > first && <button title={"" + (index - 1)} className=" text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
                 focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(previous)} >
                            ❮ previous
                        </button>}
                        {display(item.date)}
                        {index < last && <button title={"" + next} className=" text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
                 focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(next)}>
                            Next ❯
                        </button>}
                    </h3>
                    <h3 className="lg:hidden text-center pb-5 w-full ">
                        <span className="grid grid-cols-[0fr,11fr,0fr]">
                            {index > first && <button title={"" + (index - 1)} className=" float-left text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(previous)} >
                                ❮
                            </button>}
                            {index == first && <div></div>}

                            <div className="mt-5 text-3xl">{displayShort(item.date)}</div>
                            {index < last && <button title={"" + next} className="float-right text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(next)}>
                                ❯
                            </button>}
                        </span>
                    </h3>
                </>}

                <div className={item.description.length > 0 ? "ml-1 mr-1 lg:ml-40 lg:mr-40 lg:grid lg:grid-cols-[3fr,7fr]" : "lg:mid"} >

                    {item.type != "Music" && item.description.length > 0 &&
                        <div id={'desc-' + index}>
                            {item.description.map((desc: string) => (<p key={desc} className="p-6 ">{desc}</p>))}
                            {item.comments.length > 0 && <div className="hidden lg:block">
                                <Comments index={index} item={item}></Comments></div>}
                        </div>}

                    {(item.type == "WFR" && item.images.length > 0)
                        && <div id={'images' + index} className="grid gap-1 grid-cols-3 bg-blue-100 rounded-md p-3 ">
                            {item.images.map((image: string, i: number) => (
                                <div id="link-pictures" key={image + i} className="justify-self-center place-content-center">
                                    <Link href={image} target='_page'>
                                        <Image priority className="justify-self-center rounded-3xl"
                                            alt={image}
                                            title={image}
                                            src={image}
                                            width={350}
                                            height={50} >
                                        </Image>
                                    </Link>
                                </div>
                            ))}
                        </div>}

                    {(item.type == "Music" && item.images.length > 0)
                        && <div id={'images' + index} className="col-span-2 grid gap-1 grid-cols-10 bg-blue-100 rounded-md p-3 ">
                            {item.images.map((image: string, i: number) => (
                                <div id="link-pictures" key={image + i} className="justify-self-center place-content-center">
                                    <Link href={image} target='_page'>
                                        <Image priority className="justify-self-center rounded-3xl"
                                            alt={image}
                                            title={image}
                                            src={image}
                                            width={350}
                                            height={50} >
                                        </Image>
                                    </Link>
                                </div>
                            ))}
                        </div>}


                    {(item.type == "WFR" && item.images.length > 0) && <div id={'images' + index}>
                        {item.images.map((image: string, i: number) => (
                            <div id="link-pictures" key={image + i} className="justify-self-center mid">
                                <Link href={image} target='_page'>
                                    <Picture image={image} alt={image}></Picture>
                                </Link>
                            </div>
                        ))}
                    </div>}

                    {item.type != "WFR" &&
                        <div id="small-links" className="grid grid-cols-3 gap-1">
                            {item.links.map((link: LinkParts) => (
                                <div key={link.linkAttributes.href} className="justify-self-center mid">
                                    <LinkRenderSmall link={link}></LinkRenderSmall>
                                </div>
                            ))}
                        </div>}


                    {(item.type == "WFR" && item.links.length > 0) &&
                        <div id="links">
                            {item.links.map((link: LinkParts) => (
                                <div key={link.linkAttributes.href} className="justify-self-center mid">
                                    <LinkRender link={link}></LinkRender>
                                </div>
                            ))}
                        </div>
                    }

                    {item.videos.map((vid: string) => (
                        <div id="videos" key={vid} className="mid m-2 justify-self-center">
                            <Link href={vid} target='_page'>
                                <div title={vid} className="text-center">-</div>
                            </Link>
                            <video src={'../' + vid} controls>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}

                    {item.comments.length > 0 && <div className="lg:hidden">
                        <Comments index={index} item={item}></Comments></div>}

                </div>
            </article>
        </div>
    );
}

export default Posts;
