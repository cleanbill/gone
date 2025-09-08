import Link from "next/link";
import { LinkParts } from "@/types";
import Image from "next/image";

type Props = {
    link: LinkParts
}

const LinkRenderSmall = (props: Props) => {

    const link = props.link;

    return (
        <>
            <Link href={link.linkAttributes.href} target={link.linkAttributes.target}
                title={link.linkAttributes.title} >
                {link.imageAttributes &&
                    <>
                        <Image priority className="justify-self-center rounded-3xl"
                            alt={link.imageAttributes.alt}
                            title={link.imageAttributes.src}
                            src={link.imageAttributes.src}
                            width={350}
                            height={50} >
                        </Image>
                    </>
                }

                {!link.imageAttributes && <>{link.text} </>}
            </Link >
        </>
    )
}

export default LinkRenderSmall;
