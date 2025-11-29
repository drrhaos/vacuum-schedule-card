# SVG Assets

## Vacuum Robot Icons

Три варианта SVG иконок робота-пылесоса:

1. **vacuum-robot.svg** - Основной вариант с заливкой и обводкой
2. **vacuum-robot-outline.svg** - Контурный вариант (outline style)
3. **vacuum-robot-filled.svg** - Полностью залитый вариант

## Использование

### В компонентах Lit

```typescript
import { html, unsafeHTML } from "lit";
import { getVacuumRobotSVG } from "../utils/svg-loader";

// В методе render():
render() {
  return html`
    <div class="icon">
      ${unsafeHTML(getVacuumRobotSVG("default"))}
    </div>
  `;
}
```

### Прямое использование SVG

SVG используют CSS-переменные Home Assistant для автоматической адаптации к темам:
- `var(--primary-color)` - основной цвет
- `var(--primary-text-color)` - цвет текста
- `var(--card-background-color)` - фон карточки
- `var(--divider-color)` - цвет разделителей

### Варианты

- `"default"` - стандартный вариант с заливкой и обводкой
- `"outline"` - контурный стиль
- `"filled"` - полностью залитый вариант

