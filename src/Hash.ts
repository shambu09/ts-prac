export const computeHash = (value: string): number => {
    const key = value.toLowerCase();
    const p = 31;
    const m = 1e9 + 9;
    let hash = 0;
    let p_pow = 1;
    let a = "a".charCodeAt(0);

    for (let i = 0; i < key.length; i++) {
        hash = (hash + (key.charCodeAt(i) - a + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
    }

    return hash;
};
