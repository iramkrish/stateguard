# stateguard

> Lightweight React hooks for structural sharing and optimized state updates.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ramkrishnan_stateguard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ramkrishnan_stateguard)

## Features

- `useShallowEqualState`: Prevent unnecessary re-renders via shallow comparison.
- `useDeepEqualState`: Prevent updates unless deeply unequal.
- Optimized for performance
- Tree-shakable and type-safe

## Installation

```bash
npm install stateguard
# or
yarn add stateguard
```

## Usage

### `useShallowEqualState`

```tsx
import { useShallowEqualState } from 'stateguard';

const Component = () => {
  const [user, setUser] = useShallowEqualState({
    name: 'Ram',
    role: 'Software Engineer',
  });

  // No re-render if same shallow values
  return <div>{user.name}</div>;
};
```

### `useDeepEqualState`

```tsx
import { useDeepEqualState } from 'stateguard';

const Component = () => {
  const [data, setData] = useDeepEqualState({ nested: { value: 1 } });

  return <pre>{JSON.stringify(data)}</pre>;
};
```

## API

### `useShallowEqualState<T>(initial: T)`

- Returns: `[state, setState]`
- Updates state only if shallow comparison fails

### `useDeepEqualState<T>(initial: T)`

- Uses deep structural comparison to prevent re-renders

## Testing

```bash
npm run test
# for coverage
npm run coverage
```

## Code Style

Lint, format and commit rules are automated:

```bash
npm run lint
npm run format
```

## License

MIT © Ram Krishnan
