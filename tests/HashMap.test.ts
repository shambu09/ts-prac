import { HashMap } from "../src/HashMap";
import * as Hash from "../src/Hash";

describe("HashMap", () => {
    let map: HashMap<number>;

    beforeEach(() => {
        map = new HashMap<number>();
    });

    test("should return undefined for a non-existent key", () => {
        expect(map.get("nonexistent")).toBeUndefined();
    });

    test("should add and retrieve a value", () => {
        map.put("key1", 1);
        expect(map.get("key1")).toBe(1);
    });

    test("should overwrite an existing value", () => {
        map.put("key1", 1);
        map.put("key1", 2);
        expect(map.get("key1")).toBe(2);
    });

    test("should remove a key-value pair", () => {
        map.put("key1", 1);
        map.remove("key1");
        expect(map.get("key1")).toBeUndefined();
    });

    test("should return the correct size", () => {
        expect(map.size()).toBe(0);
        map.put("key1", 1);
        map.put("key2", 2);
        expect(map.size()).toBe(2);
        map.remove("key1");
        expect(map.size()).toBe(1);
    });

    test("should return true if the map is empty", () => {
        expect(map.empty()).toBe(true);
    });

    test("should return false if the map is not empty", () => {
        map.put("key1", 1);
        expect(map.empty()).toBe(false);
    });

    test("should handle numeric keys", () => {
        map.put(1, 100);
        expect(map.get(1)).toBe(100);
    });

    test("should handle hash collisions correctly", () => {
        // Mocking computeHash to force collision
        const mock = jest.spyOn(Hash, "computeHash");
        mock.mockImplementation((value: string) => {
            return 1;
        });

        map.put("key1", 1);
        map.put("key2", 2);

        // Since key1 and key2 hash to the same value, both should be retrievable
        expect(map.get("key1")).toBe(1);
        expect(map.get("key2")).toBe(2);

        mock.mockRestore();
    });

    test("should resize and rehash correctly when load factor is exceeded", () => {
        const initialCapacity = 10; // The initial number of buckets
        const loadFactorThreshold = 0.7;
        const entriesToAdd =
            Math.ceil(initialCapacity * loadFactorThreshold) + 1;

        for (let i = 0; i < entriesToAdd; i++) {
            map.put(`key${i}`, i);
        }

        expect(map.size()).toBe(entriesToAdd);
        for (let i = 0; i < entriesToAdd; i++) {
            expect(map.get(`key${i}`)).toBe(i);
        }
    });
});
