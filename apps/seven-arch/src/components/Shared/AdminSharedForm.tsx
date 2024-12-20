import { ReactNode } from 'react';
import { Article, MainArticleSubmitPayload } from '../../models/articleModels';
import { UiMaterialButton, UiMaterialForm, UiMaterialGridItem, UiMaterialTextHeading } from '@digital-wolf/ui-material';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { AdminSharedArticle } from '../admin/Page:AdminArticles/AdminSharedArticle/AdminSharedArticle';

export interface AdminSharedFormProps {
  readonly title: string;
  readonly subTitle?: string;
  readonly article?: Article;
  readonly isMainArticle?: boolean;
  readonly noArticle?: boolean;
  readonly noSubmitBtn?: boolean;
  readonly btnText?: string;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly spacing?: number;
  readonly onSubmit?: () => void;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly children?: ReactNode;
  readonly formGrid?: boolean;
}

export function AdminSharedForm({
  title,
  subTitle,
  article,
  noArticle,
  noSubmitBtn,
  initialLoading,
  isSubmitLoading,
  onSubmit,
  onArticleSubmit,
  spacing,
  formGrid,
  btnText = 'Save',
  children,
}: AdminSharedFormProps) {
  return (
    <UiMaterialForm spacing={spacing} grid={formGrid} isLoading={initialLoading} onSubmit={onSubmit}>
      <UiMaterialGridItem centerText>
        <UiMaterialTextHeading level={4}>{title}</UiMaterialTextHeading>
      </UiMaterialGridItem>

      <UiHelpersIf If={subTitle}>
        <UiMaterialGridItem centerText>
          <UiMaterialTextHeading level={5}>{subTitle}</UiMaterialTextHeading>
        </UiMaterialGridItem>
      </UiHelpersIf>

      <UiHelpersIf If={!noArticle}>
        <AdminSharedArticle article={article} onSubmitArticle={onArticleSubmit} />
      </UiHelpersIf>

      <UiMaterialGridItem xs={12}>{children}</UiMaterialGridItem>

      <UiHelpersIf If={!noSubmitBtn}>
        <UiMaterialGridItem>
          <UiMaterialButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
            {btnText}
          </UiMaterialButton>
        </UiMaterialGridItem>
      </UiHelpersIf>
    </UiMaterialForm>
  );
}
