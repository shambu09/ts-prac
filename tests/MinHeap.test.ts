// MinHeap.test.ts
import { MinHeap } from "../src/MinHeap";

describe("MinHeap", () => {
    let minHeap: MinHeap<number>;

    beforeEach(() => {
        minHeap = new MinHeap<number>();
    });

    test("push method should add elements to the heap", () => {
        minHeap.push(3);
        expect(minHeap.length).toBe(1);
        minHeap.push(1);
        expect(minHeap.length).toBe(2);
        minHeap.push(2);
        expect(minHeap.length).toBe(3);
    });

    test("pop method should remove and return the smallest element", () => {
        minHeap.push(3);
        minHeap.push(1);
        minHeap.push(2);

        expect(minHeap.pop()).toBe(1);
        expect(minHeap.length).toBe(2);

        expect(minHeap.pop()).toBe(2);
        expect(minHeap.length).toBe(1);

        expect(minHeap.pop()).toBe(3);
        expect(minHeap.length).toBe(0);

        expect(minHeap.pop()).toBeUndefined();
        expect(minHeap.length).toBe(0);
    });

    test("pop method should return undefined when the heap is empty", () => {
        expect(minHeap.pop()).toBeUndefined();
    });

    test("heap should maintain the min-heap property", () => {
        minHeap.push(5);
        minHeap.push(3);
        minHeap.push(8);
        minHeap.push(1);
        minHeap.push(7);

        expect(minHeap.pop()).toBe(1);
        expect(minHeap.pop()).toBe(3);
        expect(minHeap.pop()).toBe(5);
        expect(minHeap.pop()).toBe(7);
        expect(minHeap.pop()).toBe(8);
    });

    test("length property should reflect the correct number of elements", () => {
        expect(minHeap.length).toBe(0);
        minHeap.push(4);
        expect(minHeap.length).toBe(1);
        minHeap.push(6);
        expect(minHeap.length).toBe(2);
        minHeap.pop();
        expect(minHeap.length).toBe(1);
        minHeap.pop();
        expect(minHeap.length).toBe(0);
    });

    test("pop method on an empty heap should not throw an error", () => {
        expect(() => minHeap.pop()).not.toThrow();
    });

    test("push method with multiple elements should maintain heap structure", () => {
        const elements = [10, 4, 5, 2, 7, 1, 9];
        elements.forEach((el) => minHeap.push(el));

        const sortedElements: number[] = [];
        while (minHeap.length > 0) {
            const value = minHeap.pop();

            if (value !== undefined) {
                sortedElements.push(value);
            }
        }
        console.log(sortedElements);
        expect(sortedElements).toEqual([1, 2, 4, 5, 7, 9, 10]);
    });
});
