export type GsbHookProfile = "minimal" | "standard" | "strict";

const PROFILE_ALIASES: Record<string, GsbHookProfile> = {
  min: "minimal",
  minimal: "minimal",
  std: "standard",
  standard: "standard",
  strict: "strict",
};

function normalizeProfile(value: string | undefined): GsbHookProfile {
  if (value === undefined || value === "") return "standard";
  const normalized = PROFILE_ALIASES[value.trim().toLowerCase()];
  return normalized ?? "standard";
}

export function getHookProfile(): GsbHookProfile {
  return normalizeProfile(
    Bun.env.GSB_HOOK_PROFILE ?? Bun.env.CLAUDE_HOOK_PROFILE,
  );
}

export function shouldRunInProfiles(profiles: Array<GsbHookProfile>): boolean {
  return profiles.includes(getHookProfile());
}
