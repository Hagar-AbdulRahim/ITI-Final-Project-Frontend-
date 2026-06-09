import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { loginStart, loginSuccess, loginFailure } from '../../redux/authSlice';
import { loginUser } from '../../services/authApi';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());
      const res = await loginUser(data);
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message || 'حدث خطأ في تسجيل الدخول'));
      toast.error('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fbf9f6] font-sans">
      {/* Right Side - Image & Content */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-[#154b23]">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Livestock cows in a green field"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        <div className="absolute inset-0 z-20 flex flex-col p-12 text-white justify-between">
          <div className="flex justify-start">
            <h2 className="text-xl font-bold">LivestockCare AI</h2>
          </div>
          
          <div className="flex flex-col mb-20 max-w-lg">
            <h3 className="text-3xl font-bold mb-4 leading-tight text-right">الذكاء الاصطناعي في خدمة الثروة الحيوانية</h3>
            <p className="text-lg text-white/90 leading-relaxed text-right">
              نحن نوفر لك الأدوات الذكية لمراقبة صحة قطيعك، تحسين الإنتاجية باستمرار بأحدث تقنيات التعلم الآلي.
            </p>
          </div>

          <div className="flex justify-start">
            <p className="text-xs text-white/70">© 2024 LivestockCare AI لتقنيات بيطرية مبتكرة. مستدام.</p>
          </div>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#fdfdfd]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
            <p className="text-sm text-gray-600">مرحباً بك مجدداً! يرجى إدخال بياناتك للوصول إلى لوحة التحكم.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="email"
              label="البريد الإلكتروني أو رقم الهاتف"
              placeholder="example@livestock.ai"
              type="text"
              iconRight={<Mail size={18} />}
              error={errors.email?.message}
              {...register('email', {
                required: 'البريد الإلكتروني مطلوب',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'صيغة البريد الإلكتروني غير صحيحة',
                },
              })}
            />

            <Input
              id="password"
              label="كلمة المرور"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              iconRight={<Lock size={18} />}
              iconLeft={
                showPassword ? (
                  <EyeOff size={18} onClick={() => setShowPassword(false)} />
                ) : (
                  <Eye size={18} onClick={() => setShowPassword(true)} />
                )
              }
              error={errors.password?.message}
              {...register('password', {
                required: 'كلمة المرور مطلوبة',
                minLength: {
                  value: 6,
                  message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
                },
              })}
            />

            <div className="flex items-center justify-between mt-2">
              <Link to="/forgot-password" className="text-sm font-medium text-[#154b23] hover:underline">
                نسيت كلمة المرور؟
              </Link>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#154b23] focus:ring-[#154b23]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 mr-2">
                  تذكرني
                </label>
              </div>
            </div>

          ذ