const BASE_URL = "/stops";

export const getStops = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createStop = async (stop: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stop),
  });
  return res.json();
};

export const deleteStop = async (id: number) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
