import { iGenerator } from '@/types/interface';
import { Link, useForm } from '@inertiajs/react';
import '@smastrom/react-rating/style.css';
import { PropsWithChildren } from 'react';

export default function GeneratorListItem({
    index,
    generator,
}: PropsWithChildren<{ index: number; generator: iGenerator }>) {
    const date = new Date(generator.created_at);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const humanReadableDate = date.toLocaleDateString('en-US', options);

    const {
        post,
        data,
        setData,
        delete: deleteGenerator,
    } = useForm({
        generatorId: '',
        rating: '',
    });

    function deleteMe() {
        if (
            !confirm('Are you sure? Do you want to delete this generated Team?')
        ) {
            return false;
        }

        deleteGenerator(route('generator.destroy', generator.id), {
            preserveScroll: true,
            onSuccess: (s) => {},
            onError: (errors) => {},
        });
    }

    return (
        <tr key={index}>
            <td className="px-10 py-4">#{generator.id}</td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="inline-flex h-10 w-10">
                        <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                {generator.name
                                    .split(' ')
                                    .map((word: string) => word[0])
                                    .join('')
                                    .toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div>{generator.name}</div>
                </div>
            </td>

            <td>
                <div>{humanReadableDate}</div>
            </td>

            <td className="px-6 py-4 text-center">
                <div className="flex gap-2">
                    <Link
                        href={route('generated', generator.slug)}
                        className="text-black-100 hover:underline"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </Link>
                    <a href="#" className="text-red-600" onClick={deleteMe}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                            />
                        </svg>
                    </a>
                </div>
            </td>
        </tr>
    );
}
