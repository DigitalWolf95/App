import { ReactNode } from 'react';
import { UtilsLayout } from '@digital-wolf/utils';
import {
  UiMaterialAppBar,
  UiMaterialAppBarChildren,
  UiMaterialButton,
  UiMaterialDashedDivider,
  UiMaterialFooter,
  UiMaterialFooterChildren,
  UiMaterialFosterDrawer,
  UiMaterialFosterDrawerChildren,
  UiMaterialLayout,
  UiMaterialLayoutChildren,
  UiMaterialLinkBar,
  UiMaterialSocialBar,
  UiMaterialTextHeading,
} from '@digital-wolf/ui-material';
import { UiHelpersNamedChild } from '@digital-wolf/ui-helpers';
import { footerLinks } from '../constants/links';
import { FooterCopyright } from '../components/FooterCopyright';
import { MenuIcon } from '@digital-wolf/ui-icons';
import { LayoutProps } from '../models/LayoutModels';
import { useSystemContext } from '../context/SystemContext';

interface MainLayoutViewProps extends LayoutProps {
  children: ReactNode;
}

export function MainLayoutView({ children, drawerProps, socialNetworkProps, basicInfo }: MainLayoutViewProps) {
  const { mainViewMaxWidth } = useSystemContext();

  return (
    <UtilsLayout Layout={UiMaterialLayout} layoutProps={{ maxMainWidth: mainViewMaxWidth }}>
      <UiHelpersNamedChild<UiMaterialLayoutChildren> name={'AppBar'}>
        <UiMaterialAppBar>
          <UiHelpersNamedChild<UiMaterialAppBarChildren> name={'Logo'}>{basicInfo?.basicInfo.companyName}</UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialAppBarChildren> name={'Default'}>
            <UiMaterialButton btnType={'Icon'} onClick={() => drawerProps.onChange(!drawerProps.value)}>
              <MenuIcon />
            </UiMaterialButton>

            <UiMaterialFosterDrawer title={'Menu'} value={drawerProps.value} items={drawerProps.items} onChange={drawerProps.onChange}>
              <UiHelpersNamedChild<UiMaterialFosterDrawerChildren> name={'BottomBar'}>
                <UiMaterialSocialBar style={{ marginLeft: '65px', marginBottom: '20px', marginTop: '50px' }} />
              </UiHelpersNamedChild>
            </UiMaterialFosterDrawer>
          </UiHelpersNamedChild>
        </UiMaterialAppBar>
      </UiHelpersNamedChild>

      {children}

      <UiHelpersNamedChild<UiMaterialLayoutChildren> name={'Footer'}>
        <UiMaterialFooter breakpoints={{ md: 6, sm: 12 }}>
          <UiHelpersNamedChild<UiMaterialFooterChildren> name={'Divider'}>
            <UiMaterialDashedDivider color={'text.secondary'} />
          </UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialFooterChildren> name={'FirstQuadrant'}>
            <UiMaterialSocialBar btnProps={{ style: { color: 'text.secondary' } }} style={{ textAlign: 'end' }} socialNetworks={socialNetworkProps.items} />
          </UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialFooterChildren> name={'SecondQuadrant'}>
            <UiMaterialTextHeading color="text.secondary" level={6} fontSize={'25px'} fontWeight={500}>
              {basicInfo?.basicInfo?.companyName}
            </UiMaterialTextHeading>
          </UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialFooterChildren> name={'FourthQuadrant'}>
            <UiMaterialLinkBar color={'text.secondary'} links={footerLinks} />
          </UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialFooterChildren> name={'ThirdQuadrant'}>
            <FooterCopyright />
          </UiHelpersNamedChild>
        </UiMaterialFooter>
      </UiHelpersNamedChild>
    </UtilsLayout>
  );
}
