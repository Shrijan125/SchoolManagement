import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface PlusIconButtonProps {
  title: string;
  href: string;
}

const PlusIconButton: React.FC<PlusIconButtonProps> = ({ title, href }) => {
  return (
    <Button asChild>
      <Link href={href}>
        <div className="flex items-center gap-2">
          <Plus />
          {title}
        </div>
      </Link>
    </Button>
  );
};

export default PlusIconButton;
