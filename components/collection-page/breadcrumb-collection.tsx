import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';

type BreadcrumbCollectionType = {
  collectionId: string;
  collectionName: string;
};

export const BreadcrumbCollection = ({
  collectionId,
  collectionName,
}: BreadcrumbCollectionType) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HomeIcon size={16} strokeWidth={1.5} />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/collection/${collectionId}`}>
            {collectionName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
