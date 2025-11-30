/**
 * English translations for Vacuum Schedule Card
 * Translations are grouped by categories for easy navigation
 */
export const en = {
  // ============================================================================
  // SCHEDULE
  // ============================================================================
  "schedule_title": "Vacuum Schedule",
  "schedules_count": "schedules",
  "no_schedules": "No schedules. Add your first schedule.",
  "add_schedule": "+ Add Schedule",
  "edit_schedule": "Edit Schedule",
  "add_schedule_title": "Add Schedule",
  "delete_confirm": "Delete this schedule?",
  "loading": "Loading...",
  "enabled": "Enabled",
  "name_label": "Name",
  "name_placeholder": "Schedule name (optional)",

  // ============================================================================
  // DAYS
  // ============================================================================
  "days_label": "Days of week",
  "every_day": "Every day",
  "no_days": "No days",
  "day_names": "Sun,Mon,Tue,Wed,Thu,Fri,Sat",

  // ============================================================================
  // TIME
  // ============================================================================
  "time_label": "Time",

  // ============================================================================
  // ROOMS
  // ============================================================================
  "rooms_label": "Rooms to clean",
  "rooms_available": "available",
  "all_rooms": "All rooms",
  "no_rooms_selected": "No rooms selected",
  "rooms_not_found": "Rooms not found. Check vacuum connection.",
  "rooms_hint": "💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",
  "select_all": "Select all",
  "room_names": "Living Room,Bedroom,Kitchen,Bathroom",

  // ============================================================================
  // CONTROL
  // ============================================================================
  "start": "Start",
  "stop": "Stop",
  "pause": "Pause",
  "return_to_base": "Return to Base",

  // ============================================================================
  // CLEANING TYPES
  // ============================================================================
  "cleaning_type_label": "Cleaning Type",
  "cleaning_type_vacuum": "Vacuum Only",
  "cleaning_type_mop": "Mop Only",
  "cleaning_type_vacuum_and_mop": "Vacuum and Mop",

  // ============================================================================
  // STATES
  // ============================================================================
  "state_charging": "charging",
  "state_cleaning": "cleaning",
  "state_paused": "paused",
  "state_returning": "returning",
  "state_docked": "docked",
  "state_idle": "idle",
  "state_error": "error",
  "state_standby": "standby",
  "state_spot_cleaning": "spot cleaning",
  "state_zone_cleaning": "zone cleaning",
  "state_mopping": "mopping",
  "state_docking": "docking",
  "state_map_cleaning": "map cleaning",
  "state_manual_control": "manual control",
  "state_going_home": "going home",
  "state_cleaning_room": "cleaning room",
  "state_completing": "completing",
  "state_unknown": "unknown",
  "state_drying": "drying",
  "state_drying_mop": "drying mop",
  "state_drying_completed": "drying completed",
  "state_drying_paused": "drying paused",
  "state_drying_error": "drying error",
  "state_fast_drying": "fast drying",
  "state_deep_drying": "deep drying",
  "state_hot_air_drying": "hot air drying",
  "state_rinsing_mop": "rinsing mop",
  "state_auto_cleaning": "auto cleaning",
  "state_dry_and_wet_cleaning": "dry and wet cleaning",
  "state_cleaning_and_adding_water": "cleaning and adding water",
  "state_charging_completed": "charging completed",
  "state_returning_for_mop_rinsing": "returning for mop rinsing",
  "state_washing_paused": "washing paused",
  "state_returning_to_base": "returning to base",
  // Additional task statuses
  "state_room_cleaning": "room cleaning",
  "state_cleaning_paused": "cleaning paused",
  "state_room_cleaning_paused": "room cleaning paused",
  "state_zone_cleaning_paused": "zone cleaning paused",
  "state_spot_cleaning_paused": "spot cleaning paused",
  "state_map_cleaning_paused": "map cleaning paused",
  "state_docking_paused": "docking paused",
  "state_mopping_paused": "mopping paused",
  "state_zone_mopping_paused": "zone mopping paused",
  "state_room_mopping_paused": "room mopping paused",
  "state_zone_docking_paused": "zone docking paused",
  "state_room_docking_paused": "room docking paused",
  "state_cruising_path": "cruising path",
  "state_cruising_path_paused": "cruising path paused",
  "state_cruising_point": "cruising point",
  "state_cruising_point_paused": "cruising point paused",
  "state_summon_clean_paused": "summon clean paused",
  "state_returning_to_install_mop": "returning to install mop",
  "state_returning_to_remove_mop": "returning to remove mop",
  "state_fast_mapping": "fast mapping",
  // Additional statuses from sensor.state.state
  "state_sweeping": "sweeping",
  "state_building": "building",
  "state_sweeping_and_mopping": "sweeping and mopping",
  "state_upgrading": "upgrading",
  "state_clean_summon": "summon to clean",
  "state_station_reset": "station reset",
  "state_returning_to_wash": "returning to wash",
  "state_water_check": "water checking",
  "state_clean_add_water": "cleaning and adding water",
  "state_auto_emptying": "auto-emptying",
  "state_remote_control": "remote controlling",
  "state_smart_charging": "smart charging",
  "state_second_cleaning": "second time cleaning",
  "state_human_following": "human following",
  "state_returning_auto_empty": "returning to auto-empty",
  "state_shortcut": "shortcut",
  "state_monitoring": "monitoring",
  "state_monitoring_paused": "monitoring paused",
  // Additional statuses from sensor.status.state
  "state_completed": "completed",
  "state_follow_wall_cleaning": "follow wall cleaning",
  "state_ota": "OTA",
  "state_fct": "FCT",
  "state_wifi_set": "WiFi set",
  "state_power_off": "power off",
  "state_factory": "factory",
  "state_sleeping": "sleeping",
  "state_self_test": "self test",
  "state_factory_test": "factory test",
  "state_summon_clean": "summon to clean",
  "state_person_follow": "person follow",
  // Compatibility duplicates (old keys)
  "state_poloskanie_shvabry": "rinsing mop",
  "state_avtoochistka": "auto cleaning",
  "state_suhaya_i_vlazhnaya_uborka": "dry and wet cleaning",
  "state_ochistka_i_dobavlenie_vody": "cleaning and adding water",
  "state_zaryadka_zavershena": "charging completed",
  "state_vozvraschenie_dlya_poloskaniya_shvabry": "returning for mop rinsing",
  "state_stirka_priostanovlena": "washing paused",

  // ============================================================================
  // ERRORS
  // ============================================================================
  "error_no_entity": "Error: hass or entity not specified",
  "error_entity_not_found": "Error: entity",
  "not_found": "not found",
  "error_loading": "Error loading schedules:",
  "error_saving": "Error saving:",
  "error_updating": "Error updating:",
  "error_deleting": "Error deleting:",
  "error_no_days": "Select at least one day",
  "error_no_time": "Specify time",
  "error_time_required": "Time is required",
  "error_days_required": "Select at least one day",
  "error_no_hass": "Error: hass not available",
  "error_starting": "Error starting",
  "error_stopping": "Error stopping",
  "error_pausing": "Error pausing",
  "error_returning": "Error returning",

  // ============================================================================
  // COMMON
  // ============================================================================
  "cancel": "Cancel",
  "save": "Save",
} as const;
