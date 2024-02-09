import axios from "axios";
import React, { useState } from "react";
import Hero from "../components/Hero";

const Check = () => {
  const [domain, setDomain] = useState('');
  const [bgColor, setBgColor] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  const checkSiteSafety = async () => {
    // Dangerous domains list https://raw.githubusercontent.com/phishfort/phishfort-lists/master/blacklists/domains.json
    try {
      setLoading(true)
      const response = await axios.get(`/api/checksite?domain=${domain}`);
      const siteStatus = response.data;

      if (siteStatus?.safe) {
        setBgColor("#4ade80")
        setMessage("Safe! This site is safe to proceed.")
      } else if (siteStatus?.warning) {
        setMessage("Warning! This site detected as potential phishing risk.")
        setBgColor("#fbbf24")

      } else if (siteStatus?.dangerous) {
        setMessage("Danger! This site marked as phishing.")
        setBgColor("#ef4444")
      }
      else {
        setMessage("This site has no any record in the threat database")
      }

      setLoading(false)

    } catch (error) {
      console.error("Error checking site safety:", error);
      setLoading(false)
    }
  };

  return (
    <section className="dark:bg-gray-900 min-h-screen" style={{
        backgroundColor: bgColor
    }}>
        <Hero bg={bgColor} />
        <div className="px-4 mx-auto max-w-2xl flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center">
            <div className="sm:col-span-2 w-full">
                <label className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-white">Domain or URL to Analyze</label>
                <input type="text" name="name" id="name" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type domain to check"
                onChange={(e) => setDomain(e.target.value)}
                />
            </div>
        </div>
          <button type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-primary-800"
          onClick={checkSiteSafety}
          >
              {loading ? "Checking..." : "Check URL"}
          </button>
          <p className="py-5 text-xl">{message && message}</p>
        </div>

    </section>
  );
}

export default Check;


