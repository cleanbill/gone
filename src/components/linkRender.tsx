import Link from "next/link";
import { LinkParts } from "@/types";
import Picture from "./picture";

type Props = {
    link: LinkParts
}

const LinkRender = (props: Props) => {

    const link = props.link;

    return (
        <>
            <Link href={link.linkAttributes.href} target={link.linkAttributes.target}
                title={link.linkAttributes.title} >
                {link.imageAttributes &&
                    <>
                        <Picture image={link.imageAttributes.src} alt={link.imageAttributes.alt}></Picture>
                    </>
                }

                {!link.imageAttributes && <>{link.text} </>}
            </Link >
        </>
    )
}

export default LinkRender;