import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Sidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="flex items-center justify-center my-4">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                        Manage your account settings and set preferences.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <a
                        href="/jobs/create"
                        className="block px-4 py-2 hover:bg-gray-100">
                        Create Job
                    </a>
                    <Separator />
                    <a
                        href="/jobs"
                        className="block px-4 py-2 hover:bg-gray-100">
                        Jobs List
                    </a>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
