export async function handleRequest(apiCall) {
  try {
    const response = await apiCall();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
