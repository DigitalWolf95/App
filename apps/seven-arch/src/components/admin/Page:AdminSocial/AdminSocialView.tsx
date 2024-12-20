import { DocumentSocialNetwork, GenericLoadingFlags, SocialNetworkSlug } from '@digital-wolf/types';
import { useEffect, useMemo, useState } from 'react';
import { fnsObjectFromArray, sortArray } from '@digital-wolf/fns';
import { UiMaterialButton, UiMaterialCardOutlined, UiMaterialForm, UiMaterialGridItem, UiMaterialTextHeading } from '@digital-wolf/ui-material';
import { UiHelpersDragAndDrop } from '@digital-wolf/ui-helpers';
import { AdminSocialToggleItem } from './AdminSocialToggleItem';
import { AdminSocialForm } from './AdminSocialForm';

export interface AdminSocialViewProps {
  readonly loadingFlags: GenericLoadingFlags;
  readonly socialNetworks: DocumentSocialNetwork[];
  readonly onSubmit: (payload: DocumentSocialNetwork[]) => void;
}

type AdminSocialNetworksViewState = { [key in SocialNetworkSlug]: DocumentSocialNetwork };

export function AdminSocialView({ socialNetworks, loadingFlags, onSubmit }: AdminSocialViewProps) {
  const [state, setState] = useState<AdminSocialNetworksViewState>(fnsObjectFromArray(sortArray(socialNetworks, 'order'), 'slug'));

  useEffect(() => {
    setState(fnsObjectFromArray(socialNetworks, 'slug'));
  }, [socialNetworks]);

  function handleSocialNetworkToggle(socialNetwork: DocumentSocialNetwork, state: boolean) {
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        state,
      },
    }));
  }

  function handleSocialNetworkLinkChange(socialNetwork: DocumentSocialNetwork, link: string) {
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        link,
      },
    }));
  }

  function handleSocialNetworkDragEnd(fromIndex: number, toIndex: number) {
    setState((oldState) => {
      const socialNetworksCopy = Object.values({ ...oldState });
      const [removed] = socialNetworksCopy.splice(fromIndex, 1);
      socialNetworksCopy.splice(toIndex, 0, removed);
      socialNetworksCopy.map((item, index) => (item.order = index + 1));
      return fnsObjectFromArray(socialNetworksCopy, 'slug');
    });
  }

  function handleSubmit() {
    onSubmit?.(Object.values(state));
  }

  const socialNetworkArray = useMemo(() => sortArray(Object.values(state), 'order'), [state]);
  const socialNetworkFilteredArray = useMemo(() => sortArray(Object.values(state).filter(Boolean), 'order'), [state]);

  const reactDragListViewProps = {
    nodeSelector: 'div.DragElement',
    handleSelector: '.dndHandle',
    lineClassName: 'DragLine',
  } as any;

  return (
    <UiMaterialForm isLoading={loadingFlags.init} spacing={3} onSubmit={handleSubmit}>
      <UiMaterialGridItem centerText>
        <UiMaterialTextHeading level={4}> Social Networks </UiMaterialTextHeading>
      </UiMaterialGridItem>

      <UiMaterialCardOutlined label={'Toggle Social Networks'}>
        <UiHelpersDragAndDrop onDragEnd={handleSocialNetworkDragEnd} {...reactDragListViewProps}>
          {socialNetworkArray.map((socialNetwork) => (
            <AdminSocialToggleItem
              className={'DragElement'}
              key={socialNetwork.id}
              socialNetwork={socialNetwork}
              onChange={handleSocialNetworkToggle}
              value={state[socialNetwork.slug]?.state}
            />
          ))}
        </UiHelpersDragAndDrop>
      </UiMaterialCardOutlined>

      {socialNetworkFilteredArray.map((socialNetwork) => (
        <AdminSocialForm
          key={socialNetwork.id}
          socialNetwork={socialNetwork}
          linkValue={state[socialNetwork.slug].link}
          onLinkChange={handleSocialNetworkLinkChange}
        />
      ))}

      <UiMaterialGridItem>
        <UiMaterialButton fullWidth btnType={'LoadingButton'} loading={loadingFlags.submit} type={'submit'}>
          Save
        </UiMaterialButton>
      </UiMaterialGridItem>
    </UiMaterialForm>
  );
}
