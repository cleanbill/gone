"use client"
import { BlogComment, BlogPost, FIRST_BLOG, LAST_BLOG, LinkParts } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkRender from "./linkRender";
import Picture from "./picture";
import StopPicker from "./stop-picker";
import useSwipe from "@/utils/useSwipe";

type Props = {
    allPosts: any,
    index: string
}
const convert = (item: any): BlogPost => {
    const blog: any = { ...item };
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
        window.history.replaceState({}, '', '../blog/' + index);
        //   router.push('/blog/' + index); too slow

    };

    const display = (dateObj: any): string => {
        const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
        const options = {
            dateStyle: 'full',
            timeStyle: 'short',
        };

        try {
            // @ts-ignore
            const output = new Intl.DateTimeFormat('en-GB', options).format(date);// Should use react-intl
            return output;
        } catch (er) {
            console.error('trying to display', date, er);
        }
        return '';
    }

    const displayShort = (dateObj: any): string => {
        const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
        const options = {
            dateStyle: 'short',
            timeStyle: 'short',
        };

        try {
            // @ts-ignore
            const output = new Intl.DateTimeFormat('en-GB', options).format(date);// Should use react-intl
            return output;
        } catch (er) {
            console.error('trying to display', date, er);
        }
        return '';
    }

    const swipeHandlers = useSwipe({ onSwipedLeft: () => selectItem(previous), onSwipedRight: () => selectItem(next) });

    return (
        ready && <div {...swipeHandlers} className="lg:grid lg:grid-cols-[0.5fr,12fr]">
            <div className="hidden lg:block text-4xl pl-1 pt-10">

                <div className="text-xs">
                    <StopPicker picked={selectItem}></StopPicker>
                </div>
            </div>
            {/* <a href='https://www.google.com/maps/d/edit?mid=1HKAM6Y-IvZQud_Wjfpeu4oAMVCg&usp=sharing'>
        <Image src='/the-world.png' width={150} height={100} alt={"The world map"}
        ></Image>
      </a> */}

            <article id='blogs'>
                {<><h2 className="text-4xl bold text-center pt-1">{item.title}</h2>

                    <h3 className="hidden lg:block text-center pb-5 ">

                        {index > FIRST_BLOG && <button title={"" + (index - 1)} className=" text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
                 focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(previous)} >
                            ❮ previous
                        </button>}
                        {display(item.date)}
                        {index < LAST_BLOG && <button title={"" + next} className=" text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
                 focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(next)}>
                            Next ❯
                        </button>}
                    </h3>
                    <h3 className="lg:hidden text-center pb-5 w-full ">
                        <span className="grid grid-cols-[0fr,11fr,0fr]">
                            {index > FIRST_BLOG && <button title={"" + (index - 1)} className=" float-left text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(previous)} >
                                ❮
                            </button>}
                            <div className="mt-5 text-3xl">{displayShort(item.date)}</div>
                            {index < LAST_BLOG && <button title={"" + next} className="float-right text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-yellow-300 rounded-xl m-3 p-3" onClick={() => selectItem(next)}>
                                ❯
                            </button>}
                        </span>
                    </h3>
                </>}

                <div className={item.description.length > 0 ? "ml-1 mr-1 lg:ml-40 lg:mr-40 lg:grid lg:grid-cols-[5fr,7fr]" : "lg:mid"} >

                    {item.description.length > 0 &&
                        <div id={'desc-' + index}>

                            {item.description.map((desc: string) => (<p key={desc} className="p-6 ">{desc}</p>))}

                            {item.comments.length > 0 &&
                                <div className="m-10 w-10/12">
                                    {item.comments.map((comment: any, commentIndex: number) => (
                                        <div key={'bc-' + index + commentIndex} className="lg:grid lg:grid-cols-[4.5fr,1fr,10fr] lg:gap-5 mt-3 ">
                                            <div className="">{display(comment.date)}</div>
                                            <div className="font-bold">{comment.author}</div>
                                            <div className="">
                                                {comment.content.map((comment: string) => (<p key={comment} className="col-span-5">{comment}</p>))}
                                            </div>
                                        </div>
                                    ))}
                                </div>}

                        </div>}

                    {item.images.length > 0 && <div id={'images' + index}>
                        {item.images.map((image: string) => (
                            <div id="link-pictures" key={image} className="justify-self-center">
                                <Link href={image} target='_page'>
                                    <Picture image={image} alt={image}></Picture>
                                </Link>
                            </div>
                        ))}
                    </div>}

                    {item.links.length > 0 && <div id="links">
                        {item.links.map((link: LinkParts) => (
                            <div key={link.linkAttributes.href} className="justify-self-center">
                                <LinkRender link={link}></LinkRender>
                            </div>
                        ))}
                    </div>}

                    {item.videos.map((vid: string) => (
                        <div id="videos" key={vid} className=" m-2 justify-self-center">
                            <Link href={vid} target='_page'>
                                <div title={vid} className="text-center">-</div></Link>
                            <video src={'../' + vid} controls>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}

                </div>
            </article>
        </div>
    );
}

export default Posts;