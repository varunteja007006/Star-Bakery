/* eslint-disable no-undef */

// static array of each product cost
const productCost = [
  { product: "cake", cost: 500 },
  { product: "cookies", cost: 50 },
  { product: "muffins", cost: 100 },
];

// getTopFiveBranches function to get top 5 branches
function getTopFiveBranches(branchCount) {
  let sortedBranchs = [];

  /* 
  branchCount is [{},{},{},...] we convert it to [[],[],[],...] for sorting
  we sort in descending order hence b - a 
  */
  for (let branch in branchCount) {
    sortedBranchs.push([branch, branchCount[branch]]);
  }
  sortedBranchs.sort(function (a, b) {
    return b[1] - a[1];
  });

  let branchStats = [];

  /*
  Now we get the bar chart data for the top 5 branches
  if sorted branches greater than 5 we splice it else we do not
  */
  if (sortedBranchs.length > 5) {
    sortedBranchs.splice(5);
    for (let branch in sortedBranchs) {
      branchStats.push({
        name: sortedBranchs[branch][0],
        count: sortedBranchs[branch][1],
      });
    }
    return branchStats;
  } else {
    for (let branch in sortedBranchs) {
      branchStats.push({
        name: sortedBranchs[branch][0],
        count: sortedBranchs[branch][1],
      });
    }
    return branchStats;
  }
}

/*
  getCount function to count number of times an 'item' as repeated. 'elementCount' records the each 'item' count.  
  If an 'item' is already present in elementCount then count increases else add the 'item' 'elementCount'
  with initial count of 1  
*/
function getCount(elementCount, item) {
  if (!elementCount[item]) {
    elementCount[item] = 1;
  } else {
    elementCount[item] += 1;
  }
  return elementCount;
}

/*
  function modifyToArray to convert the {item:32, item:56, ...} to 
  [{ name: item, count: 32 }, { name: item, count: 56 }]  to be used in bar chart 
*/
function modifyToArray(elementCount) {
  let newArr = [];
  for (let item in elementCount) {
    newArr.push({ name: item, count: elementCount[item] });
  }
  return newArr;
}

/*
  calculateRevenueAndOrders function to calculate the :
  1. total orders count
  2. total revenue 
  3. bar chart data of total orders and total revenue
 */

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
