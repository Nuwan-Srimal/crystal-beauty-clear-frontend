import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";

function UserBlockConfirm(props) {
	const email = props.user.email;
	const close = props.close;
	const refresh = props.refresh;
	function blockUser() {
		const token = localStorage.getItem("token");
		axios
			.put(import.meta.env.VITE_API_URL + "/api/users/block/" + email,{
                isBlock: !props.user.isBlock
            },{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				console.log(response.data);
				close();
				toast.success("User block status changed successfully");
				refresh();
			}).catch(() => {
				toast.error("Failed to change user block status");
			})
	}

	return (
		<div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
			<div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
				<button
					onClick={close}
					className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600"
				>
					X
				</button>
				<p className="text-xl font-semibold text-center">
					Are you sure you want to {props.user.isBlock ? "unblock" : "block"} the user with email: {email}?
				</p>
				<div className="flex gap-[40px]">
					<button
						onClick={close}
						className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent"
					>
						Cancel
					</button>
					<button
						onClick={blockUser}
						className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent"
					>
						Yes
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

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			const token = localStorage.getItem("token");
			if (token == null) {
				toast.error("Please login to access admin panel");
				navigate("/login");
				return;
			}
			axios
				.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response.data);
					setUsers(response.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	return (
		<div className="w-full min-h-full">
			{isBlockConfirmVisible && (
				<UserBlockConfirm
					refresh={() => {
						setIsLoading(true);
					}}
					user={userToBlock}
					close={() => {
						setIsBlockConfirmVisible(false);
					}}
				/>
			)}
			{/* Page container */}
			<div className="mx-auto max-w-7xl p-6">
				{/* Card */}
				<div className="rounded-2xl border border-secondary/10 bg-primary shadow-sm">
					{/* Header bar */}
					<div className="flex items-center justify-between gap-4 border-b border-secondary/10 px-6 py-4">
						<h1 className="text-lg font-semibold text-secondary">Users</h1>
						<span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
							{users.length} users
						</span>
					</div>

					{/* Table wrapper for responsive scrolling */}
					<div className="overflow-x-auto">
						{isLoading ? (
							<Loader />
						) : (
							<table className="w-full min-w-[880px] text-left">
								<thead className="bg-secondary text-white">
									<tr>
										<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
											Image
										</th>
										<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
											Email
										</th>
										<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
											First Name
										</th>
										<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
											Last Name
										</th>
										<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
											Role
										</th>

										<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-center">
											Actions
										</th>
									</tr>
								</thead>

								<tbody className="divide-y divide-secondary/10">
									{users.map((user) => {
										return (
											<tr
												key={user.email}
												className="odd:bg-white even:bg-primary hover:bg-accent/5 transition-colors"
											>
												<td className="px-4 py-3">
													<img
														src={user.image}
														referrerPolicy="no-referrer"
														alt={user.firstName}
														className={
															"h-16 w-16 rounded-full object-cover border-4 " +
															(user.isBlock
																? " border-red-600"
																: "border-green-600")
														}
													/>
												</td>
												<td className="px-4 py-3 font-mono text-sm text-secondary/80 flex items-center gap-2">
													{user.email}
													{user.isEmailVerified && <MdVerified color="blue" />}
												</td>
												<td className="px-4 py-3 font-medium text-secondary">
													{user.firstName}
												</td>
												<td className="px-4 py-3 text-secondary/90">
													{user.lastName}
												</td>
												<td className="px-4 py-3 text-secondary/70 h-full  ">
													<div className="flex items-center gap-2">
														<p className="">
															{user.role == "admin" && (
																<MdOutlineAdminPanelSettings />
															)}
														</p>
														{user.role}
													</div>
												</td>

												<td className="px-4 py-3">
													<div className="flex items-center justify-center gap-3">
														{
															<button
                                                                onClick={()=>{
                                                                    setUserToBlock(user)
                                                                    setIsBlockConfirmVisible(true)
                                                                }}
                                                                className="w-[100px] h-[30px] rounded-full cursor-pointer text-white bg-accent hover:bg-accent/70">
																{user.isBlock ? "Unblock" : "Block"}
															</button>
														}
													</div>
												</td>
											</tr>
										);
									})}
									{users.length === 0 && (
										<tr>
											<td
												className="px-4 py-12 text-center text-secondary/60"
												colSpan={7}
											>
												No products to display.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}