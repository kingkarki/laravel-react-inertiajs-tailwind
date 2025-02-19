import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';
toastConfig({ theme: 'dark' });

interface FlashProps extends PageProps {
    flash: {
        message?: string;
    };
}

export default function FlashMessage() {
    const { flash } = usePage<FlashProps>().props;

    useEffect(() => {
        if (flash.message && flash.message != '') {
            toast(flash.message);
            console.log(flash.message);
        }
    });

    return (
        <div>
            {flash.message && (
                <div className="alert text-white">{flash.message}</div>
            )}
        </div>
    );
}
