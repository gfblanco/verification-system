class IpfsConstructor {
    constructor (Ipfs, OrbitDB) {
        this.Ipfs = Ipfs
        this.OrbitDB = OrbitDB
    }


    async create() {
        this.node = await this.Ipfs.create({
            preload: { enabled: false },
            repo: './ipfs',
            EXPERIMENTAL: { pubsub: true },
            config: {
                Bootstrap: [],
                Addresses: { Swarm: [] }
            }
        }).then(console.log("Node created."));
        this._init();
    }

    async _init() {
        this.orbitdb = await this.OrbitDB.createInstance(this.node)
        this.defaultOptions = { 
            accessController: {
                write: [this.orbitdb.identity.id]
            },
        }
        const docStoreOptions = {
            ...this.defaultOptions,
            indexBy: 'pubk',
        }
        this.records = await this.orbitdb.docs('records', docStoreOptions)
        await console.log("The id/address/multiaddress of the 'docstore' DB is " + this.records.id);
        await this.records.load();
        this.onready();
    }

    async addNewRecord(json) {
          const cid = await this.records.put(json)
          return cid
    }

    getAllRecords() {
        const records = this.records.get("")
        return records
    }

    getRecordByHash(hash) {
        const singleRecord = this.records.get(hash)[0]
        return singleRecord
    }

    async updateRecordByHash(hash, id) {
        const record = await this.getRecordByHash(hash);
        record.id = id;
        return await this.records.put(record);
    }    
    
    async updateSubjectMark(hash, subject, mark) {
        const record = await this.getRecordByHash(hash);
        record.subjects.forEach((sub) => {
            if (sub["Subject"] == subject){
                console.log("Before: " + sub["Mark"]);
                sub["Mark"] = mark;
                console.log("After: " + sub["Mark"]);
            }
        });
        return await this.records.put(record);
    }

    async checkId(hash) {
        const record = await this.getRecordByHash(hash);
        return record.id === "";
    }

}


try {
    const Ipfs = require('ipfs')
    const OrbitDB = require('orbit-db')
    module.exports = exports = new IpfsConstructor(Ipfs, OrbitDB)
} catch (e) {
    window.NPP = new IpfsConstructor(window.Ipfs, window.OrbitDB)
}