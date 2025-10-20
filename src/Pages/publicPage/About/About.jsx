import React from 'react';

const About = () => {
    return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Jewelry Store</h1>
                        <p className="text-xl opacity-90">Exclusive Collection 2025</p>
                    </div>
                </header>

                {/* Jewelry Gallery */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Ring 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                {/* Image placeholder */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img  className={`rounded-full`} src="src/Pages/publicPage/About/diamond.jpg" alt=""/>
                                    </div>
                                    <p className="text-gray-500">Diamond Ring</p>
                                </div>
                            </div>
                        </div>

                        {/* Ring 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-80 bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center">
                                {/* Image placeholder */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img className={`rounded-full`} src="src/Pages/publicPage/About/gold.jpg" alt=""/>
                                    </div>
                                    <p className="text-gray-500">Gold Ring</p>
                                </div>
                            </div>
                        </div>

                        {/* Necklace 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-80 bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
                                {/* Image placeholder */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img className={`rounded-full`} src="src/Pages/publicPage/About/NECKLACE.jpg" alt=""/>
                                    </div>
                                    <p className="text-gray-500">Pearl Necklace</p>
                                </div>
                            </div>
                        </div>

                        {/* Earrings 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-80 bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
                                {/* Image placeholder */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img className={`rounded-full`} src="src/Pages/publicPage/About/EARRINGS.jpg" alt=""/>
                                    </div>
                                    <p className="text-gray-500">Diamond Earrings</p>
                                </div>
                            </div>
                        </div>

                        {/* Bracelet 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                                {/* Image placeholder */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img className={`rounded-full`} src="src/Pages/publicPage/About/Bracelet.jpg" alt=""/>
                                    </div>
                                    <p className="text-gray-500">Gold Bracelet</p>
                                </div>
                            </div>
                        </div>

                        {/* Collection */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-80 bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center">
                                {/* Image placeholder */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img className={`rounded-full`} src="src/Pages/publicPage/About/logo.png" alt=""/>

                                    </div>
                                    <p className="text-gray-500">Jewelry</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Store Information */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">About Our Jewelry Store</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Our Story</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Founded in 2010, our jewelry store has been creating exquisite pieces
                                            that blend traditional craftsmanship with contemporary design.
                                            Each piece tells a unique story.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Materials</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            We use only the finest materials including 18k gold, sterling silver,
                                            and conflict-free diamonds. All our gems are ethically sourced.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Craftsmanship</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Our master jewelers have decades of experience. Every piece is
                                            handcrafted with precision and attention to detail, ensuring
                                            exceptional quality and durability.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Visit Us</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Located in the heart of the city, our showroom welcomes you
                                            to experience our collections in person. Professional consultants
                                            are available to assist you.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-lg font-semibold mb-2">Jewelry Store</p>
                        <p className="text-gray-400">123 Luxury Avenue, Premium District</p>
                        <p className="text-gray-400">contact@jewelrystore.com | +1 (555) 123-4567</p>
                    </div>
                </footer>
            </div>
        );
};

export default About;