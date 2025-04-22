import { AntButton, AntFlex, AntText, AntTitle } from '@digital-wolf/ant';
import styles from './HomePage.module.scss';

export default async function Index() {
  return (
    <AntFlex className={styles.HomePage} center fullHeight>
      <AntTitle>Frontend Support for Devs Who Are Almost There</AntTitle>
      <AntTitle className={'!mt-0'}>Hands-on support with React, Vue, Next, Nuxt & Nx</AntTitle>
      <AntText className={'!text-xl mb-5'}>
      Stuck on a feature? Need to clean up a messy codebase? Or just want a second pair of eyes before pushing to prod?
      </AntText>
      <AntText className={'!text-xl'}>
      I help solid developers go from “almost there” to “nailed it.”
      </AntText>
      <AntFlex
        className={'max-w-[400px] w-full !mt-10 sm:gap-[80px] gap-[40px] justify-between flex-col sm:flex-row items-center'}>
        <AntButton className={'max-w-[200px]'} text={'Explore My Work'} outlined />
        <AntButton className={'max-w-[200px]'} text={'Let’s Collaborate'} outlined />
      </AntFlex>
      {/*<Image alt={'test'} width={200} height={200} src={'/api/image?image=images/Screenshot_2024-03-26_at_22.49.02.png'} />*/}
    </AntFlex>
  );
}
