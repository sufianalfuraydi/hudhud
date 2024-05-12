import SectionWrapper from "../../SectionWrapper"

const stats = [
    {
        data: "95K+",
        desc: "Active websites around the world."
    },
    {
        data: "150M",
        desc: "Startups around the world"
    },
    {
        data: "11B+",
        desc: " spend per month."
    },
    {
        data: "70%",
        desc: "most people are using Hudhud in their startups."
    },
]

const Stats = () => (
    <SectionWrapper>
        <div className="custom-screen text-gray-600">
            <div className="max-w-xl xl:mx-auto xl:text-center">
                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Get your busines to the top of market
                </h3>
                <p className="mt-3">
                    We distribute your visitors to your site across different geographical locations.
                </p>
            </div>
            <div className="mt-12">
                <ul className="flex-wrap gap-x-12 gap-y-10 items-center space-y-8 sm:space-y-0 sm:flex xl:justify-center">
                    {
                        stats.map((item, idx) => (
                            <li key={idx} className="sm:max-w-[15rem]">
                                <h4 className="text-4xl text-blue-600 font-semibold">{item.data}</h4>
                                <p className="mt-3 font-medium">{item.desc}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </SectionWrapper>
)

export default Stats