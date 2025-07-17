import { useEffect, useState } from 'react';
import { token } from "../config";
 

const useFetchData = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => { 
            setLoading(true);
            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                
                const result = await res.json();
                
                if (!res.ok) {
                    throw new Error(result.message + '🤯');
                }
                
                setData(result.data);
                setLoading(false);
            } catch (err) {
                
                setError(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, loading, error }; 
};
 
export default useFetchData;

// // import { useEffect, useState } from 'react';
// // import { token } from "../config";

// // const useFetchData = (url) => {
// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             setLoading(true);
// //             try {
// //                 const res = await fetch(url, {
// //                     headers: { 
// //                         Authorization: `Bearer ${token}`,
// //                         'Content-Type': 'application/json'
// //                     }
// //                 });
                
// //                 const result = await res.json();
                
// //                 if (!res.ok) {
// //                     throw new Error(result.message || 'Failed to fetch data');
// //                 }
                
// //                 setData(result.data);
// //                 setLoading(false);
// //             } catch (err) {
// //                 setError(err.message);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, [url]);

// //     return { data, loading, error };
// // };

// // // Export as both default and named
// // export const useGetProfile = useFetchData;
// // export default useFetchData;

//chatgpt new code

// import { useEffect, useState } from 'react';
// import { token } from "../config";

// const useFetchData = url => {
//     const [data, setData] = useState(null);    // 🔥 Make it NULL instead of []
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(url, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
                
//                 const result = await res.json();

//                 if (!res.ok) {
//                     throw new Error(result.message || 'Failed to fetch data');
//                 }
                
//                 setData(result.data);   // 🔥 store object
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [url]);

//     return { data, loading, error }; 
// };

// export default useFetchData;
