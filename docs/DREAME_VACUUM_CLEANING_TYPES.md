# Исследование: Запуск разных типов уборки в dreame_vacuum

## Резюме исследования

Проведено исследование интеграции dreame-vacuum для выяснения правильного способа запуска разных типов уборки:
- Сухая уборка (vacuum)
- Влажная уборка (mop)
- Комбинированная уборка (vacuum_and_mop)

## Найденные факты

### 1. Официально документированные сервисы

В `services.yaml` интеграции dreame-vacuum официально документирован только один сервис для уборки конкретных комнат:

**`dreame_vacuum.vacuum_clean_segment`**
- **Параметры:**
  - `segments` (обязательный): массив ID комнат или одно число
  - `repeats` (опциональный): количество повторений (1-3)
  - `suction_level` (опциональный): уровень всасывания (0-3)
  - `water_volume` (опциональный): уровень воды (1-3) ⚠️ **Ключевой параметр!**

### 2. Текущая реализация в проекте

В текущем коде используются следующие сервисы:

```typescript
// Сухая уборка - все комнаты
vacuum.start

// Сухая уборка - конкретные комнаты
dreame_vacuum.vacuum_clean_segment

// Влажная уборка - все комнаты
dreame_vacuum.vacuum_mop ❓ (не найдено в services.yaml)

// Влажная уборка - конкретные комнаты
dreame_vacuum.vacuum_mop_segment ❓ (не найдено в services.yaml)

// Комбинированная уборка - все комнаты
dreame_vacuum.vacuum_clean_and_mop ❓ (не найдено в services.yaml)

// Комбинированная уборка - конкретные комнаты
dreame_vacuum.vacuum_clean_and_mop_segment ❓ (не найдено в services.yaml)
```

## Возможные способы реализации

### Способ 1: Использование water_volume в vacuum_clean_segment ⭐ (РЕКОМЕНДУЕТСЯ)

Параметр `water_volume` в `vacuum_clean_segment` может управлять типом уборки:

```yaml
# Сухая уборка
service: dreame_vacuum.vacuum_clean_segment
target:
  entity_id: vacuum.xiaomi_m30s
data:
  segments: [16, 17]
  # water_volume не указываем

# Влажная/Комбинированная уборка
service: dreame_vacuum.vacuum_clean_segment
target:
  entity_id: vacuum.xiaomi_m30s
data:
  segments: [16, 17]
  water_volume: 2  # 1-3: уровень воды
```

**Преимущества:**
- ✅ Официально документированный сервис
- ✅ Один универсальный сервис для всех типов уборки
- ✅ Поддержка всех параметров

**Недостатки:**
- ❓ Неясно, как различить "только влажная" и "сухая + влажная"
- ⚠️ Требует проверки в реальной среде

### Способ 2: Select entity для cleaning_mode

Многие интеграции предоставляют select entity для выбора режима уборки:

```yaml
# Шаг 1: Установить режим
service: select.select_option
target:
  entity_id: select.xiaomi_m30s_cleaning_mode
data:
  option: "sweeping_and_mopping"  # или "sweeping", "mopping"

# Шаг 2: Запустить уборку
service: vacuum.start
# или
service: dreame_vacuum.vacuum_clean_segment
```

**Преимущества:**
- ✅ Четкое разделение режимов
- ✅ Использует стандартные сервисы

**Недостатки:**
- ❓ Требует два шага
- ❓ Не все устройства могут поддерживать

### Способ 3: Динамические сервисы (если существуют)

Сервисы могут регистрироваться динамически и не быть в services.yaml, но работать в реальности:

- `dreame_vacuum.vacuum_mop`
- `dreame_vacuum.vacuum_clean_and_mop`
- `dreame_vacuum.vacuum_mop_segment`
- `dreame_vacuum.vacuum_clean_and_mop_segment`

**Необходимо проверить в Home Assistant Developer Tools → Services**

## Рекомендации по проверке

### Шаг 1: Проверить доступные сервисы

1. Откройте Home Assistant
2. Перейдите в Developer Tools → Services
3. В фильтре введите: `dreame_vacuum`
4. Проверьте наличие следующих сервисов:
   - `vacuum_mop`
   - `vacuum_clean_and_mop`
   - `vacuum_mop_segment`
   - `vacuum_clean_and_mop_segment`

### Шаг 2: Проверить select entities

1. Developer Tools → States
2. Найдите entities вида: `select.{ваш_пылесос}_cleaning_mode`
3. Проверьте доступные опции

### Шаг 3: Проверить параметры vacuum_clean_segment

1. Developer Tools → Services
2. Выберите `dreame_vacuum.vacuum_clean_segment`
3. Проверьте доступные параметры, особенно `water_volume`

### Шаг 4: Создать тестовые автоматизации

Создайте простые автоматизации для каждого типа уборки и протестируйте:

```yaml
# Тест 1: Сухая уборка через vacuum_clean_segment
automation:
  - alias: "Test - Dry Cleaning"
    trigger:
      - platform: event
        event_type: test_dry_cleaning
    action:
      - service: dreame_vacuum.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_m30s
        data:
          segments: [16]

# Тест 2: Влажная уборка через vacuum_clean_segment с water_volume
automation:
  - alias: "Test - Wet Cleaning with water_volume"
    trigger:
      - platform: event
        event_type: test_wet_cleaning
    action:
      - service: dreame_vacuum.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_m30s
        data:
          segments: [16]
          water_volume: 2

# Тест 3: Влажная уборка через vacuum_mop (если существует)
automation:
  - alias: "Test - Wet Cleaning via vacuum_mop"
    trigger:
      - platform: event
        event_type: test_wet_cleaning_via_mop
    action:
      - service: dreame_vacuum.vacuum_mop
        target:
          entity_id: vacuum.xiaomi_m30s
```

## План действий

1. ✅ **Исследование завершено** - собрана информация о возможных способах
2. ⏳ **Требуется проверка** - проверить в реальной среде Home Assistant:
   - Доступные сервисы
   - Select entities для режимов
   - Работу параметра water_volume
3. ⏳ **Обновление кода** - на основе результатов проверки выбрать и реализовать правильный способ
4. ⏳ **Обновление документации** - обновить README и примеры автоматизаций

## Выводы

1. **Официально документирован** только `vacuum_clean_segment` с параметром `water_volume`
2. **Текущая реализация** использует сервисы, которые не найдены в официальной документации
3. **Рекомендуется** проверить в реальной среде:
   - Существуют ли динамические сервисы `vacuum_mop*` и `vacuum_clean_and_mop*`
   - Работает ли параметр `water_volume` для управления типом уборки
   - Есть ли select entity для выбора режима уборки

## Следующие шаги

1. Создать тестовые автоматизации в Home Assistant
2. Проверить доступные сервисы через Developer Tools
3. На основе результатов выбрать правильный способ реализации
4. Обновить код и документацию




