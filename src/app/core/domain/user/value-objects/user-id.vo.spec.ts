// user-id.vo.spec.ts
import { UserId } from './user-id.vo';

describe('UserId', () => {
  it('debería usar el valor pasado en el constructor', () => {
    const explicit = new UserId('my-custom-id');
    expect(explicit.getValue()).toBe('my-custom-id');
  });

  it('debería generar un valor no vacío cuando no se pasa id', () => {
    const auto = new UserId();
    const val = auto.getValue();
    expect(typeof val).toBe('string');
    expect(val.length).toBeGreaterThan(0);
  });

  it('cada new UserId() sin parámetro produce valores distintos', () => {
    const first = new UserId();
    const second = new UserId();
    expect(first.getValue()).not.toBe(second.getValue());
    // Además, ambos no vacíos
    expect(first.getValue().length).toBeGreaterThan(0);
    expect(second.getValue().length).toBeGreaterThan(0);
  });
});
