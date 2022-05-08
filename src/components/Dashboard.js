import { useState, useRef, useEffect } from "react";
import { useData } from "../hooks";
import { Spinner } from '../components';
const Dashboard = () => {
    const [text, setText] = useState("");
    const [matches, setMatches] = useState([]);
    const [patterns, setPatterns] = useState([]);
    const { loading, fetchData, fetchSample } = useData();

    const textRef = useRef(null);
    const backRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.textContent = text;
        }
    }, [text, matches, patterns])

    const visualize = (text) => {
        let i = 0;
        const visualized = [];
        matches.forEach(match => {
            const [start, end] = match;
            if (i < start - 1) {
                visualized.push(text.slice(i, start));
            }
            i = end + 1;
            const span = <span className="bg-neutral-700 text-transparent">{text.slice(start, end + 1)}</span>
            visualized.push(span);
        });
        visualized.push(text.slice(i))

        return visualized
    }

    const handleChange = (e) => {
        setText(e.target.value);
        console.log(e.target.value.split(""));
        matches.forEach(match => console.log(match));
        setMatches(matches.filter(match => match[1] < e.target.value.split("").length));
    }

    const handleSubmit = async () => {
        const { matches, patterns } = await fetchData(text);
        setMatches(matches);
        setPatterns(patterns)
    }

    const handleSample = async () => {
        const { text, matches, patterns } = await fetchSample();
        setText(text);
        setMatches(matches);
        setPatterns(patterns);
    }

    const handleReset = () => {
        setText("");
        setMatches([]);
        setPatterns([]);
    }

    const handleScroll = () => {
        const top = textRef.current.scrollTop;
        backRef.current.scrollTo(0, top);
    }

    return (
        <div className="flex-1 bg-neutral-900 grid grid-cols-12 pt-2">
            {/* Main Panel */}
            <div className="col-span-8">
                <div className="h-[38rem] bg-neutral-800 my-4 rounded-md flex flex-col max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto">
                    <div className="px-4 py-2 border-neutral-700 border-b">
                        <span className="text-white opacity-80 font-semibold ">Text</span>
                    </div>
                    <div className="flex-1 relative" >
                        {
                            loading
                                ?
                                <Spinner />
                                :
                                <div className="h-full w-full relative">
                                    <div className="h-full w-full px-3 py-2 text-transparent absolute top-0 whitespace-pre-wrap overflow-auto hide-scrollbar" ref={backRef}>
                                        {
                                            visualize(text)
                                        }
                                    </div>
                                    <textarea className="h-full w-full bg-transparent text-white opacity-80 border-0 hide-scrollbar resize-none overflow-y-auto hide-scrollbar" placeholder="Insert text here" value={text} onChange={handleChange} onScroll={handleScroll} ref={textRef} />
                                </div>
                        }
                    </div>


                </div>
                <div className="flex justify-center space-x-8">
                    <button className="bg-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-500" onClick={handleSubmit}>
                        <span className=" text-sm font-semibold text-white opacity-80">Submit</span>
                    </button>
                    <button className="bg-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-500" onClick={handleSample}>
                        <span className=" text-sm font-semibold text-white opacity-80">Sample</span>
                    </button>
                    <button className="bg-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-500" onClick={handleReset}>
                        <span className=" text-sm font-semibold text-white opacity-80">Reset</span>
                    </button>
                </div>
            </div >

            {/* Side Panel */}
            < div className="col-span-4 space-y-8" >
                <div className="h-96 bg-neutral-800 my-4 mx-8 rounded-md flex flex-col">
                    <div className="px-4 py-2 border-neutral-700 border-b">
                        <span className="text-white opacity-80 font-semibold ">Match Information</span>
                    </div>
                    <div className="flex-1 px-4 relative overflow-auto hide-scrollbar">
                        {
                            loading
                                ?
                                <Spinner />
                                :
                                matches.map((match, index) =>
                                    <div className="text-white opacity-80 text-sm grid grid-cols-12 gap-x-2 py-2 border-b border-neutral-700" key={index}>
                                        <span className="col-span-3">Match {index + 1}</span>
                                        <span className="col-span-3">{match[0]} - {match[1]}</span>
                                        <span className="col-span-6">{patterns[index]}</span>
                                    </div>
                                )
                        }
                    </div>
                </div>

                <div className="h-48 bg-neutral-800 my-4 mx-8 rounded-md flex flex-col">
                    <div className="px-4 py-2 border-neutral-700 border-b">
                        <span className="text-white opacity-80 font-semibold ">Summary</span>
                    </div>
                    <div className="flex-1 px-4 py-2 relative">
                        {
                            loading
                                ?
                                <Spinner />
                                :
                                <div className="text-white opacity-80 gap-y-4 grid grid-cols-12 row-span-3">
                                    <span className="col-span-4">Words</span>
                                    <span className="col-span-8">{text.split(" ").length}</span>
                                    <span className="col-span-4">Matches</span>
                                    <span className="col-span-8">{matches.length}</span>
                                    <span className="col-span-4">Status</span>
                                    <span className="col-span-8 font-semibold">{matches.length > 0 ? "Accept" : "Reject"}</span>
                                </div>
                        }
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard;