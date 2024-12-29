export const fetchWilayahName = async (
  id: string | undefined,
  type: "province" | "district" | "regency"
) => {
  const response = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/${type}/${id}.json`
  );

  const data = await response.json();
  return data.name;
};