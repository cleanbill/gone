import { ImageAtt, LinkAtt, LinkParts, Tag } from "../types";


const assembleTags = (text: string, attributes = new Array<Tag>) => {
    if (!text || text.trim().length == 0) {
        return attributes;
    }
    const equalsPos = text.indexOf('=');
    const name = text.substring(0, equalsPos).trim();
    const quotes = text.indexOf('"') > -1 ? '"' : "'";
    const firstQuotePos = text.indexOf(quotes) + 1;
    const rest = text.substring(firstQuotePos, text.length);
    const secondQuotePos = rest.indexOf(quotes);
    const value = rest.substring(0, secondQuotePos);

    const attribute = { name, value };
    if (name.trim().length > 0 && value.trim().length > 0) {
        attributes.push(attribute);
    }

    const valuePos = text.indexOf(value);
    const left = text.substring(valuePos + value.length + 1, text.length);

    return assembleTags(left, attributes);
}

const obtainValue = (tags: Array<Tag>, tagName: string, defaultValue = ''): string => {
    const tag: Tag = tags.find((tag: Tag) => tag.name.toLowerCase() == tagName) || { name: tagName, value: defaultValue };
    return tag.value;
}

const assembleLinkAtt = (tags: Array<Tag>): LinkAtt => {
    const href = obtainValue(tags, 'href');
    const target = obtainValue(tags, 'target', '_blank');
    const title = obtainValue(tags, 'title');
    return { href, target, title };
}

const assembleImageAtts = (rest: string): ImageAtt | false => {
    const startLinked = rest.trim().indexOf(" ");
    const linkedParams = rest.substring(startLinked, rest.length);
    const imageAttributes = assembleTags(linkedParams);
    if (imageAttributes.length == 0) {
        return false;
    }
    const src = obtainValue(imageAttributes, 'src');
    const alt = obtainValue(imageAttributes, 'alt');

    return { src, alt };
}

const Link = {

    parse: (raw: string): LinkParts => {

        const closingTagPos = raw.indexOf('>');
        const start = raw.indexOf(' ');
        const openingParams = raw.substring(start, closingTagPos);
        const attributes = assembleTags(openingParams);
        const linkAttributes = assembleLinkAtt(attributes);

        const endTagPos = raw.indexOf('</a>');
        const rest = raw.substring(closingTagPos + 1, endTagPos).trim();
        const imageAttributes = assembleImageAtts(rest);

        const text = imageAttributes || rest.length == 0 ? 'link' : rest;


        return { raw, linkAttributes, imageAttributes, text };
    }

}

export { Link }