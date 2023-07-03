import { useEffect, useState } from 'react'
import { dataApiUrl } from 'src/lib/baseURLs';

const usePriceInforbarChart = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        // Function to fetch data from your API
        const fetchData = async () => {
            try {
                const response = await fetch(`${dataApiUrl}/price-volatility`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data initially
        fetchData();

        // Polling interval in milliseconds (e.g., every 5 seconds)
        const pollingInterval = 1000;

        // Polling logic
        const interval = setInterval(fetchData, pollingInterval);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures the effect runs only once
    return {
        data,
    }
}

export default usePriceInforbarChart