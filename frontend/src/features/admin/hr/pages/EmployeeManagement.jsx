import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEdit,
  FiEye,
  FiTrash2,
  FiBriefcase,
  FiMapPin,
} from "react-icons/fi";

export default function EmployeeManagement({
  loading,
  overview = {},
  employees = [],
  search = "",
  onSearch,
  onRefresh,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Employees",
      value: overview.totalEmployees ?? 0,
      icon: FiUsers,
      color: "bg-blue-500",
    },
    {
      title: "Departments",
      value: overview.departments ?? 0,
      icon: FiBriefcase,
      color: "bg-green-500",
    },
    {
      title: "Active Employees",
      value: overview.activeEmployees ?? 0,
      icon: FiUserPlus,
      color: "bg-purple-500",
    },
    {
      title: "Branches",
      value: overview.branches ?? 0,
      icon: FiMapPin,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Employee Management
          </h2>

          <p className="text-gray-500">
            Manage employees, hierarchy, departments and branches.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white shadow-sm p-5"
            >
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} p-3 rounded-xl text-white`}>
                  <Icon size={22}/>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400"/>

            <input
              value={search}
              onChange={(e)=>onSearch?.(e.target.value)}
              placeholder="Search employee..."
              className="w-full border rounded-lg py-2 pl-10 pr-4"
            />

          </div>

          <button className="border rounded-lg px-5">
            <FiFilter className="inline mr-2"/>
            Filter
          </button>

        </div>

      </div>

      {/* Employee Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Designation</th>
              <th className="p-4 text-left">Branch</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {employees.map((emp)=>(
              <tr
                key={emp.id}
                className="border-t"
              >

                <td className="p-4">
                  {emp.name}
                </td>

                <td className="p-4">
                  {emp.department}
                </td>

                <td className="p-4">
                  {emp.designation}
                </td>

                <td className="p-4">
                  {emp.branch}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">
                    {emp.status}
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={()=>onView?.(emp)}
                      className="border rounded p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onEdit?.(emp)}
                      className="border rounded p-2"
                    >
                      <FiEdit/>
                    </button>

                    <button
                      onClick={()=>onDelete?.(emp)}
                      className="border rounded p-2 text-red-600"
                    >
                      <FiTrash2/>
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
