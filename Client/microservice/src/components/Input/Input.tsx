import { ChangeEvent } from 'react';
import styles from './Input.module.css';

type InputComponentProps = {
  label: string;
  type?: HTMLInputElement['type'];
  id: string;
  value: undefined | number | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string,
};

const InputComponent = ({
  label, type = 'text', id, value, onChange, name, required,
}: InputComponentProps) => (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        className={styles.label}
      >
          {label}
      </label>
      <input
        className={styles.input}
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
  </div>
);

export default InputComponent;
