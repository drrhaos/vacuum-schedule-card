/**
 * Загружает SVG как строку для использования в Lit templates
 */
export declare function loadSVG(path: string): Promise<string>;
/**
 * Встраивает SVG напрямую в HTML (для использования в Lit templates)
 */
export declare function inlineSVG(svgContent: string): string;
/**
 * Получает SVG иконку робота-пылесоса
 */
export declare function getVacuumRobotSVG(variant?: "default" | "outline" | "filled"): string;
