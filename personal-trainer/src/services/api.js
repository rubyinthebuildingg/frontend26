
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function jsonOptions(method, data) {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

// CUSTOMERS

export async function getCustomers() {
  const data = await apiRequest("customers");
  return data._embedded?.customers ?? [];
}

export async function addCustomer(customer) {
  return apiRequest("customers", jsonOptions("POST", customer));
}

export async function updateCustomer(id, customer) {
  return apiRequest(
    `customers/${id}`,
    jsonOptions("PUT", customer)
  );
}

export async function deleteCustomer(id) {
  return apiRequest(`customers/${id}`, {
    method: "DELETE",
  });
}

// TRAININGS

export async function getTrainings() {
  return apiRequest("gettrainings");
}

export async function addTraining(training, customerUrl) {
  return apiRequest(
    "trainings",
    jsonOptions("POST", {
      date: training.date.toISOString(),
      activity: training.activity,
      duration: Number(training.duration),
      customer: customerUrl,
    })
  );
}

export async function deleteTraining(id) {
  return apiRequest(`trainings/${id}`, {
    method: "DELETE",
  });
}
