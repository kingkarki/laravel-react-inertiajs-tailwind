import { iPlayer } from '@/types/interface';
import { PropsWithChildren } from 'react';

export default function TeamPlayers({
    player,
}: PropsWithChildren<{ player: iPlayer }>) {
    let b = 1;
    return (
        <div
            className="m-4 flex items-center space-x-3 text-gray-600"
            key={player.id}
        >
            <div className="inline-flex h-10 w-10">
                <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                        {player.player.skill}
                    </span>
                </div>
            </div>
            <div>{player.player_name}</div>
        </div>
    );
}
