import { useReadOnly } from '../context/ReadOnlyContext';

interface ReadOnlyFieldProps {
  value: any;
  readOnlyValue?: React.ReactNode;
  readOnlyClassName?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  as?: 'input' | 'textarea' | 'select';
  children?: React.ReactNode;
}

export const useReadOnlyField = ({
  value,
  readOnlyValue,
  readOnlyClassName = '',
  inputProps = {},
  as = 'input',
  children,
}: ReadOnlyFieldProps) => {
  const { isReadOnly } = useReadOnly();

  if (isReadOnly) {
    const displayValue = readOnlyValue !== undefined ? readOnlyValue : value;
    
    return {
      readOnly: true,
      disabled: true,
      className: `bg-gray-50 ${readOnlyClassName}`,
      'aria-readonly': true,
      'data-readonly': true,
      value: displayValue,
      children: as === 'select' && displayValue ? (
        <option value={value}>
          {displayValue}
        </option>
      ) : null,
    };
  }

  return {
    ...inputProps,
    value,
    children,
  };
};

// Example usage:
/*
// For input fields
const inputProps = useReadOnlyField({
  value: formData.name,
  readOnlyValue: formData.name || 'Not provided',
  inputProps: {
    onChange: (e) => handleChange('name', e.target.value),
    className: 'form-input'
  }
});

<input {...inputProps} />

// For select fields
const selectProps = useReadOnlyField({
  value: formData.status,
  as: 'select',
  inputProps: {
    onChange: (e) => handleChange('status', e.target.value),
    className: 'form-select'
  }
});

<select {...selectProps}>
  <option value="">Select a status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>
*/
