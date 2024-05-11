import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import GradientWrapper from "../../GradientWrapper";
import Button from "../Button";
import loaderAnimation from '/public/loader.json'; // Ensure the path to your loader JSON is correct

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Hero = () => {
    const [inputText, setInputText] = useState('');
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
        const promptText = `Analyze the market for [${inputText}] and generate a detailed report on the key competitors.
        Please start each competitor's section with '### ' followed by their name, include their website if available, and ensure each section is clearly separated.`;

        const data = JSON.stringify({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: promptText }],
            max_tokens: 500,
            temperature: 0.7 
        });

        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Replace with your API key
            'Content-Type': 'application/json'
        };        

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: headers,
                body: data
            });

            const responseText = await response.text();
            console.log('Raw API response:', responseText);

            try {
                const responseData = JSON.parse(responseText);
                if (response.ok && responseData.choices && responseData.choices.length > 0) {
                    const content = responseData.choices[0].message.content;
                    const competitors = extractCompetitors(content);
                    setCompanies(competitors);
                } else {
                    setError('Failed to get a valid response from the API.');
                    console.error('No choices available in response or bad API response:', responseData);
                }
            } catch (innerParseError) {
                setError('Failed to parse the API response as JSON.');
                console.error('JSON parse error:', innerParseError);
            }
        } catch (fetchError) {
            setError('Error when calling the API. Please check the console for more details.');
            console.error('Error calling the OpenAI API:', fetchError);
        } finally {
            setIsLoading(false);
        }
    };

    const extractCompetitors = (content) => {
        const sections = content.split("\n### ").slice(1);
        const competitors = sections.map(section => {
            const [nameLine, ...detailsLines] = section.split("\n");
            const name = nameLine.trim();
            let details = detailsLines.join("\n").trim();

            const websiteMatch = details.match(/https?:\/\/[^\s\)]+/g);
            const website = websiteMatch ? cleanURL(websiteMatch[0]) : null;

            if (website) {
                const websiteRegex = new RegExp(`\\bhttps?:\/\/[^\s\)]+\\b`, 'g');
                details = details.replace(websiteRegex, '').replace(/\[.*?\]\s*\([^)]*\)/g, '').trim();
                details = details.replace(/Website:.*?\n/, '').trim();
            }

            const strengths = extractSection(details, 'Strengths');
            const weaknesses = extractSection(details, 'Weaknesses');
            const opportunities = extractSection(details, 'Opportunities');
            const threats = extractSection(details, 'Threats');

            details = details.replace(/Strengths:.*?(\n|$)/g, '').trim();
            details = details.replace(/Weaknesses:.*?(\n|$)/g, '').trim();
            details = details.replace(/Opportunities:.*?(\n|$)/g, '').trim();
            details = details.replace(/Threats:.*?(\n|$)/g, '').trim();

            return {
                name,
                details,
                website,
                strengths,
                weaknesses,
                opportunities,
                threats
            };
        });

        return competitors.filter(competitor => competitor.name && competitor.details);
    };

    const cleanURL = (url) => {
        return url.replace(/[)\]]/g, '');
    };

    const extractSection = (details, section) => {
        const regex = new RegExp(`${section}:\\s*(.*?)(\\n|$)`, 'i');
        const match = details.match(regex);
        return match ? match[1].trim() : '';
    };

    return (
        <GradientWrapper wrapperClassName="inset-0" className="custom-screen text-gray-600">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
                    Competitor Analysis
                </h1>
                <textarea 
                    className="w-full h-32 p-4 text-gray-800 mb-4"
                    placeholder="Enter your industry or market"
                    value={inputText}
                    onChange={handleInputChange}
                ></textarea>
                <Button onClick={handleSubmit} className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                    Submit
                </Button>
                {isLoading && <Lottie animationData={loaderAnimation} loop />}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {companies.map((company, index) => (
                        <div key={index} className="p-4 bg-white shadow rounded-lg">
                            <h4 className="text-lg font-bold">
                                {company.website ? (
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-black underline">
                                        {company.name}
                                    </a>
                                ) : (
                                    <span className="text-black underline">{company.name}</span>
                                )}
                            </h4>
                            <pre className="text-left whitespace-pre-wrap">{company.details}</pre>
                            {company.strengths && <p><strong>Strengths:</strong> {company.strengths}</p>}
                            {company.weaknesses && <p><strong>Weaknesses:</strong> {company.weaknesses}</p>}
                            {company.opportunities && <p><strong>Opportunities:</strong> {company.opportunities}</p>}
                            {company.threats && <p><strong>Threats:</strong> {company.threats}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </GradientWrapper>
    );
};

export default Hero;
