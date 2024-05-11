import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/split.svg"
        alt="hudhud"
        {...props}
        width={152}
        height={96}
        priority
    />
)
export default Brand