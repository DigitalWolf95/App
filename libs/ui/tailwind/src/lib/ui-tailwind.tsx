import styles from './ui-tailwind.module.scss';
import './styles.css'

/* eslint-disable-next-line */
export interface UiTailwindProps {}

export function UiTailwind(props: UiTailwindProps) {
  return (
    <div className={styles['container']}>
      <h1 className={'text-green-500'}>Welcome to UiTailwind!</h1>
    </div>
  );
}

export default UiTailwind;
