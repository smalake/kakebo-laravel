export interface Graphs {
    [date: string]: number[];
}

export interface GraphData {
    [date: string]: Graph[];
}

export interface TotalData {
    [date: string]: number;
}

export type Colors = string[];
