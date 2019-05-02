export const Select = ({ title, options }) => {
  return (
    <div className="select">
      <label>{title}</label>
      <select>
        {options.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );
}