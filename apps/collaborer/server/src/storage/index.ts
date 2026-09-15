// The rest of the app depends on this interface, not the local-disk implementation
// directly — swapping in an object-storage adapter later means changing this file
// only.
export { localStorage as storage } from './local-storage.js';
