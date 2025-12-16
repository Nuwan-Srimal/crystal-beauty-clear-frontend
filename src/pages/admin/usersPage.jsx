import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";


function UserBlockConfirm({ user, close, refresh }) {
  const email = user.email;

  function blockUser() {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/block/" + email,
        { isBlock: !user.isBlock },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        close();
        toast.success("User block status changed successfully");
        refresh();
      })
      .catch(() => toast.error("Failed to change user block status"));
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-3">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-secondary">
          Confirm Action
        </h2>

        <p className="text-sm text-secondary/70 mb-6 text-center">
          Are you sure you want to{" "}
          <span className="font-semibold">
            {user.isBlock ? "unblock" : "block"}
          </span>{" "}
          this user?
          <br />
          <span className="font-mono text-xs">{email}</span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-secondary/5"
          >
            Cancel
          </button>
          <button
            onClick={blockUser}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}


export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to access admin panel");
        navigate("/login");
        return;
      }

      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [search, users]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">

      {isBlockConfirmVisible && (
        <UserBlockConfirm
          user={userToBlock}
          close={() => setIsBlockConfirmVisible(false)}
          refresh={() => setIsLoading(true)}
        />
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-secondary">
            Users
          </h1>
          <p className="text-xs sm:text-sm text-secondary/60">
            Manage platform users and roles
          </p>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[320px] rounded-xl border border-secondary/20 bg-white px-4 py-2 text-sm focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mb-2 text-xs sm:text-sm text-secondary/60">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      <div className="sm:hidden space-y-3 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.email}
              className={`rounded-2xl bg-white shadow border border-secondary/10 p-4 flex gap-4 ${
                user.isBlock ? "opacity-60" : ""
              }`}
            >
              <img
                src={user.image}
                referrerPolicy="no-referrer"
                alt={user.firstName}
                className={`h-14 w-14 rounded-full object-cover border-4 ${
                  user.isBlock ? "border-red-500" : "border-green-500"
                }`}
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-secondary">
                    {user.firstName} {user.lastName}
                  </h3>
                  {user.isEmailVerified && (
                    <MdVerified className="text-blue-500" />
                  )}
                </div>

                <p className="text-xs text-secondary/60 break-all">
                  {user.email}
                </p>

                <div className="flex items-center gap-2 mt-2 text-sm">
                  {user.role === "admin" && (
                    <MdOutlineAdminPanelSettings className="text-accent" />
                  )}
                  <span className="capitalize">{user.role}</span>
                </div>

                <button
                  onClick={() => {
                    setUserToBlock(user);
                    setIsBlockConfirmVisible(true);
                  }}
                  className={`mt-3 rounded-full px-4 py-1.5 text-xs font-semibold text-white ${
                    user.isBlock
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.isBlock ? "Unblock User" : "Block User"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden sm:flex flex-1 rounded-2xl bg-white shadow border border-secondary/10 overflow-hidden">
        <div className="w-full overflow-x-auto overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="sticky top-0 bg-secondary text-white">
                <tr>
                  <th className="px-4 py-3 text-xs uppercase">Image</th>
                  <th className="px-4 py-3 text-xs uppercase">Email</th>
                  <th className="px-4 py-3 text-xs uppercase">First Name</th>
                  <th className="px-4 py-3 text-xs uppercase">Last Name</th>
                  <th className="px-4 py-3 text-xs uppercase">Role</th>
                  <th className="px-4 py-3 text-xs uppercase text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.email}
                    className={`hover:bg-accent/5 ${
                      user.isBlock ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <img
                        src={user.image}
                        referrerPolicy="no-referrer"
                        alt={user.firstName}
                        className={`h-14 w-14 rounded-full object-cover border-4 ${
                          user.isBlock
                            ? "border-red-500"
                            : "border-green-500"
                        }`}
                      />
                    </td>

                    <td className="px-4 py-3 font-mono flex items-center gap-2">
                      {user.email}
                      {user.isEmailVerified && (
                        <MdVerified className="text-blue-500" />
                      )}
                    </td>

                    <td className="px-4 py-3">{user.firstName}</td>
                    <td className="px-4 py-3">{user.lastName}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {user.role === "admin" && (
                          <MdOutlineAdminPanelSettings className="text-accent" />
                        )}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setUserToBlock(user);
                          setIsBlockConfirmVisible(true);
                        }}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold text-white ${
                          user.isBlock
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-secondary/60">
                      No matching users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
