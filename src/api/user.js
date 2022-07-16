const login = async (username, password) => {
  const us = await fetch("http://localhost:1560/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "content-type": "application/json",
    },
  });
  const dataJson = await us.json();
  switch (us.status) {
    case 200:
      return await dataJson.data;
    default:
      throw dataJson.message;
  }
};

export { login };
