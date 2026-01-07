import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/useAuth";
import axios from "axios";
import useAxiosSecoir from "../Hook/useAxiosSecoir";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Image as ImageIcon, Upload, ArrowRight } from "lucide-react";

const Register = () => {
  const naviget = useNavigate();
  const [show, setShow] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const { userCreat, profilesUpdeat, googleLogin } = useAuth();
  const axiosSecoir = useAxiosSecoir();

  // Watch for file input changes to show preview
  const photoFile = watch("photo");
  React.useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [photoFile]);

  const handelData = (data) => {
    const email = data.email;
    const password = data.password;
    const displayName = data.name;
    const profileImg = data.photo[0];

    userCreat(email, password)
      .then(() => {
        toast.success("User Created Successfully");
        
        // Image Upload to ImgBB
        const fromData = new FormData();
        fromData.append("image", profileImg);

        const api_img_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imge_hoset
        }`;

        axios.post(api_img_url, fromData).then((res) => {
          const photoURL = res?.data?.data?.url;
          
          const savedDB = {
            displayName,
            photoURL,
            email,
            password, // Note: Storing password in DB is generally not recommended for security, keeping as per original code
          };

          axiosSecoir
            .post("/svuser", savedDB)
            .then((res) => {
              if (res.data.data) {
                toast.success("User Saved to Database");
              }
            })
            .catch((err) => {
              toast.warning(err.code);
            });

          profilesUpdeat({ displayName, photoURL })
            .then(() => {
              toast.success("Profile Updated Successfully");
              naviget("/");
            })
            .catch((err) => {
              toast.warning(err.code);
            });
        });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then((data) => {
        const savedDB = {
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email: data.user.email,
        };
        axiosSecoir.post("/svuser", savedDB).then((res) => {
          toast.success("Created User Successfully");
          naviget("/");
        });
      })
      .catch((err) => {
        toast.warning(err.code);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Brand / Visual */}
        <div className="md:w-5/12 bg-[#03373D] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#B8E55C] blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-400 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <img src="/nnewcopy.png" alt="ZapShift" className="h-20 w-auto object-contain mb-6" />
            <p className="text-gray-300 text-sm">Join the Logistics Revolution</p>
          </div>

          <div className="relative z-10 my-10 md:my-0">
            <h3 className="text-2xl font-semibold mb-4 text-[#B8E55C]">Start Your Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              Create an account to send parcels, track shipments, and manage your logistics with ease.
            </p>
          </div>

          <div className="relative z-10 text-xs text-gray-400">
            © 2024 ZapShift Inc.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-8 md:p-12 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#03373D] mb-2">Create Account</h1>
            <p className="text-gray-500">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit(handelData)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs ml-1">Name is required</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs ml-1">Email is required</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={show ? "password" : "text"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.password.type === "required" && "Password is required"}
                  {errors.password.type === "minLength" && "Must be at least 6 characters"}
                  {errors.password.type === "pattern" && "Must include uppercase, lowercase, number & special char"}
                </p>
              )}
            </div>

            {/* Photo Upload Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <ImageIcon size={18} />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: true })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#B8E55C]/20 file:text-[#03373D] hover:file:bg-[#B8E55C]/30"
                  />
                </div>
                {imagePreview && (
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#B8E55C] shadow-sm flex-shrink-0">
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              {errors.photo && <p className="text-red-500 text-xs ml-1">Profile photo is required</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#B8E55C] hover:bg-[#a3d33f] text-[#03373D] font-bold py-3.5 rounded-xl shadow-lg shadow-[#B8E55C]/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Upload size={20} />
              Sign Up
            </motion.button>
          </form>

          <div className="mt-6 mb-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-medium">Or join with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleRegister}
            className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#03373D] hover:text-[#B8E55C] hover:underline transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
