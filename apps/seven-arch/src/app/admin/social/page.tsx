import { AdminSocialContainer } from '../../../containers/admin/AdminSocialContainer';
import { fetchSocialNetworks } from '../../../api/socialNetworksDataApi';

export const revalidate = 0;

export default async function AdminSocial() {
  const data = await fetchSocialNetworks();
  return <AdminSocialContainer socialNetworks={data.socialNetworks} />;
}
