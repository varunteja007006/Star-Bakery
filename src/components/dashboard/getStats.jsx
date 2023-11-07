async function getStats(data, itemproperty) {
  let stats = {};
  let arrStats = [];

  if (data) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index][itemproperty].toLowerCase();

      // item type count
      if (element) {
        if (!stats[element]) {
          stats[element] = 1;
        } else {
          stats[element] = stats[element] + 1;
        }
      }
    }
  }

  let statsKeys = Object.keys(stats);

  // item type bar chart data
  for (let index = 0; index < statsKeys.length; index++) {
    let obj = {};
    const element = statsKeys[index];
    obj["name"] = element;
    obj["count"] = stats[element];
    arrStats.push(obj);
  }

  return arrStats;
}

export default getStats;
