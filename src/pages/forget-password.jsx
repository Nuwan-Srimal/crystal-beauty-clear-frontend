import axios from "axios"
import {  useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ForgetPassword(){
    const [step, setStep] = useState("email")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    async function sendOTP(){
        try{
            await axios.get(import.meta.env.VITE_API_URL + "/api/users/send-otp/"+email)
            toast.success("OTP sent to your email "+email)
            setStep("otp")
        }catch(e){
            console.error(e)
            toast.error("Failed to send OTP. Please try again.")
        }
    }

    async function changePassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        try{

            await axios.post(import.meta.env.VITE_API_URL + "/api/users/change-password",{
                email: email,
                otp: otp,
                newPassword: newPassword
            })
            toast.success("Password changed successfully. Please login with your new password.")
            navigate("/login")
        }catch(e){
            console.error(e)
            toast.error("OTP is incorrect or expired. Please try again.")
            return
        }
    }

    return(
        <div className="w-full h-screen  flex justify-center items-center bg-[url('/bg.jpg')] bg-cover bg-center">
            {step=="email"&&<div className=" w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center p-6">
                <h1 className="text-2xl font-semibold text-secondary mb-6">Reset Password</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="text-white w-full p-3 rounded-lg border border-secondary/20 mb-4 focus:outline-none focus:ring-2 focus:ring-accent"/>
                <button className="w-full bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition" onClick={sendOTP}>Send OTP</button>
            </div>}
            {step=="otp"&&<div className=" w-[400px]  backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center p-6">
                <h1 className="text-2xl font-semibold text-primary mb-6">Reset Password</h1>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="text-white w-full p-3 rounded-lg border border-secondary/20 mb-4 focus:outline-none focus:ring-2 focus:ring-accent"/>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="text-white w-full p-3 rounded-lg border border-secondary/20 mb-4 focus:outline-none focus:ring-2 focus:ring-accent"/>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="text-white w-full p-3 rounded-lg border border-secondary/20 mb-4 focus:outline-none focus:ring-2 focus:ring-accent"/>
                <button className="w-full bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition" onClick={changePassword}>Change Password</button>
            </div>}
        </div>
    )
}