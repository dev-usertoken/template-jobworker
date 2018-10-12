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
// ///////////////////////// Chain as communication conduit ///////////
// const getAlive = key => {
//   //  console.log('1.jobworker blockchain getAlive ', key);
//   aliveChannel.get(key).val(v => {
//     console.log('1.jobworker blockchain getAlive ', key, v);
//     return v;
//   });
// };
// const putAlive = (key, value) => {
//   console.log('1.jobworker blockchain putAlive ', key, value);
//   aliveChannel.get(key).put(value);
// };
// const heartBeat = () => {
//   const beat = new Date().toISOString();
//   //  console.log('1.jobworker blockchain heartBeat : ', beat);
//   try {
//     aliveChannel.path('HEART_BEAT').put({ id: DEVICE_ID, date: beat });
//   } catch (e) {}
// };
// ///////////////////////////
// // auto register new worker - ID will be replaced with PKI and hash value
// //////////////////////////
// const registerWorker = id => {
//   const currentDate = new Date().toISOString();
//   console.log('1.jobworker blockchain registerWorker : ', id);
//   try {
//     let newPeer = gun.get(id);
//     // first timer heard from this peer
//     cloudPeers
//       .get('peers-radius-1')
//       .set(newPeer)
//       .get('alive')
//       .not(key => {
//         console.log(
//           '3.jobworker blockchain registerWorker NEW peer : ',
//           key,
//           id,
//         );
//         // add this peer to peer-radius-1
//         cloudPeers
//           .get('peers-radius-1')
//           .set(newPeer)
//           .get('alive')
//           .put(currentDate);
//       });
//     // heard from this worker before
//     cloudPeers
//       .get('peers-radius-1')
//       .set(newPeer)
//       .get('alive')
//       .val(lastAlive => {
//         console.log(
//           '4.jobworker blockchain registerWorker ',
//           id,
//           ' lastAlive ',
//           lastAlive,
//         );
//         cloudPeers
//           .get('peers-radius-1')
//           .set(newPeer)
//           .get('lastAlive')
//           .put(lastAlive);
//       });
//     cloudPeers
//       .get('peers-radius-1')
//       .set(newPeer)
//       .get('alive')
//       .put(currentDate);
//     console.log(
//       '5.jobworker blockchain registerWorker ',
//       id,
//       ' now ',
//       currentDate,
//     );
//   } catch (e) {}
// };

// var timeout;

// const heartbeat_stop = () => {
//   clearInterval(timeout);
//   console.log('1.jobworker blockchain The heartbeat has been stopped');
// };

// const heartbeat_start = () => {
//   const beat_interval = 3000; // 3 sec
//   timeout = setInterval(heartBeat, beat_interval);
//   //  console.log(
//   //    '1.jobworker blockchain heartbeat_start at',
//   //    beat_interval / 1000,
//   //    'second intervals',
//   //  );
// };
// //const HYPER_PORT = process.env.HYPER_PORT || 3030;
// //const HYPER_HOST = process.env.HYPER_HOST || 'localhost';
// //const HYPER_URL = `http://${HYPER_HOST}:${HYPER_PORT}/batch`;
// //
// //cloudState.get('HYPER_URL').put(HYPER_URL)

// heartbeat_start();
// aliveChannel
//   .path('HEART_BEAT')
//   .get('id')
//   .on(id => {
//     if (id !== DEVICE_ID) registerWorker(id);
//   });

export { chainPut, chainGet };
