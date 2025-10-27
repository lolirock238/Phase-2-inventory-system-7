import React from "react";

const TotalValue = ({
  quantity,
  costPerUnit,
  currency = "Kes",
  className = "",
}) => {
  const calculateTotalValue = () => {
    return quantity * costPerUnit;
  };

  const formatValue = (amount) => {
    return `${currency}${parseFloat(amount).toFixed(2)}`;
  };

  const totalValue = calculateTotalValue();

  return (
    <span className={`total-value ${className}`}>
      {formatValue(totalValue)}
    </span>
  );
};

export default TotalValue;
