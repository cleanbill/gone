import Image from "next/image";

type Props = {
    image: string
    alt: string
}

const Picture = (props: Props) => {
    const { image, alt } = props;

    return (
        <>
            {image.indexOf('mont') > -1 &&
                <div className="justify-self-center  rounded-full">
                    <Image priority title={image} src={image} width={1000} height={200} alt={alt}></Image>
                </div>
            }
            {
                image.indexOf('mont') == -1 &&
                <Image priority className="justify-self-center rounded-3xl" alt={alt} title={image} src={image} width={700} height={200} ></Image>
            }
        </>

    )

}

export default Picture;