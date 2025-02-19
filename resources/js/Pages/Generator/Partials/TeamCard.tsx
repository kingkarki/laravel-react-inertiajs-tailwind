import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import { iPlayer, iTeam } from '@/types/interface';
import TeamPlayers from './TeamPlayers';

export default function TeamCard({
    team,
    maxPlayerCount,
}: PropsWithChildren<{ team: iTeam; maxPlayerCount: number }>) {
    let height = (40 + 16 * 2) * maxPlayerCount;
    return (
        <div className="rounded-lg" key={team.id}>
            <div>
                <div className="flex justify-between rounded-tl-md rounded-tr-md bg-gradient-to-b from-slate-700 to-slate-900 px-6 py-2 text-base text-white">
                    <Link href={route('team.edit', team.team_id)}>
                        {team.team.name}
                    </Link>
                    <span className="inline-block rounded-full bg-gradient-to-b from-blue-500 to-blue-900 px-3 py-[2px] text-sm font-semibold text-white">
                        {team.player_count}
                    </span>
                </div>
                <div
                    className="bg-slate-200 py-1 dark:bg-neutral-100"
                    style={{ height: `${height}px` }}
                >
                    {team.players.map((player: iPlayer, i) => (
                        <TeamPlayers key={i} player={player} />
                    ))}
                </div>

                <div className="bottom-0 flex w-full justify-between rounded-bl-md rounded-br-md bg-gradient-to-b from-slate-700 to-slate-800 px-4 py-2 text-left text-sm text-stone-300">
                    <span>Total Skills {team.total_skills}</span>
                    <span>Average Skills {team.avg_skill}</span>
                </div>
            </div>
        </div>
    );
}
