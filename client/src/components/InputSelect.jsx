/* eslint-disable react/prop-types */
const InputSelect = ({ name, label, items, defaultValue = "", onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label || name}
      </label>
      <div className="mt-2">
        <select
          name={name}
          id={name}
          onChange={onChange}
          className="block bg-white capitalize w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-50 sm:text-sm sm:leading-6"
          defaultValue={defaultValue}
        >
          {items.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default InputSelect;