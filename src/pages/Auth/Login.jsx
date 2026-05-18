import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Eye, EyeOff, Sun, Moon, Languages } from 'lucide-react'
import { useState } from 'react'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const { dark, setDark, toggleLang, lang } = useTheme()
  const [showPass, setShowPass] = useState(false)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('بريد إلكتروني غير صحيح').required('مطلوب'),
      password: Yup.string().min(6, 'على الأقل 6 أحرف').required('مطلوب'),
    }),
    onSubmit: (values) => {
      // Mock login
      login({ name: 'Ahmed', email: values.email })
      navigate('/')
    }
  })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg flex items-center justify-center p-4">
      {/* Top controls */}
      <div className="fixed top-4 left-4 flex items-center gap-2">
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 hover:scale-105 transition-all"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 hover:scale-105 transition-all"
        >
          <Languages size={14} />
          {lang === 'ar' ? 'EN' : 'ع'}
        </button>
      </div>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            ايبلا<span className="text-sky-400">.</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {lang === 'ar' ? 'مرحباً بك مجدداً' : 'Welcome back'}
          </p>
        </div>

        {/* Card */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('تسجيل الدخول')}
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                {t('البريد الإلكتروني')}
              </label>
              <input
                name="email"
                type="email"
                className="input-base"
                placeholder="example@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                {t('كلمة المرور')}
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  className="input-base pe-10"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 end-3 flex items-center text-gray-400"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary mt-2"
            >
              {t('دخول')}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-5">
            {t('ليس لديك حساب؟')}{' '}
            <Link to="/register" className="text-sky-500 font-semibold hover:underline">
              {t('أنشئ حساباً')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
