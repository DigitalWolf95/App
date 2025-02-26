import { AntFlex, AntTitle } from '@digital-wolf/ant';
import Image from 'next/image';
import styles from './HomePage.module.scss';

export default async function Index() {
  return (
    <AntFlex className={styles.HomePage} center fullHeight>
      <AntTitle>Under The Development</AntTitle>
      <Image alt={'test'} width={200} height={200} src={'/api/image?image=images/Screenshot_2024-03-26_at_22.49.02.png'} />
    </AntFlex>
  );
}
