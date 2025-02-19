import { iTeam } from '@/types/interface';
import { Link, useForm } from '@inertiajs/react';
import '@smastrom/react-rating/style.css';
import { PropsWithChildren } from 'react';

export default function TeamItem({
    index,
    team,
}: PropsWithChildren<{ index: number; team: iTeam }>) {
    const {
        post,
        data,
        setData,
        delete: deleteTeam,
    } = useForm({
        teamId: '',
        rating: '',
    });

    function deleteMe() {
        if (!confirm('Are you sure? Do you want to delete this team?')) {
            return false;
        }

        deleteTeam(route('team.destroy', team.id), {
            preserveScroll: true,
            onSuccess: (s) => {},
            onError: (errors) => {},
        });
    }

    return (
        <tr key={index}>
            <td className="px-10 py-4">#{team.id}</td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="inline-flex h-10 w-10">
                        <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                {team.name
                                    .split(' ')
                                    .map((word: string) => word[0])
                                    .join('')
                                    .toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div>{team.name}</div>
                </div>
            </td>

            <td className="px-6 py-4 text-center">
                <div className="flex gap-2">
                    <Link
                        href={route('team.edit', team.id)}
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
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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
