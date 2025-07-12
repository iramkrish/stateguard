# stateguard

> Lightweight React hooks for structural sharing and optimized state updates.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ramkrishnan_stateguard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ramkrishnan_stateguard)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ramkrishnan_stateguard&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ramkrishnan_stateguard)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ramkrishnan_stateguard&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=ramkrishnan_stateguard)

---

## Features

- `useShallowEqualState` — skip re-renders if shallow comparison passes
- `useDeepEqualState` — deep structural comparison to guard updates
- `useMemoDeepEqual`, `useMemoShallowEqual` — stable memoization via equality
- `usePreviousDeepEqual` — retain previous state deeply
- `useEqualityState` — configurable equality strategy hook
- Handles circular references internally
- Minimal and dependency-free
- Tree-shakable — import only what you need

---

## Installation

```bash
npm install stateguard
# or
yarn add stateguard
```

---

## Usage

### `useShallowEqualState`

```tsx
import { useShallowEqualState } from 'stateguard';

type User = {
  name: string;
  role: string;
};

const Component = () => {
  const [user, setUser] = useShallowEqualState<User>({ name: 'Ram', role: 'Engineer' });

  return <div>{user.name}</div>;
};
```

### `useDeepEqualState`

```tsx
import { useDeepEqualState } from 'stateguard';

type Config = {
  nested: {
    theme: string;
  };
};

const Component = () => {
  const [config, setConfig] = useDeepEqualState<Config>({ nested: { theme: 'dark' } });

  return <pre>{JSON.stringify(config)}</pre>;
};
```

### `useMemoDeepEqual` / `useMemoShallowEqual`

```tsx
import { useMemoDeepEqual, useMemoShallowEqual } from 'stateguard';

type Settings = {
  options: string[];
};

const Component = ({ settings }: { settings: Settings }) => {
  const memoizedDeep = useMemoDeepEqual<Settings>(settings);
  const memoizedShallow = useMemoShallowEqual<Settings>(settings);

  return <div>{memoizedDeep.options.join(', ')}</div>;
};
```

### `usePreviousDeepEqual`

```tsx
import { usePreviousDeepEqual } from 'stateguard';

type Value = {
  count: number;
};

const Component = ({ value }: { value: Value }) => {
  const previous = usePreviousDeepEqual<Value>(value);

  return (
    <div>
      Current: {value.count} | Previous: {previous?.count ?? 'N/A'}
    </div>
  );
};
```

### `useEqualityState`

```tsx
import { useEqualityState, deepEqual } from 'stateguard';

type Profile = {
  name: string;
  age: number;
};

const Component = () => {
  const [profile, setProfile] = useEqualityState<Profile>({ name: 'Alice', age: 30 }, deepEqual);

  return (
    <div>
      {profile.name} - {profile.age}
    </div>
  );
};
```

---

## API Reference

### `useShallowEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void]`

- **Returns**: A tuple `[state, setState]`
- **Behavior**: Updates state only if shallow comparison detects a change
- **Use Case**: For state objects with shallow structure (single-level keys)

---

### `useDeepEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void]`

- **Returns**: A tuple `[state, setState]`
- **Behavior**: Updates state only if a deep structural comparison detects a change
- **Use Case**: For nested objects or arrays that require structural equality checks

---

### `useEqualityState<T>(initialValue: T, isEqual: (a: T, b: T) => boolean): [T, (value: T | ((prev: T) => T)) => void]`

- **Returns**: A tuple `[state, setState]`
- **Behavior**: Uses a **custom equality function** to determine whether the state should update
- **Use Case**: Ideal when you want to control update logic based on your own comparison strategy

---

### `useMemoDeepEqual<T>(value: T): T`

- **Returns**: A **memoized** version of `value`
- **Behavior**: Reuses the reference unless the new value differs structurally
- **Use Case**: Prevents unnecessary recalculations when passing deep objects to children or effects

---

### `useMemoShallowEqual<T>(value: T): T`

- **Returns**: A **memoized** version of `value`
- **Behavior**: Reuses the reference unless a shallow comparison detects a change
- **Use Case**: Useful when memoizing props or state objects with shallow shape (single-level keys)

---

### `usePreviousDeepEqual<T>(value: T): T | undefined`

- **Returns**: The **previous deeply equal** value
- **Behavior**: Tracks previous value using deep equality comparison; only updates if the current value differs structurally
- **Use Case**: Compare past and present values without false positives from reference changes

---

## Testing

All hooks and utilities have 100% test coverage.

```bash
npm run test
npm run coverage
```

---

## Code Style & Tooling

```bash
npm run lint
npm run format
```

Commit linting and formatting are automated via hooks

---

## License

MIT © Ram Krishnan
