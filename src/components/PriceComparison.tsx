interface PriceComparisonProps {
  newPrice: string;
  usedPrice: string;
}

export default function PriceComparison({ newPrice, usedPrice }: PriceComparisonProps) {
  // Extract numeric values from price strings (e.g., "$35,000 - $45,000" -> [35000, 45000])
  const extractPriceRange = (priceStr: string) => {
    const matches = priceStr.match(/\$([\d,]+)/g);
    if (!matches) return [0, 0];
    return matches.map(price => parseInt(price.replace(/[$,]/g, '')));
  };

  const [newMin, newMax] = extractPriceRange(newPrice);
  const [usedMin, usedMax] = extractPriceRange(usedPrice);

  // Calculate the percentage difference
  const calculatePercentageDiff = (used: number, newPrice: number) => {
    return ((used - newPrice) / newPrice) * 100;
  };

  const minDiff = calculatePercentageDiff(usedMin, newMin);
  const maxDiff = calculatePercentageDiff(usedMax, newMax);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">New Price</h4>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{newPrice}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Used Price</h4>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{usedPrice}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {minDiff > 0 ? (
            <span className="text-green-600 dark:text-green-400">
              Used prices are {Math.round(minDiff)}% - {Math.round(maxDiff)}% higher than new
            </span>
          ) : (
            <span className="text-blue-600 dark:text-blue-400">
              Used prices are {Math.abs(Math.round(minDiff))}% - {Math.abs(Math.round(maxDiff))}% lower than new
            </span>
          )}
        </p>
      </div>
    </div>
  );
} 