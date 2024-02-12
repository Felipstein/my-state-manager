import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './createStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  // addTodo(title: string): void;
  // toggleTodoDone(todoId: number): void;
  // removeTodo(todoId: number): void;
}

export const globalStore = createStore<IGlobalStore>((setState) => ({
  user: null,
  todos: [],
  login: () =>
    setState({
      user: {
        name: 'Felipe Oliveira',
        email: 'felipe@jstack.com.br',
      },
    }),
  logout: () => setState({ user: null }),
}));
