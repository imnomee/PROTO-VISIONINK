import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
    return (
        <div className="flex items-center justify-between h-16 px-4 border-b my-4">
            <div>
                {/* Add logo or title here */}
                <h1 className="text-lg font-semibold">VisionInk</h1>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost">Notifications</Button>
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Header;
