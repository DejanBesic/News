export const handleNetworkFailure = (errorResponse) =>
  Promise.reject(
    new Error({
      errorResponse,
      message: 'Ensure you are connected to the internet and try again',
      status: 0,
      type: 'Network failure',
    })
  );

export const fetchPromise = (url) =>
  Promise.resolve(fetch(url))
    .catch(() => handleNetworkFailure())
    .then((res) => res.json());
