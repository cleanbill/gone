import { BlogPost } from "@/types"
import { display } from "@/utils/dates";

type Props = {
    item: BlogPost
    index: number;
}

const Comments = (props: Props) => {

    const item = props.item;
    const index = props.index;

    return (
        item.comments.length > 0 &&
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
        </div>
    )
}

export default Comments;