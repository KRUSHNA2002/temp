import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [newJoinings, setNewJoinings] = useState(0);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [removedNotifications, setRemovedNotifications] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const [totalBookings, setTotalBookings] = useState(0);
const [totalServices, setTotalServices] = useState(0);
const [totalGalleryPics, setTotalGalleryPics] = useState(0);

  const user = JSON.parse(localStorage.getItem("auth_user"));
  const role = user?.role || "staff";

  const API_URL = "https://photography-xzfi.onrender.com/api/employees/allemployees";

  /* ================= LOAD REMOVED NOTIFICATIONS ================= */
  useEffect(() => {
    setRemovedNotifications(
      JSON.parse(localStorage.getItem("removed_notifications") || "[]")
    );
  }, []);

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    if (role === "admin") fetchDashboardData();
  }, [role, selectedYear]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      if (!result.success) return;

      const employees = result.data;

      const bookingsRes = await fetch(
  "https://photography-xzfi.onrender.com/api/bookings/all"
);

const bookingsData = await bookingsRes.json();

setTotalBookings(bookingsData.data.length);



const servicesRes = await fetch(
  "https://photography-xzfi.onrender.com/api/services"
);

const servicesData = await servicesRes.json();

setTotalServices(servicesData.length);



const galleryRes = await fetch(
  "https://photography-xzfi.onrender.com/api/gallery"
);

const galleryData = await galleryRes.json();

setTotalGalleryPics(galleryData.data.length);

      setTotalEmployees(employees.length);

      const now = new Date();
      setNewJoinings(
        employees.filter(emp => {
          if (!emp.dateOfJoining) return false;
          const d = new Date(emp.dateOfJoining);
          return d.getMonth() === now.getMonth() &&
                 d.getFullYear() === now.getFullYear();
        }).length
      );

      setRecentEmployees(
        [...employees]
          .filter(emp => emp.dateOfJoining)
          .sort((a, b) => new Date(b.dateOfJoining) - new Date(a.dateOfJoining))
          .slice(0, 5)
      );

      const years = [...new Set(
        employees
          .filter(e => e.dateOfJoining)
          .map(e => new Date(e.dateOfJoining).getFullYear())
      )].sort((a, b) => b - a);

      setAvailableYears(years);
      const year = selectedYear ?? years[0];
      setSelectedYear(year);

      const monthMap = Array(12).fill(0);
      employees.forEach(emp => {
        if (!emp.dateOfJoining) return;
        const d = new Date(emp.dateOfJoining);
        if (d.getFullYear() === year) monthMap[d.getMonth()]++;
      });

      setMonthlyData(
        monthMap.map((count, i) => ({
          month: new Date(0, i).toLocaleString("en", { month: "short" }),
          employees: count,
        }))
      );
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  const removeNotification = id => {
    const updated = [...removedNotifications, id];
    setRemovedNotifications(updated);
    localStorage.setItem("removed_notifications", JSON.stringify(updated));
  };

  /* ================= UI ================= */
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, <span className="font-medium">{user?.username}</span>
        </p>
      </div>

      {role !== "admin" ? (
        <AccessDenied />
      ) : (
        <>
          {/* STATS */}
          {/* STATS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <StatCard
    title="Total Employees"
    value={totalEmployees}
    variant="blue"
  />

  {/* <StatCard
    title="New Joinings"
    value={newJoinings}
    variant="green"
  /> */}

  <StatCard
    title="Total Bookings"
    value={totalBookings}
    variant="purple"
  />

  <StatCard
    title="Total Services"
    value={totalServices}
    variant="orange"
  />

  <StatCard
    title="Gallery Pictures"
    value={totalGalleryPics}
    variant="pink"
  />

</div>

          {/* CHART */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Employee Joining – {selectedYear}
              </h3>
              <select
                value={selectedYear || ""}
                onChange={e => setSelectedYear(Number(e.target.value))}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {availableYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="employees" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>



          {/* RECENT EMPLOYEES TABLE */}
<Card>

  <div className="flex justify-between items-center mb-6">

    <h3 className="text-xl font-semibold text-gray-800">
      Employee Details
    </h3>

    <span className="text-sm text-gray-500">
      Recently Joined : {recentEmployees.length}
    </span>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full divide-y divide-gray-200">

      <thead className="bg-slate-100">

        <tr>

          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
            Employee
          </th>

          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
            Email
          </th>

          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
            Role
          </th>

          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
            Joining Date
          </th>

          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
            Status
          </th>

        </tr>

      </thead>

      <tbody className="divide-y divide-gray-100 bg-white">

        {recentEmployees.map((emp) => (

          <tr
            key={emp._id}
            className="hover:bg-slate-50 transition"
          >

            {/* Employee */}
            <td className="px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {emp.firstName?.charAt(0)}
                </div>

                <div>

                  <p className="font-medium text-gray-800">
                    {emp.firstName} {emp.lastName}
                  </p>

                  <p className="text-sm text-gray-500">
                    ID: {emp._id.slice(-6)}
                  </p>

                </div>

              </div>

            </td>

            {/* Email */}
            <td className="px-6 py-4 text-gray-600">
              {emp.email}
            </td>

            {/* Role */}
            <td className="px-6 py-4">

              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                {emp.role || "Employee"}
              </span>

            </td>

            {/* Joining Date */}
            <td className="px-6 py-4 text-gray-600">

              {new Date(emp.dateOfJoining).toLocaleDateString()}

            </td>

            {/* Status */}
            <td className="px-6 py-4">

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                Active
              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</Card>
        </>
      )}
    </section>

    
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
    {children}
  </div>
);

const StatCard = ({ title, value, variant }) => {
  const styles = {
  blue: "from-blue-500 to-blue-600",
  green: "from-emerald-500 to-emerald-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  pink: "from-pink-500 to-pink-600",
};

  return (
    <div className={`rounded-2xl p-6 text-white bg-gradient-to-r ${styles[variant]} shadow`}>
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
};

const AccessDenied = () => (
  <div className="bg-white rounded-xl p-6 shadow">
    <h3 className="text-lg font-semibold text-red-600">
      Access Restricted
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      You do not have permission to view this page.
    </p>
  </div>
);

export default AdminDashboard;
