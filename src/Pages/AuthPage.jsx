// src/components/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [focusedInput, setFocusedInput] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
        }
        window.location.reload()
        try {
            if (isLogin) {
                const response = await fetch('http://localhost:4000/users');
                const users = await response.json();
                const user = users.find(
                    (u) => u.email === formData.email && u.password === formData.password
                );
                if (user) {
                    setMessage('Login successful!');
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', user.name);
                    localStorage.setItem('isAuthenticated', 'true');
                    setTimeout(() => navigate('/dashboard'), 1000);
                } else {
                    setMessage('Invalid credentials');
                }
            } else {
                const check = await fetch('http://localhost:4000/users');
                const existing = await check.json();
                if (existing.find((u) => u.email === formData.email)) {
                    setMessage('User with this email already exists');
                    setLoading(false);
                    return;
                }
                const newUser = {
                    id: Date.now(),
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                };
                const response = await fetch('http://localhost:4000/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });
                if (response.ok) {
                    setMessage('Registration successful!');
                    localStorage.setItem('user', JSON.stringify(newUser));
                    localStorage.setItem('token', newUser.name);
                    localStorage.setItem('isAuthenticated', 'true');
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    setTimeout(() => navigate('/dashboard'), 1000);
                }
            }
        } catch (err) {
            setMessage('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 via-indigo-800 to-slate-900 p-4 relative overflow-hidden">
            {/* Light reflection blobs behind glass */}
            <div className="absolute w-72 h-72 bg-cyan-400/40 blur-[100px] rounded-full top-10 left-10 animate-pulse" />
            <div className="absolute w-96 h-96 bg-indigo-500/30 blur-[120px] rounded-full bottom-0 right-0 animate-pulse" />

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md rounded-[2rem] p-[1px] bg-gradient-to-br from-white/40 via-white/10 to-white/5 shadow-2xl backdrop-blur-[25px] border border-white/30 overflow-hidden"
            >
                {/* Highlight Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-[2rem] opacity-60 pointer-events-none" />

                <div className="relative z-10">
                    <div className="p-6 text-center bg-white/10 backdrop-blur-sm rounded-t-[2rem]">
                        <h1 className="text-3xl font-semibold text-white drop-shadow-lg">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-300 mt-2 text-sm">
                            {isLogin ? 'Sign in to your account' : 'Join us today'}
                        </p>
                    </div>

                    <div className="flex">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 cursor-pointer py-3 font-medium transition-all duration-300 ${
                                isLogin
                                    ? 'bg-white/30 text-white border-b-2 border-sky-300'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 cursor-pointer py-3 font-medium transition-all duration-300 ${
                                !isLogin
                                    ? 'bg-white/30 text-white border-b-2 border-sky-300'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {message && (
                            <div
                                className={`p-3 rounded-lg text-center text-sm ${
                                    message.includes('successful')
                                        ? 'bg-emerald-500/30 text-emerald-100'
                                        : 'bg-rose-500/30 text-rose-100'
                                }`}
                            >
                                {message}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="space-y-4"
                            >
                                {!isLogin && (
                                    <div className="relative">
                                        <FaUser
                                            className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 transition-all duration-300 ${
                                                focusedInput === 'name' ? 'text-sky-300 scale-110' : ''
                                            }`}
                                        />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedInput('name')}
                                            onBlur={() => setFocusedInput('')}
                                            placeholder="Full Name"
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/15 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-sky-300 focus:outline-none transition-all duration-300"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <FaEnvelope
                                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 transition-all duration-300 ${
                                            focusedInput === 'email' ? 'text-sky-300 scale-110' : ''
                                        }`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput('')}
                                        placeholder="Email"
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/15 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-sky-300 focus:outline-none transition-all duration-300"
                                    />
                                </div>

                                <div className="relative">
                                    <FaLock
                                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 transition-all duration-300 ${
                                            focusedInput === 'password' ? 'text-sky-300 scale-110' : ''
                                        }`}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput('')}
                                        placeholder="Password"
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/15 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-sky-300 focus:outline-none transition-all duration-300"
                                    />
                                </div>

                                {!isLogin && (
                                    <div className="relative">
                                        <FaLock
                                            className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 transition-all duration-300 ${
                                                focusedInput === 'confirmPassword'
                                                    ? 'text-sky-300 scale-110'
                                                    : ''
                                            }`}
                                        />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedInput('confirmPassword')}
                                            onBlur={() => setFocusedInput('')}
                                            placeholder="Confirm Password"
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/15 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-sky-300 focus:outline-none transition-all duration-300"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer py-3 rounded-lg bg-sky-400/50 backdrop-blur-sm text-white font-semibold hover:bg-sky-400/70 transition-all duration-300 transform hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                    {isLogin ? 'Signing in...' : 'Creating account...'}
                                </div>
                            ) : isLogin ? (
                                'Sign In'
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="bg-white/5 p-4 text-center border-t border-white/20 rounded-b-[2rem]">
                        <p className="text-gray-300 text-sm">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sky-300 cursor-pointer hover:text-white font-semibold transition-colors duration-300"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
