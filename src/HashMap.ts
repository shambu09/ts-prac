/*
    HashMap

    Idea:
    Convert a key to a index and store the corresponding value for that key using the index
    To get the index, hash and compress the key
    Using Separate Chaining approach to avoid hash collisions
*/

import { computeHash } from "./Hash";
import { createNode, INode } from "./LinkedList";

interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

type TKey = string | number;
type TBucket<V> = INode<KeyValuePair<TKey, V>>;

export class HashMap<V> implements IMap<V> {
    readonly #MAXLOADFACTOR: number = 0.7;
    #buckets: (TBucket<V> | null)[];
    #size: number;
    #numBuckets: number;

    constructor() {
        this.#buckets = [null];
        this.#size = 0;
        this.#numBuckets = 10;

        for (let i = 0; i < this.#numBuckets; i++) {
            this.#buckets.push(null);
        }
    }

    #createHashNode(key: TKey, value: V): INode<KeyValuePair<TKey, V>> {
        return createNode({
            key,
            value,
        });
    }

    #loadFactor() {
        return this.#size / this.#numBuckets;
    }

    #getHash(key: TKey) {
        return computeHash(key.toString());
    }

    #getIndex(key: TKey) {
        let hashValue = this.#getHash(key);
        return Math.abs(hashValue) % this.#numBuckets;
    }

    get(key: TKey) {
        let index = this.#getIndex(key);
        let node = this.#buckets[index];

        while (node !== null) {
            if (node.value.key === key) return node.value.value;
            node = node.next;
        }

        return undefined;
    }

    remove(key: TKey) {
        let index = this.#getIndex(key);
        let node = this.#buckets[index];

        if (node === null) return;
        let dummy = this.#createHashNode(node.value.key, node.value.value);
        dummy.next = node;

        let walk = dummy;

        while (walk.next !== null) {
            if (walk.next.value.key === key) {
                walk.next = walk.next.next;
                this.#size -= 1;
                break;
            }

            walk = walk.next;
        }

        this.#buckets[index] = dummy.next;
    }

    put(key: TKey, value: V) {
        let index = this.#getIndex(key);
        let node = this.#buckets[index];
        let walk = node;

        while (walk !== null) {
            if (walk.value.key === key) {
                walk.value.value = value;
                return;
            }
            walk = walk.next;
        }

        let newNode = this.#createHashNode(key, value);
        newNode.next = node;
        this.#buckets[index] = newNode;
        this.#size += 1;

        if (this.#loadFactor() < this.#MAXLOADFACTOR) return;

        let tmp = this.#buckets;
        this.#numBuckets = 2 * this.#numBuckets;
        this.#size = 0;
        this.#buckets = [];

        for (let i = 0; i < this.#numBuckets; i++) {
            this.#buckets.push(null);
        }

        for (let node of tmp) {
            while (node !== null) {
                this.put(node.value.key, node.value.value);
                node = node.next;
            }
        }
    }

    size() {
        return this.#size;
    }

    empty() {
        return this.#size === 0;
    }
}
