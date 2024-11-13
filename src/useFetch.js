import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: abortController.signal });
                if (!response.ok) {
                    throw new Error('Could not fetch the data for that resource');
                }
                const data = await response.json();
                setData(data);
                setIsPending(false);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message || 'An unknown error occurred');
                    console.error('Fetch error:', err); // Added logging for diagnostic purposes
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;



// import { useState, useEffect } from "react";

// const useFetch = (url) => {
//     const[data, setData] = useState(null);
//     const[isPending, setIsPending] = useState(true);
//     const[error,setError] = useState(null);

//     useEffect( () => {

//         const abortController = new AbortController();

//         setTimeout(() => {
//             fetch(url, {signal: abortController.signal})
//             .then(res => {
//                 if (!res.ok) { 
//                     throw Error('Could not fetch the data for that resource');
//                 } 
//                 return res.json();
//             })
//             .then(data => {
//                 setIsPending(false);
//                 setData(data);
//                 setError(null);
//             })
//             .catch(err => {
//                 if(err.name === 'AbortError') {
//                     console.log('Fetch aborted');
//                 } else {
//                     setIsPending(false);
//                     setError(err.message);
//                 }
//             })
//             }, 100);

//             return () => abortController.abort();

//         }, [url]);

//     return {
//         data,
//         isPending,
//         error
//     };
// };

// export default useFetch;



//custom hooks need start with 'use'