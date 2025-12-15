import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="w-full h-full space-y-10 bg-white rounded-2xl p-5 overflow-y-hidden">


      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Dashboard
        </h1>
        <p className="text-sm text-secondary/60">
          Monitor store performance and activity
        </p>
      </div>

      {/* cards*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total Orders"
          value="50+"
          icon={<MdShoppingCartCheckout size={22} />}
          accent="from-accent to-orange-400"
        />
        <KpiCard
          title="Products"
          value="10+"
          icon={<BsBox2Heart size={22} />}
          accent="from-emerald-500 to-green-400"
        />
        <KpiCard
          title="Users"
          value="100+"
          icon={<HiOutlineUsers size={22} />}
          accent="from-blue-500 to-sky-400"
        />
        <KpiCard
          title="Performance"
          value="90%"
          icon={<FaChartLine size={22} />}
          accent="from-rose-500 to-pink-400"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/*analytics*/}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-secondary">
              Analytics Overview
            </h2>
            <span className="text-xs text-secondary/50">
              Last 30 days
            </span>
          </div>

          <div className="flex justify-between mb-8">
            {["Start", "Process", "Review", "Complete"].map((label, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold shadow ${
                    index % 2 === 0 ? "bg-accent" : "bg-secondary"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-secondary/60">{label}</span>
              </div>
            ))}
          </div>

          {/*stats*/}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <MiniStat label="Revenue" value="LKR 22.6K" />
            <MiniStat label="Conversion" value="62%" />
            <MiniStat label="Success Rate" value="89%" />
          </div>

          {/*chart*/}
          <div className="h-56 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-sm text-secondary/40 border border-secondary/10">
            Sales & Traffic Chart
          </div>
        </div>

        {/*performance*/}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6 text-secondary">
            System Performance
          </h2>

          {/*indicator*/}
          <div className="flex justify-center mb-8">
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 rounded-full border-[12px] border-primary" />
              <div className="absolute inset-0 rounded-full border-[12px] border-accent border-t-transparent rotate-[288deg]" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-secondary">
                80%
              </div>
            </div>
          </div>

          {/*bars*/}
          <div className="space-y-4">
            <Progress label="New Orders" value="70%" />
            <Progress label="Processing" value="50%" />
            <Progress label="Completed" value="90%" />
          </div>
        </div>
      </div>
    </div>
  );
}


function KpiCard({ title, value, icon, accent }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg p-5 hover:shadow-xl transition">
      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${accent}`} />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary/60">{title}</p>
          <h2 className="text-2xl font-bold text-secondary">{value}</h2>
        </div>
        <div
          className={`w-12 h-12 rounded-xl text-white flex items-center justify-center bg-gradient-to-br ${accent}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-primary rounded-xl p-4 border border-secondary/10">
      <p className="text-xs text-secondary/60">{label}</p>
      <h3 className="text-lg font-semibold text-secondary">{value}</h3>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1 text-secondary/70">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-primary rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}
