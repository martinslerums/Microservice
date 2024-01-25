import styles from './Button.module.css';

type ButtonComponentProps = {
  label: string,
  type?: HTMLButtonElement['type']
}

const ButtonComponent = ({ label, type = 'submit' }: ButtonComponentProps) => (
    <div className={styles.wrapper}>
        <button className={styles.btn} type={type}>{label}</button>
    </div>
);

export default ButtonComponent;
