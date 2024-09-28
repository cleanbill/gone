import { BlogComment, WpItem } from "@/types";

export const extractComments = (item: any, key: string): Array<BlogComment> | null => {
    if (key.indexOf('comment') == -1 || !Array.isArray(item)) {
        return null;
    }

    const commentsList = item as Array<any>;
    const extractedComments = commentsList.map((rawComment: any) => toComment(rawComment))
    return extractedComments;
}

const resolveAnd = (text: string) => text.replaceAll('&amp;', '&');

const toComment = (rawComment: any): BlogComment => {
    const keys = Object.keys(rawComment);
    const blogComment: BlogComment = {
        id: 0,
        gmtDate: new Date(),
        userId: 0,
        author: "",
        date: new Date(),
        ip: "",
        content: [""],
        email: "",
        url: ""
    };
    keys.map((key: string) => {
        const value = rawComment[key];

        const id = getId(key, value);
        if (id) {
            blogComment.id = id;
            return;
        }
        const gmtDate = getGmt(key, value);
        if (gmtDate) {
            blogComment.gmtDate = gmtDate;
            return;
        }
        const userId = getUserId(key, value);
        if (userId) {
            blogComment.userId = userId;
            return;
        }
        const author = getAuthor(key, value);
        if (author) {
            blogComment.author = author;
            return;
        }
        const date = getDate(key, value);
        if (date) {
            blogComment.date = date;
            return;
        }
        const ip = getIp(key, value);
        if (ip) {
            blogComment.ip = ip;
            return;
        }
        const content = getContent(key, value);
        if (content) {
            blogComment.content = [content];
            return;
        }
        const email = getEmail(key, value);
        if (email) {
            blogComment.email = email;
        }
        const url = getUrl(key, value);
        if (url) {
            blogComment.url = url;
        }
    });

    return blogComment;
}



const getId = (key: string, value: WpItem): number | null => {
    if (key.indexOf('comment_id') == -1) {
        return null;
    }
    return parseInt(value["#text"]);
}

const getUserId = (key: string, value: WpItem): number | null => {
    if (key.indexOf('comment_user_id') == -1) {
        return null;
    }
    return parseInt(value["#text"]);

    return null;
}

const getGmt = (key: string, value: WpItem): Date | null => {
    if (key.indexOf('comment_date_gmt') == -1) {
        return null;
    }
    return new Date(value["#text"]);
}

const getDate = (key: string, value: WpItem): Date | null => {
    if (key.indexOf('comment_date') == -1 || key.indexOf('comment_date_gmt') > -1) {
        return null;
    }
    return new Date(value["#text"]);
}

const getAuthor = (key: string, value: WpItem): string | null => {
    if (key.indexOf('comment_author') == -1 || key.indexOf('comment_author_') > -1) {
        return null;
    }
    return resolveAnd(value["#text"]);
}

const getIp = (key: string, value: WpItem): string | null => {
    if (key.indexOf('comment_author_IP') == -1) {
        return null;
    }
    return value["#text"];
}
const getContent = (key: string, value: WpItem): string | null => {
    if (key.indexOf('comment_content') == -1) {
        return null;
    }
    return resolveAnd(value["#text"]);
}

const getEmail = (key: string, value: WpItem): string | null => {
    if (key.indexOf('comment_author_email') == -1) {
        return null;
    }
    return value["#text"];
}

const getUrl = (key: string, value: WpItem): string | null => {
    if (key.indexOf('comment_author_url') == -1) {
        return null;
    }
    return value["#text"];
}


