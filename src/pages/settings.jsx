import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  async function updateUserData() {
    const data = {
      firstName,
      lastName,
      image: user.image,
    };

    if (image != null) {
      const link = await mediaUpload(image);
      image.profilePicture = link;
    }

    await axios.put(import.meta.env.VITE_API_URL + "/api/users/me", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    toast.success("Profile updated");
    navigate("/");
  }

  async function updatePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await axios.put(
      import.meta.env.VITE_API_URL + "/api/users/me/password",
      { password },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    toast.success("Password updated");
    navigate("/");
  }

  const imagePreview = useMemo(
    () => (image ? URL.createObjectURL(image) : ""),
    [image]
  );

  const pwdMismatch =
    password && confirmPassword && password !== confirmPassword;

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      {/*mobile top bar*/}
      <div className="lg:hidden flex items-center gap-3 px-4 py-4 bg-primary/80 backdrop-blur-md shadow">
        <button
          onClick={() => {
            const lastPage = localStorage.getItem("lastVisitedPage");
            navigate(lastPage || "/");
          }}
        >
          <MdArrowBack />
        </button>
        <h1 className="text-lg font-semibold text-secondary">User Settings</h1>
      </div>

      <div className="px-4 py-6 flex flex-col lg:flex-row gap-6 justify-center">

        <div className="w-full lg:w-[40%] backdrop-blur-2xl rounded-2xl p-6 bg-primary/80 shadow-xl ring-1 ring-secondary/10">
          <h2 className="hidden lg:block text-2xl font-bold mb-6 text-center text-secondary">
            User Settings
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/60">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center bg-secondary/10 text-secondary/60 text-sm">
                  No Photo
                </div>
              )}
            </div>

            <label className="px-4 py-2 rounded-xl cursor-pointer bg-white/70 hover:bg-white transition border border-secondary/10 text-sm font-medium text-secondary">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 focus:ring-2 focus:ring-accent/50 outline-none"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 focus:ring-2 focus:ring-accent/50 outline-none"
            />
          </div>

          <button
            onClick={updateUserData}
            className="mt-6 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent text-white font-semibold"
          >
            Save Profile
          </button>
        </div>

        <div className="w-full lg:w-[40%] backdrop-blur-2xl rounded-2xl p-6 bg-primary/80 shadow-xl ring-1 ring-secondary/10">
          <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
            Change Password
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 focus:ring-2 focus:ring-accent/50 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 focus:ring-2 focus:ring-accent/50 outline-none"
            />
            {pwdMismatch && (
              <p className="text-sm text-red-600">Passwords do not match</p>
            )}
          </div>

          <button
            onClick={updatePassword}
            disabled={!password || !confirmPassword || pwdMismatch}
            className="mt-6 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent text-white font-semibold disabled:opacity-50"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
