import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
           

            {/* Hero Section */}
            <div className="flex-grow py-4 bg-blue-100 flex items-center justify-center text-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Secure Your Digital Life</h2>
                    <p className="text-gray-600 mb-6">Effortlessly manage and secure your passwords at one place.</p>
                    <Link to={'/ManagePassword'} className="text-white bg-green-500 hover:bg-green-700 font-medium py-2 px-6 rounded">
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="container px-10 py-12">
                <h3 className="text-2xl text-center font-bold mb-6">Why Choose Key Keeper?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 shadow-lg rounded-lg hover:shadow-xl transition">
                        <h4 className="font-bold mb-3">Highly Secure</h4>
                        <p>Uses advanced encryption to keep your passwords safe and secure.</p>
                    </div>
                    <div className="p-4 shadow-lg rounded-lg hover:shadow-xl transition">
                        <h4 className="font-bold mb-3">Easy to Use</h4>
                        <p>Simple, intuitive interface that makes managing your passwords a breeze.</p>
                    </div>
                    <div className="p-4 shadow-lg rounded-lg hover:shadow-xl transition">
                        <h4 className="font-bold mb-3">Accessible Everywhere</h4>
                        <p>Access your passwords from any device, anywhere at any time.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gray-800 text-white py-12 text-center">
                <h3 className="text-xl font-bold mb-2">Ready to take control of your passwords?</h3>
                <p className="mb-6">Sign up today and start securing your digital life.</p>
                <Link to={'/Signup'}  className="text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-6 rounded">
                    Sign Up Now
                </Link >
            </div>

          
        </div>
    );
}

export default HomePage;
