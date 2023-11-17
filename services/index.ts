const API_URL = 'http://demo9184597.mockable.io';

const API_SERVICES = {
  users: `${API_URL}/users`,
  roles:`${API_URL}/roles`,
};

const fetcher = (url:string) => fetch(url).then((res) => res.json()); 

export {API_SERVICES, fetcher};