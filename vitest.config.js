import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            reportOnFailure: true,
            include: ['src'],
            exclude: ['src/.internal']
        },
        passWithNoTests: true  // Prevents CI pipeline from failing before tests are implemented
    }
});
