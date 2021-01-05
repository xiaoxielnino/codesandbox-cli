import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'xiaoxielnino';
const GITHUB_CLIENT_SECRECT = process.env.GITHUB_CLIENT_SECRET || 'Guanxi2015,,';
console.log('GITHUB_CLIENT_SECRECT===', GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRECT)

function buildContentUrl(
  username: string,
  repo: string,
  branch: string,
  path: string,
) {
  return `${BASE_URL}/${username}/${repo}/contents/${path}?client_id=${GITHUB_CLIENT_ID}&cient_secret=${GITHUB_CLIENT_SECRECT}&ref=${branch}`;
}

export async function fetchContents(
  username: string,
  repo: string,
  branch: string = 'master',
  path: string = '',
) : Promise<Response> {
  try {
    const url = buildContentUrl(username, repo, branch, path);
    const response = await axios.get(url);

    return response.data;
  } catch (e) {
    if(e.response && e.response.status === 404) {
      throw new Error('Could not find the specified repository or directory');
    }
    throw e;
  }
}

/**
 * Download the code fo a github file
 *
 * @export
 * @param {Module} file
 * @returns {Promise<string>}
 */
export async function fetchCode(file: Module): Promise<string> {
  const response = await axios({
    url: file.download_url,
    responseType: 'text',
    headers: {
      Accept: 'text/plain',
    },
    // we need to tell axios not to do anything(dont parse)
    transformResponse: [d => d]
  });

  return response.data;
}