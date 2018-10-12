import { DEVICE_ID } from '../configs/localconfigs';
import { ROOT_MEMORIES, MY_MEMORY } from '../configs/serverMemories';

console.log('0.jobworker blockchain : ', DEVICE_ID, ROOT_MEMORIES, MY_MEMORY);

const Gun = require('gun');
require('gun/lib/not.js');
require('gun/lib/path.js');
require('gun-unset');

const gunOptions = {
  peer: ROOT_MEMORIES,
};
const gunGlobal = Gun(gunOptions);

gun.on('out', { get: { '#': { '*': '' } } });

const gunLocal = Gun(DEVICE_ID);

// global blockChain
const blockChain = gunGlobal.get('BLOCKCHAIN');

// global communication channel
const aliveChannel = gunGlobal.get('ALIVE');

// local peers
const cloudPeers = gunLocal.get(`cloudpeers`);

////////////////////////// Chain as DB Operations /////////////////
const chainGet = key => {
  //  console.log('1.jobworker blockchain chainGet ', key);
  blockChain.get(key).val(v => {
    console.log('1.jobworker blockchain chainGet ', key, v);
    return v;
  });
};
const chainPut = (key, value) => {
  console.log('1.jobworker blockchain chainPut ', key, value);
  blockChain.get(key).put(value);
};


export { chainPut, chainGet };
