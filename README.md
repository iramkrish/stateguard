# React Structural State

> Lightweight React hooks for state updates with structural sharing

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- `useShallowEqualState`: Prevent unnecessary re-renders via shallow comparison.
- `useDeepEqualState`: Prevent updates unless deeply unequal.
- Optimized for performance
- Tree-shakable and type-safe

## Installation

```bash
npm install react-structural-state
# or
yarn add react-structural-state
```

## Usage

### `useShallowEqualState`

```tsx
import { useShallowEqualState } from 'react-structural-state';

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
import { useDeepEqualState } from 'react-structural-state';

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
