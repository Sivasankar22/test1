function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
      <span className="text-xl font-bold">{title}</span>
      <span className="text-3xl">{value}</span>
      {icon && <span>{icon}</span>}
    </div>
  );
}
export default DashboardCard;
