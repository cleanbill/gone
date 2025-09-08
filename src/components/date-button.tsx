
type Props = {

    index: number,
    name: string,
    select: Function
}

const DateButton = (props: Props) => {

    const index = props.index;
    const select = props.select;
    const name = props.name;

    return (
        <>
            <button onClick={() => select(index+244)} title={"" + index + 244} key={index}
                className="mt-1 text-gray-500 bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring 
                 focus:ring-yellow-300 rounded-xl h-10 w-24 p-2 ">{name}</button>


        </>
    )
}

export default DateButton;
