export const getRecords = async () => {
  const res = await fetch("/api/records");
  const json = await res.json();
  return json.data;
};

export const deleteRecord = async (id) => {
  const res = await fetch(`/api/records?id=${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
