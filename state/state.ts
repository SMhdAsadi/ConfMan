import { observable } from "@legendapp/state";

type State = {};

export const $s = observable<State>({});

type PersistentState = {};

export const $ps = observable<PersistentState>({});
