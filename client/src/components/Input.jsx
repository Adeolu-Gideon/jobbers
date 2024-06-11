/* eslint-disable react/prop-types */
const Input = ({type, placeholder, name, label, className, required, defaultValue, onChange}) => {
  
  return (
    <>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label || name}
        </label>
        <div className="mt-2">
          <input
            id={name}
            name={name}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onChange}
            autoComplete={type}
            required={required}
            className={`block bg-white w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-50 sm:text-sm sm:leading-6 ${className}`}
          />
        </div>
      </div>
    </>
  );
}
export default Input