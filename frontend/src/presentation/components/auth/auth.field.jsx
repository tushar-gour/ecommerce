const AuthField = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600 tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 bg-white border border-border rounded-2xl text-gray-800
          placeholder:text-gray-400 focus:outline-none transition-all duration-300 text-sm"
      />
    </div>
  );
};

export default AuthField;
