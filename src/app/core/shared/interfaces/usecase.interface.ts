import { Observable } from 'rxjs';

/**
 * Interfaz para casos de uso usuario.
 * I -> Entrada.
 * O -> Salida.
 */
export interface IUseCase<I, O> {
  /**
   * Accion ejecutar para los casos de uso.
   * @param input -> Entrada.
   */
  execute(input: I): Observable<O>;
}
