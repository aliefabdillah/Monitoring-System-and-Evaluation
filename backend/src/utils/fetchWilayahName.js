const fetchWilayahName = async (id, type) => {
  const response = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/${type}/${id}.json`,
  );

  const data = await response.json();
  return data.name;
};

module.exports = fetchWilayahName;
