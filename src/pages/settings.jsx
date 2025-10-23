import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [image, setImage] = useState(null);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName); 
            setUser(res.data);           
        }).catch(() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
        });
    }, []);

	// No-ops per your spec (wire your API calls here)
	async function updateUserData() {
        const data = {
            firstName: firstName,
            lastName: lastName,
            image : user.image
        }
        if(image !=null){
            const link = await mediaUpload(image);
            image.profilePicture = link;
        }

        await axios.put(import.meta.env.VITE_API_URL + "/api/users/me", data,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(()=>{
            alert("Profile updated successfully");
        }).catch((err)=>{
            console.error("Error updating profile:", err);
            alert("Failed to update profile");
        })
        navigate("/")

    };
	async function updatePassword() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        await axios.put(import.meta.env.VITE_API_URL + "/api/users/me/password", {
            password: password,
        },{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(()=>{
            toast.success("Password updated successfully");
            setPassword("");
            setConfirmPassword("");
        }).catch((err)=>{
            console.error("Error updating password:", err);
            toast.error("Failed to update password");
        });
        navigate("/")
    };

	const imagePreview = useMemo(
		() => (image ? URL.createObjectURL(image) : ""),
		[image]
	);
	const pwdMismatch =
		password && confirmPassword && password !== confirmPassword;

	return (
		<div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row justify-center">
			{/* Left: User Info */}
			<div className="w-full lg:w-[40%] backdrop-blur-2xl rounded-2xl m-8 p-6 flex flex-col bg-primary/70 shadow-xl ring-1 ring-secondary/10">
				<h1 className="text-2xl font-bold mb-6 text-center text-secondary">
					User Settings
				</h1>

				{/* Avatar + Uploader */}
				<div className="flex items-center gap-4 mb-6">
					<div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/60 shrink-0">
						{imagePreview ? (
							<img
								src={imagePreview}
								alt="Profile preview"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full grid place-items-center bg-secondary/10 text-secondary/60 text-sm">
								No Photo
							</div>
						)}
					</div>

					<label className="inline-flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer bg-white/70 hover:bg-white transition border border-secondary/10">
						<span className="text-sm font-medium text-secondary">
							Upload Photo
						</span>
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const f =
									e.target.files && e.target.files[0]
										? e.target.files[0]
										: null;
								setImage(f);
							}}
						/>
					</label>
				</div>

				{/* Names */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label className="text-sm text-secondary/80 mb-1">First name</label>
						<input
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Jane"
							className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 outline-none focus:ring-2 focus:ring-accent/50"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-sm text-secondary/80 mb-1">Last name</label>
						<input
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Doe"
							className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 outline-none focus:ring-2 focus:ring-accent/50"
						/>
					</div>
				</div>

				{/* Save */}
				<div className="mt-6">
					<button
						onClick={updateUserData}
						className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-accent text-white font-semibold hover:opacity-90 active:opacity-80 transition shadow"
					>
						Save Profile
					</button>
				</div>
			</div>

			{/* Right: Password */}
			<div className="w-full lg:w-[40%] backdrop-blur-2xl rounded-2xl m-8 p-6 flex flex-col bg-primary/70 shadow-xl ring-1 ring-secondary/10">
				<h2 className="text-2xl font-bold mb-6 text-center text-secondary">
					Change Password
				</h2>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<label className="text-sm text-secondary/80 mb-1">
							New password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 outline-none focus:ring-2 focus:ring-accent/50"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm text-secondary/80 mb-1">
							Confirm new password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
							className="px-3 py-2 rounded-xl bg-white/80 border border-secondary/10 outline-none focus:ring-2 focus:ring-accent/50"
						/>
					</div>

					{pwdMismatch ? (
						<p className="text-sm text-red-600">Passwords do not match.</p>
					) : null}
				</div>

				<div className="mt-6">
					<button
						onClick={updatePassword}
						disabled={!password || !confirmPassword || pwdMismatch}
						className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-accent text-white font-semibold hover:opacity-90 active:opacity-80 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Update Password
					</button>
				</div>
			</div>
		</div>
	);
}