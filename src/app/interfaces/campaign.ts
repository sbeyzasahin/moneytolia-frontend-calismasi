export interface Campaign {
    name: string
    description: string
    created_date: Date
    campaign_score: number
    visible?: boolean,
    id?: number
}