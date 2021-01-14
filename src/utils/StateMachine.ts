interface StateConfig {
  name?: string,
  onEnter?: () => void,
  onUpdate?(dt: number): void,
  onExit?: () => void
}


export default class StateMachine<T> {

  private context?: T;
  private name: string;
  private states = new Map<string, StateConfig>();
  private currentState?: StateConfig;
  private isSwitchingState = false;
  private stateQueue: string[] = [];

  constructor(context?: T, name?: string) {
    this.context = context;
    this.name = name ?? 'FSM';
  }
  addState(name: string, config?: StateConfig): StateMachine<T> {
    this.states.set(name, {
      name,
      onEnter: config?.onEnter?.bind((this.context)),
      onUpdate: config?.onUpdate?.bind(this.context),
      onExit: config?.onExit?.bind(this.context)
    })
    return this;
  }

  isCurrentState(name: string): boolean {
    if (!this.currentState) return false;
    return this.currentState.name === name;
  }

  setState(name: string): StateMachine<T> | void {
    if (!this.states.has(name)) return;

    if (this.isSwitchingState) {
      this.stateQueue.push(name);
    }

    this.isSwitchingState = true;

    if (this.currentState && this.currentState.onExit) this.currentState.onExit();

    this.currentState = this.states.get(name);

    if (this.currentState?.onEnter) this.currentState.onEnter();

    this.isSwitchingState = false;

    return this;
  }

  update(dt: number): StateMachine<T> | void {
    if (this.stateQueue.length > 0) {
      const name = this.stateQueue.shift()!;
      this.setState(name);
      return;
    }
    if (!this.currentState) return;
    if (this.currentState.onUpdate) this.currentState.onUpdate(dt)
  }
}