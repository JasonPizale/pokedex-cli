type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapInvatervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key,  {
            createdAt: Date.now(),
            val,
        });
    }

    get<T>(key: string): T | undefined {
        return this.#cache.get(key)?.val;
    }

    stopReapLoop(): void {
        if (this.#reapInvatervalId !== undefined) {
            clearInterval(this.#reapInvatervalId);
            this.#reapInvatervalId = undefined;
        }
    }

    #reap(): void {
        const cutoff = Date.now() - this.#interval;

        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < cutoff) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapInvatervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
}

