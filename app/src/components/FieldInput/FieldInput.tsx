import { TextField } from '@mui/material';
import { Field } from 'react-final-form';
import type { FieldInputProps } from './types';

export default function FieldInput({ name, label, type }: FieldInputProps) {
  return (
    <Field name={name}>
      {({input, meta}) => (
        <TextField
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          label={label}
          type={type}
          error={meta.modified && meta.error}
          helperText={meta.modified && meta.error}
          fullWidth
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    </Field>
  );
}
