import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { iTeam } from '@/types/interface';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

import '@smastrom/react-rating/style.css';
import { FormEventHandler, PropsWithChildren, useRef } from 'react';

export default function TeamForm({
    team,
}: PropsWithChildren<{ team?: iTeam }>) {
    const fullNameInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        setError,
        reset,
        post,
        put,
        processing,
        recentlySuccessful,
    } = useForm({
        name: team?.name,
    });

    const saveteam: FormEventHandler = (e) => {
        e.preventDefault();
        const url = team ? route('team.update', team.id) : route('team.store');
        if (team) {
            put(url, {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    console.log(errors);
                },
            });
        } else {
            post(url, {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    };

    return (
        <div>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {team ? <span>Edit team</span> : <span>Add New team</span>}
                </h2>
            </header>

            <form onSubmit={saveteam} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Team Name" />

                    <TextInput
                        id="name"
                        value={data.name}
                        type="text"
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {team ? 'UPDATE' : 'SAVE'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            team Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
