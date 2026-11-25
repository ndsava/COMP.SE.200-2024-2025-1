import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            reportOnFailure: true,
            include: [
                'src/ceil.js',
                'src/chunk.js',
                'src/defaultTo.js',
                'src/every.js',
                'src/filter.js',
                'src/get.js',
                'src/isEmpty.js',
                'src/reduce.js',
                'src/toNumber.js',
                'src/toString.js',]
            //exclude: ['src/.internal/**']
        },
        passWithNoTests: true  // Prevents CI pipeline from failing before tests are implemented
    }
});