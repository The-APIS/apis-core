module.exports = {
  'successful_completion': '0000',
  'warning': '0100',
  'dynamic_result_sets_returned': '0100',
  'implicit_zero_bit_padding': '0100',
  'null_value_eliminated_in_set_function': '0100',
  'privilege_not_granted': '0100',
  'privilege_not_revoked': '0100',
  'string_data_right_truncation': '0100',
  'deprecated_feature': '01P0',
  'no_data': '0200',
  'no_additional_dynamic_result_sets_returned': '0200',
  'sql_statement_not_yet_complete': '0300',
  'connection_exception': '0800',
  'connection_does_not_exist': '0800',
  'connection_failure': '0800',
  'sqlclient_unable_to_establish_sqlconnection': '0800',
  'sqlserver_rejected_establishment_of_sqlconnection': '0800',
  'transaction_resolution_unknown': '0800',
  'protocol_violation': '08P0',
  'triggered_action_exception': '0900',
  'feature_not_supported': '0A00',
  'invalid_transaction_initiation': '0B00',
  'locator_exception': '0F00',
  'invalid_locator_specification': '0F00',
  'invalid_grantor': '0L00',
  'invalid_grant_operation': '0LP0',
  'invalid_role_specification': '0P00',
  'diagnostics_exception': '0Z00',
  'stacked_diagnostics_accessed_without_active_handler': '0Z00',
  'case_not_found': '2000',
  'cardinality_violation': '2100',
  'data_exception': '2200',
  'array_subscript_error': '2202',
  'character_not_in_repertoire': '2202',
  'datetime_field_overflow': '2200',
  'division_by_zero': '2201',
  'error_in_assignment': '2200',
  'escape_character_conflict': '2200',
  'indicator_overflow': '2202',
  'interval_field_overflow': '2201',
  'invalid_argument_for_logarithm': '2201',
  'invalid_argument_for_ntile_function': '2201',
  'invalid_argument_for_nth_value_function': '2201',
  'invalid_argument_for_power_function': '2201',
  'invalid_argument_for_width_bucket_function': '2201G',
  'invalid_character_value_for_cast': '22018',
  'invalid_datetime_format': '22007',
  'invalid_escape_character': '22019',
  'invalid_escape_octet': '2200D',
  'invalid_escape_sequence': '22025',
  'nonstandard_use_of_escape_character': '22P06',
  'invalid_indicator_parameter_value': '22010',
  'invalid_parameter_value': '22023',
  'invalid_regular_expression': '2201B',
  'invalid_row_count_in_limit_clause': '2201W',
  'invalid_row_count_in_result_offset_clause': '2201X',
  'invalid_tablesample_argument': '2202H',
  'invalid_tablesample_repeat': '2202G',
  'invalid_time_zone_displacement_value': '22009',
  'invalid_use_of_escape_character': '2200C',
  'most_specific_type_mismatch': '2200G',
  'null_value_not_allowed': '22004',
  'null_value_no_indicator_parameter': '22002',
  'numeric_value_out_of_range': '22003',
  'string_data_length_mismatch': '22026',
  'string_data_right_truncation': '22001',
  'substring_error': '22011',
  'trim_error': '22027',
  'unterminated_c_string': '22024',
  'zero_length_character_string': '2200F',
  'floating_point_exception': '22P01',
  'invalid_text_representation': '22P02',
  'invalid_binary_representation': '22P03',
  'bad_copy_file_format': '22P04',
  'untranslatable_character': '22P05',
  'not_an_xml_document': '2200L',
  'invalid_xml_document': '2200M',
  'invalid_xml_content': '2200N',
  'invalid_xml_comment': '2200S',
  'invalid_xml_processing_instruction': '2200T',
  'integrity_constraint_violation': '23000',
  'restrict_violation': '23001',
  'not_null_violation': '23502',
  'foreign_key_violation': '23503',
  'unique_violation': '23505',
  'check_violation': '23514',
  'exclusion_violation': '23P01',
  'invalid_cursor_state': '24000',
  'invalid_transaction_state': '25000',
  'active_sql_transaction': '25001',
  'branch_transaction_already_active': '25002',
  'held_cursor_requires_same_isolation_level': '25008',
  'inappropriate_access_mode_for_branch_transaction': '25003',
  'inappropriate_isolation_level_for_branch_transaction': '25004',
  'no_active_sql_transaction_for_branch_transaction': '25005',
  'read_only_sql_transaction': '25006',
  'schema_and_data_statement_mixing_not_supported': '25007',
  'no_active_sql_transaction': '25P01',
  'in_failed_sql_transaction': '25P02',
  'idle_in_transaction_session_timeout': '25P03',
  'invalid_sql_statement_name': '26000',
  'triggered_data_change_violation': '27000',
  'invalid_authorization_specification': '28000',
  'invalid_password': '28P01',
  'dependent_privilege_descriptors_still_exist': '2B000',
  'dependent_objects_still_exist': '2BP01',
  'invalid_transaction_termination': '2D000',
  'sql_routine_exception': '2F000',
  'function_executed_no_return_statement': '2F005',
  'modifying_sql_data_not_permitted': '2F002',
  'prohibited_sql_statement_attempted': '2F003',
  'reading_sql_data_not_permitted': '2F004',
  'invalid_cursor_name': '34000',
  'external_routine_exception': '38000',
  'containing_sql_not_permitted': '38001',
  'modifying_sql_data_not_permitted': '38002',
  'prohibited_sql_statement_attempted': '38003',
  'reading_sql_data_not_permitted': '38004',
  'external_routine_invocation_exception': '39000',
  'invalid_sqlstate_returned': '39001',
  'null_value_not_allowed': '39004',
  'trigger_protocol_violated': '39P01',
  'srf_protocol_violated': '39P02',
  'event_trigger_protocol_violated': '39P03',
  'savepoint_exception': '3B000',
  'invalid_savepoint_specification': '3B001',
  'invalid_catalog_name': '3D000', /* Database does not exist */
  'invalid_schema_name': '3F000',
  'transaction_rollback': '40000',
  'transaction_integrity_constraint_violation': '40002',
  'serialization_failure': '40001',
  'statement_completion_unknown': '40003',
  'deadlock_detected': '40P01',
  'syntax_error_or_access_rule_violation': '42000',
  'syntax_error': '42601',
  'insufficient_privilege': '42501',
  'cannot_coerce': '42846',
  'grouping_error': '42803',
  'windowing_error': '42P20',
  'invalid_recursion': '42P19',
  'invalid_foreign_key': '42830',
  'invalid_name': '42602',
  'name_too_long': '42622',
  'reserved_name': '42939',
  'datatype_mismatch': '42804',
  'indeterminate_datatype': '42P18',
  'collation_mismatch': '42P21',
  'indeterminate_collation': '42P22',
  'wrong_object_type': '42809',
  'undefined_column': '42703',
  'undefined_function': '42883',
  'undefined_table': '42P01',
  'undefined_parameter': '42P02',
  'undefined_object': '42704',
  'duplicate_column': '42701',
  'duplicate_cursor': '42P03',
  'duplicate_database': '42P04',
  'duplicate_function': '42723',
  'duplicate_prepared_statement': '42P05',
  'duplicate_schema': '42P06',
  'duplicate_table': '42P07',
  'duplicate_alias': '42712',
  'duplicate_object': '42710',
  'ambiguous_column': '42702',
  'ambiguous_function': '42725',
  'ambiguous_parameter': '42P08',
  'ambiguous_alias': '42P09',
  'invalid_column_reference': '42P10',
  'invalid_column_definition': '42611',
  'invalid_cursor_definition': '42P11',
  'invalid_database_definition': '42P12',
  'invalid_function_definition': '42P13',
  'invalid_prepared_statement_definition': '42P14',
  'invalid_schema_definition': '42P15',
  'invalid_table_definition': '42P16',
  'invalid_object_definition': '42P17',
  'with_check_option_violation': '44000',
  'insufficient_resources': '53000',
  'disk_full': '53100',
  'out_of_memory': '53200',
  'too_many_connections': '53300',
  'configuration_limit_exceeded': '53400',
  'program_limit_exceeded': '54000',
  'statement_too_complex': '54001',
  'too_many_columns': '54011',
  'too_many_arguments': '54023',
  'object_not_in_prerequisite_state': '55000',
  'object_in_use': '55006',
  'cant_change_runtime_param': '55P02',
  'lock_not_available': '55P03',
  'operator_intervention': '57000',
  'query_canceled': '57014',
  'admin_shutdown': '57P01',
  'crash_shutdown': '57P02',
  'cannot_connect_now': '57P03',
  'database_dropped': '57P04',
  'system_error': '58000',
  'io_error': '58030',
  'undefined_file': '58P01',
  'duplicate_file': '58P02',
  'snapshot_too_old': '72000',
  'config_file_error': 'F0000',
  'lock_file_exists': 'F0001',
  'fdw_error': 'HV000',
  'fdw_column_name_not_found': 'HV005',
  'fdw_dynamic_parameter_value_needed': 'HV002',
  'fdw_function_sequence_error': 'HV010',
  'fdw_inconsistent_descriptor_information': 'HV021',
  'fdw_invalid_attribute_value': 'HV024',
  'fdw_invalid_column_name': 'HV007',
  'fdw_invalid_column_number': 'HV008',
  'fdw_invalid_data_type': 'HV004',
  'fdw_invalid_data_type_descriptors': 'HV006',
  'fdw_invalid_descriptor_field_identifier': 'HV091',
  'fdw_invalid_handle': 'HV00B',
  'fdw_invalid_option_index': 'HV00C',
  'fdw_invalid_option_name': 'HV00D',
  'fdw_invalid_string_length_or_buffer_length': 'HV090',
  'fdw_invalid_string_format': 'HV00A',
  'fdw_invalid_use_of_null_pointer': 'HV009',
  'fdw_too_many_handles': 'HV014',
  'fdw_out_of_memory': 'HV001',
  'fdw_no_schemas': 'HV00P',
  'fdw_option_name_not_found': 'HV00J',
  'fdw_reply_handle': 'HV00K',
  'fdw_schema_not_found': 'HV00Q',
  'fdw_table_not_found': 'HV00R',
  'fdw_unable_to_create_execution': 'HV00L',
  'fdw_unable_to_create_reply': 'HV00M',
  'fdw_unable_to_establish_connection': 'HV00N',
  'plpgsql_error': 'P0000',
  'raise_exception': 'P0001',
  'no_data_found': 'P0002',
  'too_many_rows': 'P0003',
  'assert_failure': 'P0004',
  'internal_error': 'XX000',
  'data_corrupted': 'XX001',
  'index_corrupted': 'XX002',
}