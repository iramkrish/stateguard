# react-structural-state

> React hooks for structural sharing and optimized state updates.

## Features

- Shallow or deep equality checks
- Smart state updates, no unnecessary re-renders
- TypeScript support
- Lightweight and dependency-free (deep optional)

## Install

```bash
npm install react-structural-state
```

## Usage

```tsx
import { useShallowEqualState } from 'react-structural-state';

const [user, setUser] = useShallowEqualState({ name: '', age: 0 });

setUser({ name: 'Krish', age: 0 }); // won’t trigger re-render if equal
```

## API

### `useShallowEqualState<T>(initialState: T)`
Only updates state if new value is shallowly different.

### `useDeepEqualState<T>(initialState: T)`
Uses deep comparison (via lodash.isequal).

## License

MIT © Ram Krishnan
