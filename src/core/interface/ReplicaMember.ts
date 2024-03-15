//Definindo a interface das replicas
export interface ReplicaMember {
    _id: number;
    name: string;
    state: number; // 0 = false 1 = true
    health: number; // 0 = false, 1 = true
    stateStr: string;
    uptime: number;
    optime: {
        ts: any;
        t: number;
    };
    optimeDate: Date;
    lastheartbeat: Date;
    lastHeatbeatRcv: Date;
    pingMs: number;
    syncSourceHost: string;
    syncSourceId: number;
    infoMessage: string;
    configVersion: number;
    electionTime: Date;
    electionDate: Date;
}