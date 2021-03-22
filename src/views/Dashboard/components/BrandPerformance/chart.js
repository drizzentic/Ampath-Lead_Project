const getLabels = (brandlift) => {
  let labelSet = new Set(); // hold the date labels
  const brandsMap = new Map(); // hold brandlift data for all brands

  const dateMap = new Map(); // hold data for each date
  brandlift.forEach((element) => {
    // set label dates
    labelSet.add(element.date);

    // set data for each brands
    if (dateMap.has(element.date)) {
      const current = dateMap.get(element.date);
      dateMap.set(element.date, [...current, { ...element }]);
    } else {
      dateMap.set(element.date, [{ ...element }]);
    }

    // set brandlift data for all brands
    if (brandsMap.has(element.product_service)) {
      const current = brandsMap.get(element.product_service);
      brandsMap.set(element.product_service, [...current, element.brandlift]);
    } else {
      brandsMap.set(element.product_service, [element.brandlift]);
    }
  });

  let productMap = new Map(); // hold data per date 
  const labels = [...labelSet];
  labels.forEach((label) => {
    let value = [...dateMap.get(label)];
    // get brands per date
    productMap.set(
      label,
      value.map((pr) => pr.product_service)
    );
  });

  // merge all products
  let products = [];
  productMap.forEach((value) => {
    products.push(...value);
  });

  const allBrands = [...new Set(products)];
  // generate datasets
  const datasets = [];
  allBrands.forEach((key) => {
    const data = [...brandsMap.get(key)];
    datasets.push({
      name: key || "None",
      data: data.map((v) => v * 100),
    });
  });
  return {
    labels,
    datasets,
  };

};

export const data = (brandlift) => {
  const summary = getLabels(brandlift);

  return {
    labels: summary.labels,
    datasets: summary.datasets,
  };
};
