import { ReactNode, FormEvent } from 'react';
import styles from './Form.module.css';

type FormComponentProps = {
  children: ReactNode;
  onSubmit: (event: FormEvent) => void;
};

const FormComponent = ({ children, onSubmit }: FormComponentProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default FormComponent;
