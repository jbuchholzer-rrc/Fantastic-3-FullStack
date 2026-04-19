const BASE_URL = "/api/stops";

export const getStops = async (token: string) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch stops");

  return res.json();
};

export const createStop = async (stop: any, token: string) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(stop),
  });

  if (!res.ok) throw new Error("Failed to create stop");

  return res.json();
};

export const deleteStop = async (id: number, token: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete stop");
};