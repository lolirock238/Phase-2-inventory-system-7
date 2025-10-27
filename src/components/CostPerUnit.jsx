import React from "react";

const CostPerUnit = ({ cost, currency = "Kes", className = "" }) => {
  const formatCost = (amount) => {
    return `${currency}${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <span className={`cost-per-unit ${className}`}>{formatCost(cost)}</span>
  );
};

export default CostPerUnit;
