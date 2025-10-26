import React from 'react';

const News = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Jewelry News & Trends</h1>
                    <p className="text-xl opacity-90">Latest Updates from the World of Jewelry</p>
                </div>
            </header>

            {/* Jewelry News Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Diamond Trends */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-500">
                        <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-semibold text-center text-sm">DIAMOND TRENDS</span>
                                </div>
                                <p className="text-gray-500">2024 Collection</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">New Diamond Cutting Technique Revealed</h3>
                            <p className="text-gray-600 mb-4">
                                Master jewelers introduce revolutionary cutting method that enhances brilliance by 40%...
                            </p>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>Diamonds</span>
                                <span>Yesterday</span>
                            </div>
                        </div>
                    </div>

                    {/* Gold Market */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-yellow-500">
                        <div className="h-64 bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-semibold text-center text-sm">GOLD MARKET</span>
                                </div>
                                <p className="text-gray-500">Price Update</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Gold Prices Reach New High This Season</h3>
                            <p className="text-gray-600 mb-4">
                                24K gold prices surge as demand for luxury jewelry increases globally...
                            </p>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>Gold</span>
                                <span>3 hours ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Pearl Discovery */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-pink-500">
                        <div className="h-64 bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-semibold text-center text-sm">PEARL NEWS</span>
                                </div>
                                <p className="text-gray-500">Rare Find</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Rare Black Pearl Discovered in South Pacific</h3>
                            <p className="text-gray-600 mb-4">
                                Exceptional natural black pearl found, estimated value over $1 million...
                            </p>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>Pearls</span>
                                <span>1 day ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Designer Collection */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-purple-500">
                        <div className="h-64 bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-semibold text-center text-sm">DESIGNER NEWS</span>
                                </div>
                                <p className="text-gray-500">New Launch</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Famous Designer Unveils Sustainable Jewelry Line</h3>
                            <p className="text-gray-600 mb-4">
                                Eco-friendly collection features recycled metals and ethically sourced gems...
                            </p>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>Design</span>
                                <span>5 hours ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Wedding Jewelry */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-green-500">
                        <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-semibold text-center text-sm">WEDDING TRENDS</span>
                                </div>
                                <p className="text-gray-500">2024 Styles</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Vintage Wedding Rings Make a Comeback</h3>
                            <p className="text-gray-600 mb-4">
                                Art Deco and Victorian styles dominate this year's wedding jewelry trends...
                            </p>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>Wedding</span>
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Technology in Jewelry */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-indigo-500">
                        <div className="h-64 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-semibold text-center text-sm">TECHNOLOGY</span>
                                </div>
                                <p className="text-gray-500">Innovation</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3D Printing Revolutionizes Custom Jewelry</h3>
                            <p className="text-gray-600 mb-4">
                                New technology allows for intricate designs previously impossible to create...
                            </p>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>Innovation</span>
                                <span>1 week ago</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Industry Insights */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Jewelry Industry Insights</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-purple-600 font-bold">15%</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Market Growth</h3>
                                <p className="text-gray-600">Luxury jewelry segment expansion</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 font-bold">87%</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Online Sales</h3>
                                <p className="text-gray-600">E-commerce growth in jewelry</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-pink-600 font-bold">New</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Trends</h3>
                                <p className="text-gray-600">Sustainable materials emerging</p>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Stay Updated with Jewelry World</h3>
                            <p className="text-gray-600 mb-4">
                                From market trends to designer collections and rare gem discoveries,
                                we bring you the latest news from the fascinating world of jewelry.
                            </p>
                            <div className="text-sm text-gray-500">
                                Daily updates on gems, metals, designs, and industry news
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-lg font-semibold mb-2">Jewelry News Network</p>
                    <p className="text-gray-400">Your source for the latest in jewelry trends and industry updates</p>
                    <p className="text-gray-400 mt-2">Contact: news@jewelrynetwork.com | Features: features@jewelrynetwork.com</p>
                </div>
            </footer>
        </div>
    );
};

export default News;