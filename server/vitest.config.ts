import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
    server: {
      deps: {
        external: ['@nestjs/common', '@nestjs/core', 'rxjs'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', '**/*.module.ts'],
    },
  },
});
