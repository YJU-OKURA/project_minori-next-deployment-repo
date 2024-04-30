const TimePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div>
      <input
        type="time"
        className="w-30 h-12 border-2 rounded-lg px-2"
        value={value}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default TimePicker;
