import React from 'react';

const StatCard = ({ title, value, icon, trend, color = 'primary' }) => {
  return (
    <div className="card-warm p-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}/10`}>{icon}</div>
        {trend && <span className="text-green-600 text-sm font-medium">+{trend}</span>}
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;


