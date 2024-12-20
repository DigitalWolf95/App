import { Article, ArticleFeatureType, MainArticleSubmitPayload, SubArticleEditPayload } from '../../../../models/articleModels';
import { FeatureFontSize, FeatureTextAlign, ImageToStore } from '@digital-wolf/types';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useContainerData } from '@digital-wolf/hooks';
import { addOrUpdateEntityInArray, findElementInArrayByValue, removeEntityFromArray, uuidV4 } from '@digital-wolf/fns';
import { subArticleToSubArticlePayload } from '../../../../utils/articleUtils';
import clsx from 'clsx';
import {
  UiMaterialAutoComplete,
  UiMaterialButton,
  UiMaterialCardOutlined,
  UiMaterialDivider,
  UiMaterialFormDialog,
  UiMaterialFormDialogChildren,
  UiMaterialGridContainer,
  UiMaterialGridItem,
  UiMaterialGridSwitch,
  UiMaterialTextField,
  UiMaterialTypography,
  UiMaterialUploadImage,
} from '@digital-wolf/ui-material';
import { UiHelpersIf, UiHelpersNamedChild } from '@digital-wolf/ui-helpers';
import { AdminSharedArticleInterfaceLarge } from './AdminSharedArticleInterfaceLarge';
import { AdminSharedArticleInterfaceSmall } from './AdminSharedArticleInterfaceSmall';
import { alignOptions, featureOptions, fontSizeOptions, sizeOptions } from '../../../../constants/articleOptions';
import { AddIcon, DeleteForeverIcon, ModeEditIcon } from '@digital-wolf/ui-icons';

export interface AdminSharedArticleContainerState {
  readonly isModalOpen?: boolean;
  readonly isSubModalOpen?: boolean;
  readonly isActive?: boolean;
  readonly feature: ArticleFeatureType | null;
  readonly title: string;
  readonly content: string;
  readonly order: number;
  readonly featureContent: string;
  readonly featureAlign: FeatureTextAlign;
  readonly featureFontSize: FeatureFontSize;
  readonly image: ImageToStore | null;
  readonly size: 'small' | 'large';
  readonly subArticles: SubArticleEditPayload[];
  readonly subArticle: SubArticleEditPayload | null;
}

export interface AdminSharedArticleProps {
  readonly article?: Article;
  readonly label?: ReactNode;
  readonly isMainArticle?: boolean;
  readonly size?: 'small' | 'large';
  readonly order?: number;
  readonly dragAndDrop?: boolean;
  readonly className?: string;
  readonly previousPayload?: MainArticleSubmitPayload;
  readonly onSubmitArticle?: (payload: MainArticleSubmitPayload) => void;
}

export function AdminSharedArticle(props: AdminSharedArticleProps) {
  const {
    article,
    className,
    dragAndDrop,
    order,
    previousPayload,
    isMainArticle = true,
    size: articleFormSize = 'small',
    label = 'Article Settings',
    onSubmitArticle,
  } = props;

  const { state, updateState, manipulateState, updateObjectInState } = useContainerData<AdminSharedArticleContainerState>({
    isModalOpen: false,
    isSubModalOpen: false,
    isActive: article?.state ?? false,
    feature: article?.feature?.type ?? null,
    title: article?.title ?? '',
    content: article?.content ?? '',
    order: article?.order ?? 0,
    featureContent: article?.feature?.content ?? '',
    featureAlign: article?.feature?.align ?? 'center',
    featureFontSize: article?.feature?.fontSize ?? 'normal',
    image: null,
    size: article?.size ?? 'large',
    subArticles: subArticleToSubArticlePayload(article?.subArticles ?? []),
    subArticle: null,
  });

  function handleSetImage(image?: ImageToStore) {
    console.log('image ', image);
    updateState({ image });
  }

  function handleSetSubArticleImage(image?: ImageToStore) {
    console.log('image ', image);
    manipulateState((oldState) => ({ ...oldState, subArticle: { ...oldState.subArticle, image } }));
  }

  const originalSubArticle = useMemo(() => {
    return findElementInArrayByValue(article?.subArticles, 'id', state.subArticle?.id);
  }, [state.subArticle, article?.subArticles]);

  const fillForm = useCallback(() => {
    if (article) {
      updateState({
        isActive: previousPayload?.state ?? article.state,
        feature: previousPayload?.feature?.type ?? article.feature?.type ?? null,
        title: previousPayload?.title ?? article.title ?? '',
        content: previousPayload?.content ?? article.content ?? '',
        order: previousPayload?.order ?? order ?? 0,
        featureContent: previousPayload?.feature?.content ?? article.feature?.content ?? '',
        featureAlign: previousPayload?.feature?.align ?? article.feature?.align ?? 'center',
        featureFontSize: previousPayload?.feature?.fontSize ?? article.feature?.fontSize ?? 'normal',
        image: previousPayload?.image ?? null,
        size: previousPayload?.size ?? article.size ?? 'large',
        subArticles: previousPayload?.subArticles ?? subArticleToSubArticlePayload(article.subArticles ?? []),
      });
    }
  }, [article, previousPayload, order]);

  useEffect(() => {
    fillForm();
  }, [article]);

  useEffect(() => {
    if (order && article?.order !== order) {
      updateState({ order });
      handleSubmit({ order });
    }
  }, [order]);

  function handleCancel() {
    updateState({ isModalOpen: false });
    fillForm();
  }

  function handleSubmit(manualInput?: { state?: boolean; order?: number }) {
    const payload: MainArticleSubmitPayload = {
      type: 'main',
      title: state.title,
      feature: state.feature ? { type: state.feature, content: state.featureContent, align: state.featureAlign, fontSize: state.featureFontSize } : null,
      size: state.size,
      content: state.content,
      state: manualInput?.state ?? state.isActive ?? false,
      order: manualInput?.order ?? state.order ?? -1,
      image: state.image ?? null,
      subArticles: state.subArticles.map((subArticle) => {
        return { ...subArticle, image: subArticle.image };
      }),
    };
    updateState({ isModalOpen: false });
    onSubmitArticle?.(payload);
  }

  function handleCreateSubArticle() {
    updateState({
      isSubModalOpen: true,
      subArticle: {
        id: uuidV4(),
        content: '',
        link: '',
        state: true,
        image: null,
      },
    });
  }

  function handleChangeSubArticle(fieldName: keyof SubArticleEditPayload, value: any) {
    updateObjectInState('subArticle', { [fieldName]: value } as SubArticleEditPayload);
  }

  function handleSaveSubArticle() {
    if (state.subArticle) {
      updateState({ subArticles: addOrUpdateEntityInArray(state.subArticles, state.subArticle, 'id'), subArticle: null, isSubModalOpen: false });
    }
  }

  function handleCancelSubArticle() {
    updateState({ isSubModalOpen: false });
    updateState({ subArticle: null });
  }

  function handleDeleteSubArticle(subArticle: SubArticleEditPayload) {
    updateState({ subArticles: removeEntityFromArray(state.subArticles, subArticle, 'id') });
  }

  function handleEditSubArticle(subArticle: SubArticleEditPayload) {
    updateState({ subArticle, isSubModalOpen: true });
  }

  async function handleSetIsActive(state: boolean) {
    updateState({ isActive: state });
    handleSubmit({ state });
  }

  return (
    <UiMaterialCardOutlined className={clsx({ DragElement: dragAndDrop }, className)} label={label}>
      <UiMaterialGridContainer centerX={false} spacing={articleFormSize === 'large' ? 2 : 0} mb={articleFormSize === 'large' ? 3 : 0}>
        <UiHelpersIf If={articleFormSize === 'large'}>
          <AdminSharedArticleInterfaceLarge state={state.isActive} onStateChange={handleSetIsActive} onBtnClick={() => updateState({ isModalOpen: true })} />
        </UiHelpersIf>

        <UiHelpersIf If={articleFormSize === 'small'}>
          <AdminSharedArticleInterfaceSmall
            dragAndDrop={dragAndDrop}
            state={state.isActive}
            onStateChange={handleSetIsActive}
            onBtnClick={() => updateState({ isModalOpen: true })}
          />
        </UiHelpersIf>

        {/* Main Article Modal */}
        <UiMaterialFormDialog open={state.isModalOpen && !state.isSubModalOpen} title={'Manage Article'} onClose={() => updateState({ isModalOpen: false })}>
          <UiHelpersNamedChild<UiMaterialFormDialogChildren> name={'Content'}>
            <UiHelpersIf If={isMainArticle}>
              <UiMaterialAutoComplete
                className={'u-mb--5'}
                label={'Article Feature'}
                value={state.feature}
                options={featureOptions}
                onChange={(e) => updateState({ feature: e?.value as ArticleFeatureType })}
              />
            </UiHelpersIf>

            <UiHelpersIf If={isMainArticle}>
              <UiMaterialGridItem xs={12}>
                <UiMaterialTextField label={'Title'} value={state.title} onChange={(e) => updateState({ title: e.target.value })} />
              </UiMaterialGridItem>
            </UiHelpersIf>

            <UiMaterialGridItem xs={12}>
              <UiMaterialTextField label={'Content'} value={state.content} onChange={(e) => updateState({ content: e.target.value })} />
            </UiMaterialGridItem>

            <UiHelpersIf If={isMainArticle}>
              <UiMaterialAutoComplete
                className={'u-mb--5'}
                label={'Size'}
                value={state.size}
                options={sizeOptions}
                onChange={(e) => updateState({ size: e?.value as 'large' | 'small' })}
              />
            </UiHelpersIf>

            <UiHelpersIf If={isMainArticle && !!state.feature}>
              <UiMaterialAutoComplete
                className={'u-mb--5'}
                label={'Feature Text Alignment'}
                value={state.featureAlign}
                options={alignOptions}
                onChange={(e) => updateState({ featureAlign: e?.value as FeatureTextAlign })}
              />

              <UiMaterialAutoComplete
                className={'u-mb--5'}
                label={'Feature Font Size'}
                value={state.featureFontSize}
                options={fontSizeOptions}
                onChange={(e) => updateState({ featureFontSize: e?.value as FeatureFontSize })}
              />

              <UiMaterialGridItem xs={12} className={''}>
                <UiMaterialTextField
                  multiline
                  maxRows={10}
                  label={'Feature Content'}
                  value={state.featureContent ?? ''}
                  onChange={(e) => updateState({ featureContent: e.target.value })}
                />
              </UiMaterialGridItem>
            </UiHelpersIf>

            <UiHelpersIf If={isMainArticle}>
              <div className={'u-end--x u-flex--space-between u-mb--2'}>
                <UiMaterialTypography className={'u-mr--5'}>Sub Articles</UiMaterialTypography>
                <UiMaterialButton color={'primary'} onClick={handleCreateSubArticle}>
                  <div className={'u-center--x'}>
                    <span>Add</span>
                    <AddIcon />
                  </div>
                </UiMaterialButton>
              </div>

              <UiMaterialDivider />
              <UiHelpersIf If={state.subArticles.length === 0}>
                <div className={'u-center--y u-pa--2'}>
                  <UiMaterialTypography color={'gray'}>No Sub Articles</UiMaterialTypography>
                </div>
              </UiHelpersIf>

              <UiHelpersIf If={state.subArticles.length > 0}>
                {state.subArticles.map((subArticle, index) => (
                  <div key={subArticle.id ?? index} className={'u-flex--space-between u-center--x'}>
                    <div className={'u-center--x u'}>
                      <UiMaterialTypography>{subArticle.content}</UiMaterialTypography>
                      <UiHelpersIf If={!subArticle.state}>
                        <UiMaterialTypography
                          style={{ border: '1px solid', borderRadius: '5px', padding: '0 5px' }}
                          className={'u-text--gray u-text--font-10 u-ml--3'}
                        >
                          DISABLED
                        </UiMaterialTypography>
                      </UiHelpersIf>
                    </div>
                    <div style={{ width: '80px' }}>
                      <UiMaterialButton color={'error'} btnType={'Icon'} onClick={() => handleDeleteSubArticle(subArticle)}>
                        <DeleteForeverIcon />
                      </UiMaterialButton>
                      <UiMaterialButton btnType={'Icon'} onClick={() => handleEditSubArticle(subArticle)}>
                        <ModeEditIcon />
                      </UiMaterialButton>
                    </div>
                  </div>
                ))}
              </UiHelpersIf>

              <UiMaterialDivider className={'u-mb--5'} />
            </UiHelpersIf>

            <UiMaterialGridItem xs={12}>
              <UiMaterialUploadImage
                useExternalLink={true}
                isInitialExternalLink={article?.image?.type === 'externalImage'}
                label={'Article Image'}
                stateImage={state.image}
                onSetState={handleSetImage}
                src={article?.image?.url}
              />
            </UiMaterialGridItem>
          </UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialFormDialogChildren> name={'Actions'}>
            <UiMaterialButton onClick={handleCancel}>Cancel</UiMaterialButton>
            <UiMaterialButton onClick={() => handleSubmit()}>Submit</UiMaterialButton>
          </UiHelpersNamedChild>
        </UiMaterialFormDialog>

        {/* Sub Article Modal */}
        <UiMaterialFormDialog open={state.isSubModalOpen} title={'Manage Sub Article'} onClose={() => updateState({ isModalOpen: false })}>
          <UiHelpersNamedChild<UiMaterialFormDialogChildren> name={'Content'}>
            <UiMaterialCardOutlined label={'Turn On/Off'} center={false} noPadding={true} className={'u-pb--5'}>
              <UiMaterialGridSwitch
                gridItemProps={{ className: 'u-pl--3' }}
                label={'State:'}
                value={state.subArticle?.state ?? false}
                onChange={(state) => handleChangeSubArticle('state', state)}
              />
            </UiMaterialCardOutlined>

            <UiMaterialGridItem xs={12}>
              <UiMaterialTextField
                label={'Content'}
                value={state.subArticle?.content ?? ''}
                onChange={(e) => handleChangeSubArticle('content', e.target.value)}
              />
            </UiMaterialGridItem>

            <UiMaterialGridItem xs={12}>
              <UiMaterialTextField label={'Link'} value={state.subArticle?.link ?? ''} onChange={(e) => handleChangeSubArticle('link', e.target.value)} />
            </UiMaterialGridItem>

            <UiMaterialGridItem xs={12}>
              <UiMaterialUploadImage
                useExternalLink={true}
                label={'Article Image'}
                isInitialExternalLink={originalSubArticle?.image?.type === 'externalImage'}
                stateImage={state.subArticle?.image}
                onSetState={handleSetSubArticleImage}
                src={originalSubArticle?.image?.url}
              />
            </UiMaterialGridItem>
          </UiHelpersNamedChild>

          <UiHelpersNamedChild<UiMaterialFormDialogChildren> name={'Actions'}>
            <UiMaterialButton onClick={handleCancelSubArticle}>Cancel</UiMaterialButton>
            <UiMaterialButton onClick={handleSaveSubArticle}>Submit</UiMaterialButton>
          </UiHelpersNamedChild>
        </UiMaterialFormDialog>
      </UiMaterialGridContainer>
    </UiMaterialCardOutlined>
  );
}
