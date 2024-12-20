import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

type propsType = Omit<AutocompleteProps<any, any, any, any>, 'onChange' | 'options' | 'renderInput'>;

export interface UiMaterialAutoCompleteItem {
  label: string;
  value: unknown;
}

export interface UiMaterialAutoCompleteProps extends propsType {
  readonly label: string;
  readonly value: unknown;
  readonly options?: UiMaterialAutoCompleteItem[];
  readonly onChange: (value: UiMaterialAutoCompleteItem | null) => void;
  readonly className?: string;
  readonly nonClearable?: boolean;
}

export function UiMaterialAutoComplete({ label, value, onChange, options, nonClearable = true, ...rest }: UiMaterialAutoCompleteProps) {
  return (
    <Autocomplete
      size={'small'}
      value={options?.find((item) => item.value === value) ?? null}
      fullWidth
      disablePortal
      clearIcon={nonClearable ? null : undefined}
      options={options || []}
      onChange={(e, v) => onChange(v)}
      {...rest}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
