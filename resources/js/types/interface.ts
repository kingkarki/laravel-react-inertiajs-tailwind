export interface iTeam {
    id: string;
    name: string;
}

export interface iEvent {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    teams: iTeam[];
}

export interface iTeam {
    id: string;
    generated_id: number;
    team_id: number;
    total_skills: number;
    avg_skill: number;
    player_count: number;
    skill_distribution: string;
    created_at: string;
    team: iTeamDetail;
    updated_at: string;
    players: iPlayer[];
}

export interface iTeamDetail {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface iPlayer {
    id: string;
    generated_team_id: number;
    player_id: number;
    player_name: string;
    created_at: string;
    updated_at: string;
    player: iPlayerDetail;
    name: string;
    skill: number;
}

export interface iPlayerDetail {
    id: number;
    name: string;
    skill: number;
    created_at: string;
    updated_at: string;
}

export interface iGenerator {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}
