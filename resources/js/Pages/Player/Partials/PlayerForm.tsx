import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { iPlayer } from '@/types/interface';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FormEventHandler, PropsWithChildren, useRef } from 'react';

export default function PlayerForm({
    player,
}: PropsWithChildren<{ player?: iPlayer }>) {
    // var [rating, setRating] = useState(2);
    const fullNameInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        setError,
        reset,
        post,
        processing,
        recentlySuccessful,
    } = useForm({
        full_name: player?.name,
        rating: player?.skill,
    });

    const savePlayer: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            player ? route('players.update', player.id) : route('players.save'),
            {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    console.log(errors);
                },
            },
        );
    };

    return (
        <div>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {player ? (
                        <span>Edit Player</span>
                    ) : (
                        <span>Add New Player</span>
                    )}
                </h2>
            </header>

            <form onSubmit={savePlayer} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="full_name" value="Full Name" />

                    <TextInput
                        id="full_name"
                        value={data.full_name}
                        type="text"
                        onChange={(e) => setData('full_name', e.target.value)}
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.full_name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="skills" value="Skills" />

                    <Rating
                        style={{ maxWidth: 200 }}
                        value={Number(data.rating)}
                        onChange={(rate: number) => {
                            setData('rating', rate);
                        }}
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {player ? 'UPDATE' : 'SAVE'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Player Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
