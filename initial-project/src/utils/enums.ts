export function randomEnum<T extends object>(enumeration: T): T[keyof T] {
  const enumValues = Object.values(enumeration);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as T[keyof T];
}
