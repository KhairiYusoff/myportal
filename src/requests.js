export const login = async (params) => {
  const res = await fetch("/api/v4/auth/token", {
    method: "POST",
    headers: {
      "X-API-KEY": "INFINIDESK_WEB",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: params.username,
      password: params.password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.token;
  } else {
    throw new Error("Login failed");
  }
};

export const fetchUserDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const res = await fetch("/api/v4/users/self", {
    headers: {
      "X-API-KEY": "INFINIDESK_WEB",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Failed to fetch user details");
  }
};
