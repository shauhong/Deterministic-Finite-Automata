import { useState } from "react";
import useGlobal from "./useGlobal";

const useData = () => {
    const [loading, setLoading] = useState(false);
    const { openToast } = useGlobal();

    const fetchData = async (text) => {
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        const init = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ text })
        };
        try {
            setLoading(true);
            const response = await fetch("/inference/text", init);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const { matches, patterns } = await response.json();
            return { matches, patterns };
        } catch (error) {
            const message = {
                type: "fail",
                content: "Failed to perform pattern matching"
            };
            openToast(message);
        } finally {
            setLoading(false);
        }
    }

    const fetchSample = async () => {
        try {
            setLoading(true);
            const response = await fetch("/inference/text");
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const { text, matches, patterns } = await response.json();
            console.log(matches);
            console.log(patterns);
            return { text, matches, patterns };

        } catch (error) {
            const message = {
                type: "fail",
                content: "Failed to obtain sample text"
            };
            openToast(message);
        } finally {
            setLoading(false);
        }


    }

    return { loading, fetchData, fetchSample };
}

export default useData;