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
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refresh_token);
    localStorage.setItem("expires", data.expires);
    return data;
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

export const refreshToken = async () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!token) {
    throw new Error("No token found. Cannot refresh token.");
  }

  const res = await fetch(`/api/v4/auth/token/refresh`, {
    method: "POST",
    headers: {
      "X-API-KEY": "INFINIDESK_WEB",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refresh_token);
    return data;
  } else {
    throw new Error("Failed to refresh token");
  }
};
