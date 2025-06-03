import axios from 'axios'

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */


async function fetchModel (url){
  const data = await axios.get(url)
  return data.data
}

export default fetchModel;
