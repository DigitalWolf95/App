import { AntFlex } from '@digital-wolf/ant';
import { Typography } from 'antd';
import Image from 'next/image';

export default async function Index() {
  return (
    <AntFlex center fullHeight>
      <Image alt={'test'} width={200} height={200} src={'/api/image?image=images/Screenshot_2024-03-26_at_22.49.02.png'} />
      <Typography>Under The Development</Typography>
    </AntFlex>
  );
}
