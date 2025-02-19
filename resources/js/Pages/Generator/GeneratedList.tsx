import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { iEvent, iTeam } from '@/types/interface';
import { Head, Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import TeamCard from './Partials/TeamCard';

export default function GeneratedList({
    event,
}: PropsWithChildren<{ event: iEvent }>) {
    const user = usePage().props.auth.user;
    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);

    let url = route('generated', event.slug);

    let maxCount = 0;
    event.teams.map((team: iTeam, index) => {
        if (maxCount < team.player_count) {
            maxCount = team.player_count;
        }
    });

    const copyText = () => {
        try {
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    setCopied(true);

                    setTimeout(() => setCopied(false), 2000); // Reset the "Copied!" message after 2 seconds
                })
                .catch((err) => {
                    console.error('Failed to copy text: ', err);
                });
        } catch (error) {
            setCopyError(true);
            setTimeout(() => setCopyError(false), 2000); // Reset the "Copied!" message after 2 seconds
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Team: {event.name}
                    </h2>

                    <Link
                        href={route('generator.index')}
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
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                        </svg>
                        {user ? 'Back' : 'Login'}
                    </Link>
                </div>
            }
        >
            <Head title={event.name} />
            <div className="mx-auto mt-5 max-w-7xl space-y-2 sm:px-6 lg:px-8">
                <div className="text-black-900 dark:text-white">
                    <span className="font-bold">Share Link </span>(Public Draw)
                </div>
                <div className="flex items-center gap-1 text-white">
                    <input
                        type="text"
                        name=""
                        id=""
                        value={url}
                        onChange={() => {}}
                        className="w-1/2 rounded-md text-gray-500"
                    />
                    <a
                        href="#"
                        onClick={copyText}
                        className="rounded-md bg-gradient-to-b from-blue-700 to-blue-900 px-2 py-2"
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
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                            />
                        </svg>
                    </a>
                    {copied ? 'Copied!' : ''}
                    {copyError ? 'Sorry I dont have ssl. Copy manually!' : ''}
                </div>
            </div>
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {event.teams.map((team: iTeam, index) => (
                            <TeamCard
                                team={team}
                                key={index}
                                maxPlayerCount={maxCount}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
