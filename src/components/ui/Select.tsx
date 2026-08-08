import type {
  SelectHTMLAttributes,
} from "react";


interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {

  label?: string;

  options: Array<{
    value: string;
    label: string;
  }>;

}


export function Select({
  label,
  options,
  className = "",
  ...props
}: SelectProps) {

  return (

    <label className="block text-sm text-slate-300">

      {
        label && (
          <span className="mb-2 block">
            {label}
          </span>
        )
      }


      <select

        className={
          `
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-950/70
          px-3
          py-2.5
          text-sm
          outline-none
          transition
          focus:border-slate-500
          ${className}
          `.trim()
        }

        {...props}

      >

        <option value="">
          Selecciona una opción
        </option>


        {
          options.map((option) => (

            <option
              key={option.value}
              value={option.value}
            >

              {option.label}

            </option>

          ))
        }


      </select>


    </label>

  );

}