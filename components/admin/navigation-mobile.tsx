'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import { useState } from 'react';
import { NavigationAdmin } from './navigation-admin';

export const NavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <AlignJustify className="   w-5 h-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" mb-8 text-lg ">The admin menu</SheetTitle>
        </SheetHeader>

        <div className="custom-scroll-filters-mobile  px-2 pb-10">
          <NavigationAdmin closeSheet={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
