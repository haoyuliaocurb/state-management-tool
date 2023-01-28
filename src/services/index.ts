import axios from 'axios';

type Depupe = 'first' | 'last' | 'none';

class Service {
    private controller?: AbortController;
    private curReq?: Promise<any>;
    private subscriber = 0;
    private depupe: Depupe;
 
    constructor(depupe: Depupe = 'first' as const) {
        this.depupe = depupe;
    }

    private async _getDataThenCleanUp () {
        if (!this.curReq) return;

        let data;

        this.subscriber += 1;

        try {
            const res = await this.curReq;
            data = res.data;
        } catch(e) {
        }

        this.subscriber -= 1;

        if (!this.subscriber) {
            this.controller = undefined;
            this.curReq = undefined;
        }

        return data;
    }

    async fetch () { 
        switch (this.depupe) {
            case 'first': {
                if (this.controller) {
                    console.warn('Dedupe: keep the first request');
                } else {
                    this.controller = new AbortController();
                    this.curReq = axios.get('/user/haoyu', {
                        signal: this.controller.signal,
                    })
                }
        
                return await this._getDataThenCleanUp();
            }

            case 'last': {
                if (this.controller) {
                    this.controller.abort();
                    console.warn('Dedupe: keep the last request');
                }

                this.controller = new AbortController();
                this.curReq = axios.get('/user/haoyu', {
                    signal: this.controller.signal,
                })
        
                return await this._getDataThenCleanUp();
            }

            case 'none': {
                this.controller = new AbortController();
                const { data } = await axios.get('/user/haoyu', {
                    signal: this.controller.signal,
                })

                return data;
            }
        }
    }
};

const service = new Service('first');

export default service;
