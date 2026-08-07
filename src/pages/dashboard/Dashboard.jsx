import {
  Users,
  Shield,
  KeyRound,
  Activity,
} from "lucide-react";

const cards = [
  {
    title: "Total Users",
    value: 124,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Roles",
    value: 5,
    icon: Shield,
    color: "bg-green-500",
  },
  {
    title: "Permissions",
    value: 32,
    icon: KeyRound,
    color: "bg-yellow-500",
  },
  {
    title: "Active Sessions",
    value: 18,
    icon: Activity,
    color: "bg-red-500",
  },
];

const activities = [
  {
    action: "Created new role",
    user: "Admin",
    time: "2 min ago",
  },
  {
    action: "Updated permission",
    user: "Manager",
    time: "10 min ago",
  },
  {
    action: "Added new user",
    user: "Super Admin",
    time: "20 min ago",
  },
];

export default function Dashboard() {

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="rounded-xl bg-white p-6 shadow"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`${card.color} rounded-xl p-3 text-white`}
                >

                  <Icon size={28} />

                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* Recent Activity */}

      <div className="rounded-xl bg-white shadow">

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="px-6 py-3 text-left">
                Action
              </th>

              <th className="px-6 py-3 text-left">
                User
              </th>

              <th className="px-6 py-3 text-left">
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {activities.map((activity, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {activity.action}
                </td>

                <td className="px-6 py-4">
                  {activity.user}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {activity.time}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}