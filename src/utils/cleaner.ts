import { BlogComment, BlogPost, LinkParts, Stop } from '@/types';
import { clean } from './jsonCleaner';


// export const deepClean = () => {
//     import('../../wfr.json').then((rawBlog) => {
//         const posts = rawBlog.rss.channel.item.map((item: any) => {
//             const better = clean(item);
//             return better;
//         });

//         const allImages = posts.map((p: BlogPost) => {
//             const linkImages = p.links
//                 .map((bl: LinkParts): string => {
//                     if (!bl.imageAttributes) {
//                         return "";
//                     }
//                     return bl.imageAttributes.src;
//                 });
//             return linkImages;
//         }).reduce((a: Array<string>, b: Array<string>) => a.concat(b))
//             .filter((src: string) => src.trim().length > 0);

//         const titles = posts.filter((p: BlogPost) => p.title.trim().length > 0);
//         const picturePosts = posts.filter((p: BlogPost) => {
//             if (p.title.trim().length > 0) {
//                 return false;
//             }
//             const found = p.images.filter((im: string) => allImages.indexOf(im) == -1);
//             return found.length > 0;
//         });

//         const allTogetherNow = titles.concat(picturePosts).sort((a: BlogPost, b: BlogPost) => a.date.getTime() - b.date.getTime());

//         allTogetherNow.forEach((bl: BlogPost, index: number) => console.log(index, bl.title));

//         //  setAllPosts(allTogetherNow);
//     });

// }

export const picked = (stop: Stop, allPosts: Array<BlogPost>) => {
    const from = new Date(stop.from).getTime();
    const to = new Date(stop.to).getTime();

    const posts = allPosts
        .map((item: any): BlogPost => {
            const blog = { ...item };
            blog.date = new Date(blog.date);
            blog.comments = blog.comments.map((bc: BlogComment) => {
                bc.date = new Date(bc.date);
                return bc;
            })
            return blog;
        })
        .filter((item: any) => {
            const date = item.date.getTime();

            return from <= date && to >= date
        });

    return posts;
};