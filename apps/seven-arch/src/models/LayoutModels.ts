import { ReactNode } from 'react';
import { UiMaterialFosterDrawerItem } from '@digital-wolf/ui-material';
import { DocumentSocialNetwork } from '@digital-wolf/types';
import { DataBasicInfo } from '../api/basicDataApi';

export interface LayoutSocialNetworkProps {
  readonly onClick: (social: DocumentSocialNetwork) => void;
  readonly items?: DocumentSocialNetwork[];
}

export interface LayoutDrawerProps {
  readonly items: UiMaterialFosterDrawerItem[];
  readonly value: boolean;
  readonly onChange: (state: boolean) => void;
}

export interface LayoutProps {
  readonly children: ReactNode;
  readonly drawerProps: LayoutDrawerProps;
  readonly socialNetworkProps: LayoutSocialNetworkProps;
  readonly basicInfo?: DataBasicInfo;
  readonly onLogoClick?: () => void;
}
