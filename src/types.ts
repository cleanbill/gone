export type Stop = {
    blogID: number,
    country: string,
    city: string,
    date: string,
    desc: string,
    from: string,
    to: string
}


export type DescLinks = {
    links: Set<LinkParts>,
    desc: string;
}

export type Tag = {
    name: string,
    value: string
}

export type LinkAtt = {
    href: string
    target: string
    title: string;
}

export type ImageAtt = {
    src: string;
    alt: string;
}

export type LinkParts = {
    raw: string,
    linkAttributes: LinkAtt,
    imageAttributes: ImageAtt | false,
    text: string,
}

export type BlogComment = {
    id: number,
    gmtDate: Date,
    userId: number,
    author: string,
    date: Date,
    ip: string,
    content: Array<string>,
    email: string,
    url: string
}

export type BlogPost = {
    date: Date,
    country: string,
    times: Array<string>,
    title: string
    description: Array<string>,
    links: Array<LinkParts>,
    images: Array<string>,
    videos: Array<string>,
    comments: Array<BlogComment>,
    rubbish: Array<any>
}

export type CountryIndex = {
    stop: Stop,
    index: number,
}


export type WpItem = {
    "#text": string
}

export type CountryTime = {
    country: string, from: Date, to: Date
}

export const VID_EXT = '.webm';

export const FIRST_BLOG = 22;
export const LAST_BLOG = 93;