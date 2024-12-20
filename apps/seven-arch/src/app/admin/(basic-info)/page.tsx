import { AdminBasicInfoContainer } from '../../../containers/admin/AdminBasicInfoContainer';
import { fetchBasicInfo } from '../../../api/basicDataApi';

export const revalidate = 0;

export default async function AdminBasicInfo() {
  const basicInfoData = await fetchBasicInfo();

  return <AdminBasicInfoContainer basicInfo={basicInfoData.basicInfo} basicInfoImages={basicInfoData.basicInfoImages} />;
}
