// api/support.js

const BASE_URL = 'http://localhost:8082/support'; // your Spring Boot backend

// Submit a new request
export const submitSupportRequest = async (requestData) => {
  const response = await fetch(`${BASE_URL}/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });
  if (!response.ok) throw new Error('Failed to submit request');
  return response.json();
};

// Get all requests
export const getAllRequests = async () => {
  const response = await fetch(`${BASE_URL}/requests`);
  if (!response.ok) throw new Error('Failed to fetch requests');
  return response.json();
};

// Update request status (accept/reject)
export const updateRequestStatus = async (trackingId, status, helperName = '', helperPhone = '') => {
  const response = await fetch(`${BASE_URL}/request/${trackingId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, helperName, helperPhone }),
  });
  if (!response.ok) throw new Error('Failed to update request');
  return response.json();
};