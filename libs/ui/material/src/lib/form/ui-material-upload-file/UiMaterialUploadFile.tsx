import { Button } from '@mui/material';
import { getFilePreviewURL, imageTOWebp } from '@digital-wolf/fns';

interface UiMaterialUploadFileProps {
  label?: string;
  onChange?: (file: File, previewUrl?: string) => void;
}

export function UiMaterialUploadFile({ label = 'Upload', onChange }: UiMaterialUploadFileProps) {
  async function handleOnChangeUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = (await imageTOWebp(event)) as unknown as File;

    if (file) {
      const url = await getFilePreviewURL(file);
      return onChange?.(file, url);
    }
  }

  return (
    <Button variant="outlined" component="label">
      <span>{label}</span>
      <input onChange={handleOnChangeUpload} type="file" hidden />
    </Button>
  );
}
