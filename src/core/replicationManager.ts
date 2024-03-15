/**
 * Replication Manager
 * 
 * Este módulo lida com operações relacionadas à replicação de dados no MongoDB.
 * 
 * Data: 14-03-2024
 */
import { MongoClient, MongoClientOptions } from "mongodb";
import { ReplicaMember } from "./interface/ReplicaMember";

// URL de conexão com o conjunto de réplicas MongoDB
const url = 'mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=myReplicaSet';

/**
 * Obtém uma lista de servidores disponíveis no conjunto de réplicas.
 * 
 * @returns Uma promessa que resolve em uma matriz de membros disponíveis.
 */
async function getAvailableServers(): Promise<ReplicaMember[]> {
    const client = await MongoClient.connect(url);
    console.log('Conexão bem-sucedida com o servidor!');

    try {
        // Obtendo a lista de membros do conjunto de réplicas
        const adminDb = client.db('admin').admin();
        const replicaSetStatus = await adminDb.replSetGetStatus();
        const members = replicaSetStatus.members;

        // Filtrando os membros disponíveis
        const availableMembers = members.filter((member: ReplicaMember) => member.health === 1);
        return availableMembers;
        
    } catch (error) {
        console.error('Erro ao obter lista de servidores:', error);
        return [];  
    } finally {
        // Fechando a conexão com o cliente MongoDB
        client.close();
    }
}

// Chamando a função para obter membros disponíveis e imprimindo o resultado
getAvailableServers()
    .then(availableMembers => {
        console.log('Membros disponíveis:', availableMembers);
    })
    .catch(console.error);

export { getAvailableServers };
