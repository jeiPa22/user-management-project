import { generateUuid } from './uuid.util'; // Ajusta la ruta según tu estructura
import { v4 as uuidv4 } from 'uuid';

// Expresión regular para validar UUID v4
const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('generateUuid', () => {
  it('debería generar un UUID válido (v4)', () => {
    const uuid = generateUuid();

    expect(uuid).toBeDefined();
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(UUID_V4_REGEX);
  });

  it('debería generar UUIDs diferentes en llamadas consecutivas', () => {
    const uuid1 = generateUuid();
    const uuid2 = generateUuid();
    const uuid3 = generateUuid();

    expect(uuid1).not.toBe(uuid2);
    expect(uuid1).not.toBe(uuid3);
    expect(uuid2).not.toBe(uuid3);
  });

  it('debería tener la longitud correcta (36 caracteres)', () => {
    const uuid = generateUuid();

    expect(uuid.length).toBe(36);
  });

  it('debería contener el caracter guión en las posiciones correctas', () => {
    const uuid = generateUuid();

    expect(uuid[8]).toBe('-');
    expect(uuid[13]).toBe('-');
    expect(uuid[18]).toBe('-');
    expect(uuid[23]).toBe('-');
  });

  it('debería tener la versión 4 en la posición correcta', () => {
    const uuid = generateUuid();

    // La posición 14 debe ser '4' (en el grupo de la versión)
    expect(uuid[14]).toBe('4');
  });

  it('debería tener el bit de variante correcto (8, 9, a, o b)', () => {
    const uuid = generateUuid();
    const variantChar = uuid[19].toLowerCase();

    expect(['8', '9', 'a', 'b']).toContain(variantChar);
  });

  it('debería ser compatible con la función v4 de uuid', () => {
    const generatedUuid = generateUuid();
    const uuidv4Result = uuidv4();

    expect(generatedUuid).toMatch(UUID_V4_REGEX);
    expect(uuidv4Result).toMatch(UUID_V4_REGEX);
  });
});
