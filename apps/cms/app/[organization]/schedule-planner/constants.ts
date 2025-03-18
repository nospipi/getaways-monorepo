export const ROLE_KEY = Symbol("schedule-role")

// Helper function to check if data is valid role data
export function isRoleData(data: Record<string | symbol, unknown>): boolean {
  return data && typeof data === "object" && data[ROLE_KEY] === true
}
