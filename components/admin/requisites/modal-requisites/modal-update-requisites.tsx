import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RequisitesType } from '@/types/requisites_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { RequisitesForm } from './requisites-form';

export const ModalUpdateRequisites = ({
  requisites,
}: {
  requisites: RequisitesType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the requisites</DialogTitle>
        </DialogHeader>
        <RequisitesForm setIsOpen={setIsOpen} requisites={requisites} />
      </DialogContent>
    </Dialog>
  );
};
