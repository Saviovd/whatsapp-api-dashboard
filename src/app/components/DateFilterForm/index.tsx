import React from 'react';

interface DateFilterFormProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}

const DateFilterForm: React.FC<DateFilterFormProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  onClear,
}) => {
  return (
    <form onSubmit={onSearch} className="flex gap-4 items-center mt-4 bg-gray-100 p-4 rounded-md">
      <div>
        <label className="block text-gray-700">Data de início:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">Data de fim:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Buscar
      </button>
      <button
        type="button"
        onClick={onClear}
        className="bg-gray-400 text-white px-4 py-2 rounded-md"
      >
        Limpar
      </button>
    </form>
  );
};

export default DateFilterForm;
