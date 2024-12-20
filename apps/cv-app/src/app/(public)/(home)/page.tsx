import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';

export default async function Index() {
  return (
    <div className={'text-red-900'}>
      <Editable defaultValue="Take some chakra">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
}
