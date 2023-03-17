/**
 * UUIDv4
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "146fb209-af3b-4c67-863a-a98b641c95e5"
 */
export type Uuid = string

/**
 * File name
 * @example "picture.jpg"
 */
export type FileName = string

/**
 * File comment
 * @example "This is a comment"
 */
export type Comment = string

/**
 * Identifier
 * @isInt Id must be an integer
 * @example 1
 * @minimum 1 Id must be positive
 */
export type Id = number

/**
 * Hexadecimal color
 * @pattern #[0-9A-Za-z]{6} 'color' is invalid
 * @example #1A2B3C
 */
export type Color = string
