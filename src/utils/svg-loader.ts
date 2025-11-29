/**
 * Загружает SVG как строку для использования в Lit templates
 */
export async function loadSVG(path: string): Promise<string> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.warn(`[Vacuum Schedule Card] Не удалось загрузить SVG: ${path}`);
      return "";
    }
    return await response.text();
  } catch (error) {
    console.warn(`[Vacuum Schedule Card] Ошибка загрузки SVG: ${path}`, error);
    return "";
  }
}

/**
 * Встраивает SVG напрямую в HTML (для использования в Lit templates)
 */
export function inlineSVG(svgContent: string): string {
  return svgContent;
}

/**
 * Получает SVG иконку робота-пылесоса
 */
export function getVacuumRobotSVG(variant: "default" | "outline" | "filled" = "default"): string {
  const svgMap = {
    default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="42" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.25"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2" opacity="0.4"/>
  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2"/>
  <circle cx="50" cy="28" r="4" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
  <circle cx="50" cy="28" r="2" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <path d="M 20 50 Q 50 48 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M 20 50 Q 50 52 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <circle cx="12" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>
  <circle cx="88" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>
  <circle cx="12" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <circle cx="88" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
  <ellipse cx="50" cy="78" rx="3.5" ry="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <circle cx="42" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
  <circle cx="58" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
</svg>`,
    outline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary-text-color)" stroke-width="2.5"/>
  <circle cx="50" cy="28" r="7" fill="none" stroke="var(--primary-text-color)" stroke-width="2"/>
  <circle cx="50" cy="28" r="4" fill="none" stroke="var(--primary-text-color)" stroke-width="1.5" opacity="0.6"/>
  <circle cx="50" cy="28" r="2" fill="var(--primary-text-color)"/>
  <path d="M 20 50 Q 50 48 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M 20 50 Q 50 52 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <circle cx="12" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>
  <circle cx="88" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>
  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--primary-text-color)" opacity="0.7"/>
  <circle cx="42" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>
  <circle cx="58" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>
</svg>`,
    filled: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="38" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.3"/>
  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))"/>
  <circle cx="50" cy="28" r="5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.4"/>
  <circle cx="50" cy="28" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <path d="M 20 50 Q 50 48 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>
  <path d="M 20 50 Q 50 52 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>
  <circle cx="12" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>
  <circle cx="88" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>
  <circle cx="12" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>
  <circle cx="88" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>
  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>
  <ellipse cx="50" cy="78" rx="4" ry="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>
  <circle cx="42" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>
  <circle cx="58" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>
</svg>`
  };
  
  return svgMap[variant];
}

