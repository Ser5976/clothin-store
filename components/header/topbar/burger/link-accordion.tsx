import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import styles from './burger.module.css';
import { CategoryType } from '@/types/category_type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SheetClose } from '@/components/ui/sheet';

const LinkAccordion = ({ category }: { category: CategoryType }) => {
  const searchParams = useSearchParams();
  let defaultValue =
    category.id === searchParams.get('categoryId') ? category.name : '';
  return (
    <Accordion type="multiple" defaultValue={[defaultValue]} className="w-full">
      <AccordionItem value={category.name}>
        <AccordionTrigger>
          <div
            className={cn(styles.link_categories, {
              [styles.link_active]:
                searchParams.get('categoryId') === category.id,
            })}
          >
            {category.name}
          </div>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-2 gap-2">
          {category.types.map((type) => {
            return (
              <SheetClose key={type.id} asChild>
                <Link
                  href={`/categories?categoryId=${category.id}&typeId=${type.id}`}
                  className={cn('text-gray-500', {
                    [styles.link_active]:
                      searchParams.get('typeId') === type.id,
                  })}
                >
                  {type.name}
                </Link>
              </SheetClose>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LinkAccordion;
