/* eslint-disable no-undef */
const productCost = [
  { product: "cake", cost: 500 },
  { product: "cookies", cost: 50 },
  { product: "muffins", cost: 100 },
];

function getTopFiveBranches(branchCount) {
  let sortedBranchs = [];

  for (let branch in branchCount) {
    sortedBranchs.push([branch, branchCount[branch]]);
  }
  sortedBranchs.sort(function (a, b) {
    return b[1] - a[1];
  });

  let branchStats = [];
  if (sortedBranchs.length > 5) {
    for (let branch in sortedBranchs.splice(0, 5)) {
      branchStats.push({
        name: sortedBranchs[branch][0],
        count: sortedBranchs[branch][1],
      });
    }
  } else {
    for (let branch in sortedBranchs) {
      branchStats.push({
        name: sortedBranchs[branch][0],
        count: sortedBranchs[branch][1],
      });
    }
    console.log(false);
  }

  return branchStats;
}

function getCount(elementCount, item) {
  if (!elementCount[item]) {
    elementCount[item] = 1;
  } else {
    elementCount[item] += 1;
  }
  return elementCount;
}

function modifyToArray(elementCount) {
  let newArr = [];
  // const elementArr = Object.keys(elementCount);
  for (let item in elementCount) {
    newArr.push({ name: item, count: elementCount[item] });
  }
  return newArr;
}

function calculateRevenueAndOrders(data) {
  let totalRevenueValue = 0;
  let totalOrderValue = 0;

  for (let item in data) {
    totalOrderValue += data[item];
    for (let product in productCost) {
      if (item === productCost[product].product) {
        totalRevenueValue += productCost[product].cost * data[item];
      }
    }
  }

  const totalOrdersData = [{ name: "Total Orders", count: totalOrderValue }];

  const totalRevenueData = [
    {
      name: "Total Order Revenue",
      count: totalRevenueValue,
    },
  ];

  return {
    totalOrdersData,
    totalRevenueData,
    totalOrders: totalOrderValue,
    totalRevenue: totalRevenueValue,
  };
}

function getStats(data) {
  let itemTypeCount = {};
  let orderStateCount = {};
  let branchCount = {};

  for (let item in data) {
    let elementItemType = data[item].itemType.toLowerCase();
    let elementOrderState = data[item].orderState.toLowerCase();
    let elementBranch = data[item].branch.toLowerCase();

    itemTypeCount = getCount(itemTypeCount, elementItemType);
    orderStateCount = getCount(orderStateCount, elementOrderState);
    branchCount = getCount(branchCount, elementBranch);
  }

  const itemTypeStats = modifyToArray(itemTypeCount);
  const orderStateStats = modifyToArray(orderStateCount);
  const branchStats = getTopFiveBranches(branchCount);
  const { totalOrdersData, totalRevenueData, totalOrders, totalRevenue } =
    calculateRevenueAndOrders(itemTypeCount);

  return {
    itemTypeStats,
    orderStateStats,
    branchStats,
    totalOrdersData,
    totalRevenueData,
    totalOrders,
    totalRevenue,
  };
}

module.exports = { getStats };
