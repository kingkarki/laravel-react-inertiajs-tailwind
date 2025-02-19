import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { iPlayer } from '@/types/interface';

import { Head, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import ListItem from './Partials/ListItem';

export default function List({
    players,
}: PropsWithChildren<{ players: iPlayer[] }>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Players
                    </h2>

                    <Link
                        href="/players/add"
                        className="flex gap-2 rounded-full bg-gradient-to-b from-blue-700 to-blue-900 px-8 py-2 text-white transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-blue-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        Add New Player
                    </Link>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <table className="mx-auto w-full max-w-4xl divide-y divide-gray-300 overflow-hidden whitespace-nowrap rounded-lg bg-white">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-gray-600">
                                <th className="px-10 py-4 text-sm font-semibold uppercase">
                                    ID
                                </th>
                                <th className="w-1/4 px-10 py-4 text-sm font-semibold uppercase">
                                    Name
                                </th>
                                <th className="w-1/4 px-10 px-6 py-4 text-sm font-semibold uppercase">
                                    Rating
                                </th>

                                <th className="w-2/4 px-6 py-4 text-sm font-semibold uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {players.map((player: iPlayer, i: number) => (
                                <ListItem index={i} player={player} key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
