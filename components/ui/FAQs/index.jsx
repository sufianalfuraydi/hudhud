import SectionWrapper from "../../SectionWrapper";

const faqsList = [
    {
        q: "How does analysis effect my business?",
        a: "It will give you comphernive data about your comptitors",
    },
    {
        q: "What are the advantages of using a premium plan?",
        a: "For starters, it will be fit by give you all you want",
    },
    {
        q: "Which types of paid Gold services are available?",
        a: "or now,just the SWOT analysis near will launch the new ",
    },
    {
        q: "How do you generate the info?",
        a: "By using our fine tuninge GPT-4",
    },
    {
        q: "How can Hudhud service help me?",
        a: "There are many benefits to using a Hudhu service. For example, they can help you get more targeted Comptitors.",
    },
    {
        q: "Which are the best Comptitor analysis service providers in the market?",
        a: "There are a lot of Comptitor analysis service providers in the market, but Hudhud is one of the best, and trusted websites in the market",
    },
    
]

const FAQs = () => (
    <SectionWrapper id="faqs">
        <div className="custom-screen text-gray-600">
            <div className="max-w-xl xl:mx-auto xl:text-center">
                <h2 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
                    Frequently asked questions
                </h2>
                <p className="mt-3">
                    Everything you need to know about the product. Can’t find the answer you’re looking for? feel free to {" "}
                    <a
                        className='text-blue-600 hover:text-blue-400 duration-150 font-semibold whitespace-nowrap'
                        href='mailto:sufian112001@gmail.com.com'>
                        contact us
                    </a>.
                </p>
            </div>
            <div className='mt-12'>
                <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                    {faqsList.map((item, idx) => (
                        <li
                            key={idx}
                            className="space-y-3"
                        >
                            <summary
                                className="flex items-center justify-between font-semibold text-gray-700">
                                {item.q}
                            </summary>
                            <p
                                dangerouslySetInnerHTML={{ __html: item.a }}
                                className='leading-relaxed'>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </SectionWrapper>
)

export default FAQs