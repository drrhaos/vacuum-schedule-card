/**
 * Интерфейсы для работы с автоматизациями Home Assistant
 */

/**
 * Конфигурация автоматизации Home Assistant
 */
export interface AutomationConfig {
  id: string;
  alias?: string;
  description?: string;
  trigger?: AutomationTrigger | AutomationTrigger[];
  triggers?: AutomationTrigger[];
  condition?: AutomationCondition | AutomationCondition[];
  conditions?: AutomationCondition[];
  action?: AutomationAction | AutomationAction[];
  actions?: AutomationAction[];
  mode?: string;
  _entity_id?: string;
  _state?: string;
  _attributes?: Record<string, unknown>;
  _from_states?: boolean;
  _incomplete?: boolean;
}

/**
 * Триггер автоматизации
 */
export interface AutomationTrigger {
  platform: string;
  at?: string;
  [key: string]: unknown;
}

/**
 * Условие автоматизации
 */
export interface AutomationCondition {
  condition: string;
  weekday?: string | string[];
  [key: string]: unknown;
}

/**
 * Действие автоматизации
 */
export interface AutomationAction {
  target?: {
    entity_id?: string | string[];
    [key: string]: unknown;
  };
  data?: Record<string, unknown>;
  service?: string;
  action?: string;
  [key: string]: unknown;
}

/**
 * Состояние автоматизации из hass.states
 */
export interface AutomationState {
  entity_id: string;
  state: string;
  attributes: {
    id?: string;
    friendly_name?: string;
    [key: string]: unknown;
  };
}

