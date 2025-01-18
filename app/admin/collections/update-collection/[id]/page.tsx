import { UpdateCollectionPage } from '@/components/admin/collections/create-update/update-collection-page';

const UpdateCollection = ({ params }: { params: { id: string } }) => {
  return <UpdateCollectionPage collectionId={params.id} />;
};
export default UpdateCollection;
