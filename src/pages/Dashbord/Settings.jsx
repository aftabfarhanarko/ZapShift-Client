import React, { useState } from "react";
import { Bell, Moon, Sun, Globe } from "lucide-react";

const Toggle = ({ label, checked, onChange, icon }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="flex items-center gap-3">
      {icon && React.createElement(icon, { className: "w-5 h-5 text-purple-500" })}
      <span className="text-gray-800 dark:text-gray-200 font-medium">{label}</span>
    </div>
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  </div>
);

const Select = ({ label, value, onChange, icon, options }) => (
  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="flex items-center gap-3 mb-3">
      {icon && React.createElement(icon, { className: "w-5 h-5 text-purple-500" })}
      <span className="text-gray-800 dark:text-gray-200 font-medium">{label}</span>
    </div>
    <select
      className="select select-bordered w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <div className="p-3 md:p-5 lg:p-7">
      <h1 className="text-3xl font-bold text-secondary dark:text-white tracking-tight">Global Settings</h1>
      <p className="text-mytext/80 dark:text-gray-400 font-medium mt-1">Personalize your dashboard experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Toggle label="Enable Notifications" checked={notifications} onChange={setNotifications} icon={Bell} />
        <Toggle label="Compact Layout" checked={compactMode} onChange={setCompactMode} icon={Moon} />
        <Select
          label="Language"
          value={language}
          onChange={setLanguage}
          icon={Globe}
          options={["English", "বাংলা"]}
        />
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3 mb-3">
            {compactMode ? <Moon className="w-5 h-5 text-purple-500" /> : <Sun className="w-5 h-5 text-purple-500" />}
            <span className="text-gray-800 dark:text-gray-200 font-medium">Theme</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Use the toggle in the sidebar to switch light/dark mode.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
