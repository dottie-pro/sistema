import ReactDatePicker, { DatePickerProps } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import { InputMask } from "@react-input/mask";
import { FaCalendarDays } from "react-icons/fa6";

export const DatePicker: React.FC<DatePickerProps> = ({ ...props }) => {
  return (
    <div>
      <ReactDatePicker
        {...props}
        customInput={<InputMask mask="__/__/____" replacement={{ _: /\d/ }} />}
        locale={ptBR}
        showIcon={true}
        icon={<FaCalendarDays className="text-neutral-700" />}
        placeholderText="Selecione uma data"
        dateFormat="dd/MM/yyyy"
        className={`text-sm text-neutral-900 p-2.5 rounded-lg border border-neutral-300 bg-neutral-50 focus:ring-blue-500 focus:border-blue-500 ${props.className}`}
      />
    </div>
  );
};
