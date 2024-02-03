// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  const {
    query: { domain },
  } = req;

  try {
    const response = await axios.get(`https://lookup.phishfort.com/api/lookup?domain=${domain}`);
    console.log(response)
    res.status(200).json(response?.data)
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
}
