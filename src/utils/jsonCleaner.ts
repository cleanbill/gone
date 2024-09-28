
import { BlogComment, BlogPost, DescLinks, LinkParts, VID_EXT } from "../types";
import { Link } from "./parseLink";
import { extractComments } from "./commentsCleaner";

const clean = (post: any): BlogPost => {

    // do correctly ... is it a date ie '2007-' or '2008-' set date unique and times array.
    // set title (must be less than 100 characters - indian poem)
    // set description -> parse out links to images....
    // set image list
    // set video list 
    //

    const dateStarter = (text: string): boolean => (text.indexOf('2006-') == 0 || text.indexOf('2007-') == 0 || text.indexOf('2008-') == 0);

    const getDate = (item: any) => {
        const text = item['#text'];
        if (!text) {
            return false;
        }
        const dateStart = dateStarter(text);
        if (!dateStart) {
            return false;
        }
        const date = new Date(text);
        return date;
    }

    const getTitle = (item: any, key: string) => {
        if (key != 'title') {
            return false;
        }
        const text = item['#text'];
        if (!text) {
            return false;
        }
        if (text.indexOf('<a href') > -1) {
            return false;
        }
        if (text.indexOf('.jpg') > -1 || text.indexOf('.JPG') > -1) {
            return false;
        }
        return text;
    }

    const getLinks = (text: string, links = new Set<LinkParts>()) => {
        const start = text.indexOf('<a ');
        if (start == -1) {
            return links;
        }
        const end = text.indexOf("</a>") + 4;
        const link = text.substring(start, end);
        const linkParts = Link.parse(link);

        links.add(linkParts);
        return getLinks(text.substring(end), links);
    }

    const badText = ['<font style="color: #000000" color="green">',
        '</font>',
        '<p>',
        '</p>',
        '<p style="text-align: center"></p>',
        '<p style="text-align: center"> <p style="text-align: center">',
        '<p style="text-align: center"><span style="font-weight: bold">UPDATE - Download films to watch them....</span> <p style="font-weight: bold"><span style="font-weight: normal">Clicking on the picture to watch them (streaming) is too slow on Johnny\'s server.....</span>',
        '<p align="center"> <p style="text-align: center">',
        '<span style="font-weight: bold">UPDATE - Download films to watch them....</span>',
        '<p style="font-weight: bold"><span style="font-weight: normal">Clicking on the picture to watch them (streaming) is too slow on Johnny\'s server.....</span>',
        '<p style="text-align: center">',
        '<p align="center">'];

    const resolveAnd = (text: string) => text.replaceAll('&amp;', '&');


    const getDesc = (item: any): false | DescLinks => {
        let text = item['#text'];
        if (!text) {
            return false;
        }
        if (
            // && text.length > 10
            text.indexOf('attachment_id') > -1
            || text.indexOf('meta name=') > -1
            || text.indexOf('http://localhost/blog/?p') > -1
            || text.indexOf('+0000') > -1
            || dateStarter(text)
            || text.indexOf(' ') == -1) {
            return false;
        }
        const links = getLinks(text);
        links.forEach((link: LinkParts) => text = text.replaceAll(link.raw, ''));
        badText.forEach((bad: string) => text = text.replaceAll(bad, ''));
        text = resolveAnd(text);

        return { links, desc: text };
    }

    const getImage = (item: any) => {
        const image = item['image'];
        return image;
    }

    const findVideoInArray = (items: Array<any>) => {
        let check;
        for (const index in items) {
            check = getVideo(items[index]);
            if (check) {
                break;
            }
        }
        if (check) {
            return check;
        }
        return false;
    }

    const findVideoInObject = (item: any) => {
        if (!item) {
            return false;
        }
        const keys = Object.keys(item);
        let check;
        for (const index in keys) {
            check = getVideo(item[keys[index]])
            if (check) {
                break;
            }
        }
        if (check) {
            return check;
        }
        return false;
    }

    const extractVideo = (text: string, results = new Array<string>): Array<string> => {
        if (!text || text.trim().length == 0 || text.indexOf(VID_EXT) == -1) {
            return results;
        }
        const closingPos = text.indexOf(VID_EXT) + VID_EXT.length;
        const substring = text.substring(0, closingPos);
        const rest = text.substring(closingPos, text.length);
        const startPos = substring.lastIndexOf('"') + 1;
        results.push(substring.substring(startPos));
        //     results.push(substring.substring(startPos, substring.length - 4) + '.mp4');


        return extractVideo(rest, results);
    }

    // needs some thought.....
    const getVideo = (item: any): string | false => {
        if (Array.isArray(item)) {
            return findVideoInArray(item);
        }
        if (typeof item == 'string') {
            return hasVideo(item) ? item : false
        }

        return findVideoInObject(item);
    }

    const hasVideo = (text: string) => text.indexOf(VID_EXT) != -1;

    const blogPost: BlogPost = {
        date: new Date(),
        times: [],
        title: "",
        description: [""],
        rubbish: [],
        links: new Array(),
        images: new Array(),
        videos: new Array(),
        comments: new Array<BlogComment>(),
        country: ""
    };

    const links = new Map<string, LinkParts>();
    const images = new Set<string>();
    const videos = new Set<string>();

    const keys = Object.keys(post);
    keys.forEach((key: string, index: number) => {
        const item = post[key];

        const date = getDate(item);
        if (date) {
            blogPost.date = date;
            // @Todo fill in times...
            return;
        }
        const title = getTitle(item, key);
        if (title) {
            blogPost.title = title;
            return;
        }
        const descLinks = getDesc(item);
        if (descLinks) {
            blogPost.description = [descLinks.desc];
            descLinks.links.forEach((link: LinkParts) => links.set(link.linkAttributes.href, link));
            return;
        }
        const image = getImage(item);
        if (image) {
            images.add(image);
            return;
        }
        const video = getVideo(item);
        if (video) {
            const extractedVideos = extractVideo(video);
            extractedVideos.forEach((vid: string) => videos.add(vid));
            return;
        }
        const comments = extractComments(item, key);
        if (comments) {
            blogPost.comments = comments;
        }
        blogPost.rubbish = item;

    })

    blogPost.links = Array.from(links.values());
    blogPost.images = Array.from(images);
    blogPost.videos = Array.from(videos);

    return blogPost;

}

export { clean }