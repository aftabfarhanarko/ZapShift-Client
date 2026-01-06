import React from "react";
import { HelpCircle, Mail, BookOpen } from "lucide-react";
import { Link } from "react-router";

const Help = () => {
  return (
    <div className="p-3 md:p-5 lg:p-7">
      <h1 className="text-3xl font-bold text-secondary dark:text-white tracking-tight">Help Center</h1>
      <p className="text-mytext/80 dark:text-gray-400 font-medium mt-1">Find answers and contact support.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-purple-500" />
            <p className="text-gray-800 dark:text-gray-200 font-semibold">FAQ</p>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Common questions about parcels, payments, and riders.</p>
          <Link to="/about" className="btn btn-primary mt-4">View FAQs</Link>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-500" />
            <p className="text-gray-800 dark:text-gray-200 font-semibold">Guides</p>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Step-by-step guides for shipments and tracking.</p>
          <a href="#track" className="btn btn-primary mt-4">Tracking Guide</a>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-purple-500" />
            <p className="text-gray-800 dark:text-gray-200 font-semibold">Contact</p>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Reach our support team by email.</p>
          <a href="mailto:support@zapshift.com" className="btn btn-primary mt-4">Email Support</a>
        </div>
      </div>
    </div>
  );
};

export default Help;

