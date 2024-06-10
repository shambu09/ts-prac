/*
    MinHeap

    Idea:
    Binary tree where all the child nodes are greater than the parent node in value

*/

export class MinHeap<T = number> {
    #heap: T[];
    length: number;

    constructor() {
        this.length = 0;
        this.#heap = [];
    }

    #left(i: number) {
        return 2 * i + 1;
    }

    #right(i: number) {
        return 2 * i + 2;
    }

    #parent(i: number) {
        return Math.trunc((i - 1) / 2);
    }

    #swap(idx1: number, idx2: number) {
        let tmp = this.#heap[idx1];
        this.#heap[idx1] = this.#heap[idx2];
        this.#heap[idx2] = tmp;
    }

    #heapify(idx: number) {
        let leftIdx = this.#left(idx);
        let rightIdx = this.#right(idx);
        let min = idx;

        if (leftIdx < this.length && this.#heap[min] > this.#heap[leftIdx]) {
            min = leftIdx;
        }

        if (rightIdx < this.length && this.#heap[min] > this.#heap[rightIdx]) {
            min = rightIdx;
        }

        if (min !== idx) {
            this.#swap(min, idx);
            this.#heapify(min);
        }
    }

    pop() {
        if (this.length === 0) return undefined;
        let value = this.#heap[0];

        this.#heap[0] = this.#heap[this.length - 1];
        this.#heap.pop();
        this.length--;
        this.#heapify(0);

        return value;
    }

    push(value: T) {
        this.#heap.push(value);

        let idx = this.length;
        this.length++;

        let parentIdx = this.#parent(idx);

        while (idx > 0 && this.#heap[parentIdx] > this.#heap[idx]) {
            this.#swap(parentIdx, idx);
            idx = parentIdx;
            parentIdx = this.#parent(idx);
        }
    }
}
