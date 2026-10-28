
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

export async function getCustomers() {
  const data = await fetchData("customers");
  return data._embedded?.customers ?? [];
}

export async function getTrainings() {
  return fetchData("gettrainings");
}
